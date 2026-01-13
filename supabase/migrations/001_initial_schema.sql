-- ArqAI CDI Website Database Schema
-- Run this in Supabase SQL Editor

-- Enable pgvector extension for RAG embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT UNIQUE NOT NULL,
  function_explored TEXT,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity TIMESTAMPTZ DEFAULT NOW(),
  message_count INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Leads table for captured prospects
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  company TEXT,
  title TEXT,
  phone TEXT,
  lead_score INTEGER DEFAULT 50 CHECK (lead_score >= 0 AND lead_score <= 100),
  segment_label TEXT CHECK (segment_label IN ('Hot', 'Warm', 'Nurture', 'Research')),
  readiness_level TEXT CHECK (readiness_level IN ('Hot', 'Warm', 'Nurture', 'Research')),
  function_explored TEXT,
  pain_points TEXT[],
  interests TEXT[],
  status TEXT DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Qualified', 'Converted', 'Lost')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Knowledge base chunks for RAG
CREATE TABLE IF NOT EXISTS kb_chunks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chunk_id TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  subcategory TEXT,
  function_area TEXT,
  confidence TEXT DEFAULT 'high' CHECK (confidence IN ('high', 'medium', 'low')),
  embedding vector(1536), -- OpenAI text-embedding-3-small dimensions
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Evidence log for conversation tracking
CREATE TABLE IF NOT EXISTS evidence_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  user_query TEXT NOT NULL,
  matched_chunks UUID[],
  retrieval_confidence FLOAT CHECK (retrieval_confidence >= 0 AND retrieval_confidence <= 1),
  agent_response_final TEXT NOT NULL,
  response_time_ms INTEGER,
  feedback_score INTEGER CHECK (feedback_score >= 1 AND feedback_score <= 5),
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table for conversation history
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES conversations(id),
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  content_block_type TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Email subscriptions for newsletter
CREATE TABLE IF NOT EXISTS email_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  subscribed BOOLEAN DEFAULT true,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- Booking requests from Cal.com
CREATE TABLE IF NOT EXISTS booking_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES leads(id),
  conversation_id UUID REFERENCES conversations(id),
  cal_event_id TEXT,
  scheduled_time TIMESTAMPTZ,
  duration_minutes INTEGER DEFAULT 30,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_segment ON leads(segment_label);
CREATE INDEX IF NOT EXISTS idx_leads_score ON leads(lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_kb_chunks_category ON kb_chunks(category);
CREATE INDEX IF NOT EXISTS idx_kb_chunks_function ON kb_chunks(function_area);
CREATE INDEX IF NOT EXISTS idx_conversations_session ON conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_evidence_conversation ON evidence_log(conversation_id);

-- Create vector similarity search index for RAG
CREATE INDEX IF NOT EXISTS idx_kb_chunks_embedding ON kb_chunks
  USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Row Level Security Policies
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE evidence_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE kb_chunks ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (for server-side operations)
CREATE POLICY "Service role has full access to leads" ON leads
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to conversations" ON conversations
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to messages" ON messages
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to evidence_log" ON evidence_log
  FOR ALL USING (auth.role() = 'service_role');

-- Allow anon read access to kb_chunks for RAG queries
CREATE POLICY "Anyone can read kb_chunks" ON kb_chunks
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage kb_chunks" ON kb_chunks
  FOR ALL USING (auth.role() = 'service_role');

-- Function to update lead score based on conversation
CREATE OR REPLACE FUNCTION update_lead_score()
RETURNS TRIGGER AS $$
BEGIN
  -- Update last_activity on conversation
  UPDATE conversations
  SET last_activity = NOW(),
      message_count = message_count + 1
  WHERE id = NEW.conversation_id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update conversation on new message
CREATE TRIGGER on_new_message
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_lead_score();

-- Function for semantic search using pgvector
CREATE OR REPLACE FUNCTION match_kb_chunks(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5,
  filter_category text DEFAULT NULL,
  filter_function text DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  chunk_id text,
  content text,
  category text,
  function_area text,
  confidence text,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    kb.id,
    kb.chunk_id,
    kb.content,
    kb.category,
    kb.function_area,
    kb.confidence,
    1 - (kb.embedding <=> query_embedding) as similarity
  FROM kb_chunks kb
  WHERE
    (filter_category IS NULL OR kb.category = filter_category)
    AND (filter_function IS NULL OR kb.function_area = filter_function)
    AND 1 - (kb.embedding <=> query_embedding) > match_threshold
  ORDER BY kb.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;
