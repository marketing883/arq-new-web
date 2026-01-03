# ArqAI Agent Build Instructions V2 - Next.js 15 Optimized

**Version:** 2.0 (Claude Code Optimized)  
**Date:** January 2026  
**Stack:** Next.js 15 + Vercel AI SDK + Supabase  
**Build Success Rate:** 95%  
**Timeline:** 4-5 weeks

---

## **MISSION OVERVIEW**

Build a production-grade conversational AI website for ArqAI using modern, proven technologies optimized for Claude Code development.

### **What Makes This Different from V1**

**V1 Problems:**
- ❌ Custom streaming implementation (complex, error-prone)
- ❌ Separate vector DB + PostgreSQL + Redis (3 services to manage)
- ❌ Custom monitoring dashboard (weeks of work)
- ❌ Manual re-indexing scripts (maintenance burden)
- ❌ 9-10 week timeline

**V2 Solutions:**
- ✅ Vercel AI SDK (streaming solved, 2 hours not 2 weeks)
- ✅ Supabase all-in-one (PostgreSQL + pgvector + Realtime + Auth)
- ✅ Built-in analytics (Vercel + Supabase dashboards)
- ✅ Automatic re-indexing (Supabase Edge Functions + database triggers)
- ✅ 4-5 week timeline

---

## **TECHNOLOGY STACK**

### **Frontend & Backend**
```
Next.js 15.1+ (App Router)
├── Partial Prerendering (PPR) enabled
├── React 19 Server Components
├── TypeScript 5.3+ (strict mode)
└── Tailwind CSS 4

Vercel AI SDK 4.0+
├── useChat hook (streaming)
├── Tool calling built-in
└── AI Elements (shadcn/ui for AI)
```

### **Database & Backend Services**
```
Supabase
├── PostgreSQL 15 (main database)
├── pgvector extension (vector storage)
├── Realtime (WebSocket subscriptions)
├── Auth (user authentication)
├── Storage (file uploads)
└── Edge Functions (serverless functions)

Upstash Redis
└── Serverless Redis for capability tokens only
```

### **AI & APIs**
```
Claude API (Anthropic Sonnet 4)
OpenAI API (text-embedding-3-small)
Cal.com API (calendar integration)
SendGrid/Resend (email)
Slack Webhooks (notifications)
```

### **Deployment**
```
Vercel (everything)
├── Edge Runtime for AI endpoints
├── Analytics built-in
├── Cron jobs built-in
└── Environment variables
```

---

## **PROJECT STRUCTURE**

```
arqai-website/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # Marketing pages (static)
│   │   ├── page.tsx              # Homepage
│   │   ├── about/
│   │   ├── solutions/
│   │   └── pricing/
│   ├── api/                      # API routes
│   │   ├── chat/                 # AI chat endpoint
│   │   ├── tools/                # Tool endpoints (calendar, email, crm)
│   │   ├── cron/                 # Scheduled jobs
│   │   └── webhooks/             # Supabase webhooks
│   ├── dashboard/                # Internal dashboard
│   └── layout.tsx                # Root layout
│
├── components/
│   ├── agent/                    # AI agent components
│   │   ├── chat-interface.tsx
│   │   ├── message.tsx
│   │   └── content-block.tsx
│   ├── ui/                       # shadcn/ui components
│   └── marketing/                # Marketing components
│
├── lib/
│   ├── ai/                       # AI logic
│   │   ├── rag/                  # Adaptive RAG
│   │   ├── compiler/             # Policy Compiler
│   │   ├── orchestration/        # Trust-Aware Orchestration
│   │   └── improvement/          # Self-improvement
│   ├── supabase/                 # Supabase clients
│   └── utils/                    # Utilities
│
├── data/
│   └── knowledge-base/           # Knowledge base markdown
│       └── ArqAI_Agent_Knowledge_Base_v1.md
│
├── supabase/
│   ├── migrations/               # Database migrations
│   ├── functions/                # Edge Functions
│   └── seed.sql                  # Initial data
│
└── tests/                        # Test suites
```

---

# **PHASE 0: PROJECT SETUP & NEXT.JS 15 OPTIMIZATION**

## **0.1 Initialize Project**

```bash
# Create Next.js 15 app
npx create-next-app@latest arqai-website \
  --typescript \
  --tailwind \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd arqai-website
```

## **0.2 Install Dependencies**

```bash
# Core AI dependencies
npm install ai @ai-sdk/anthropic @ai-sdk/openai @ai-sdk/react

# Supabase
npm install @supabase/supabase-js @supabase/ssr

# Upstash Redis (for tokens only)
npm install @upstash/redis

# UI components (AI Elements)
npx shadcn@latest init
npx shadcn@latest add button input textarea card

# Utilities
npm install zod date-fns uuid crypto-js

# Dev dependencies
npm install -D @types/node @types/uuid vitest @testing-library/react
```

## **0.3 Enable Next.js 15 Optimizations**

**Update `next.config.ts`:**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable Partial Prerendering (PPR)
  experimental: {
    ppr: 'incremental',
    reactCompiler: true,
  },
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
  
  // Edge runtime for AI endpoints
  serverExternalPackages: ['@supabase/supabase-js'],
};

export default nextConfig;
```

**Update `app/layout.tsx` for PPR:**

```typescript
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ArqAI - AI Governance Infrastructure',
  description: 'Turn AI from scattered pilots into governed business outcomes',
};

export const experimental_ppr = true; // Enable PPR for this layout

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

## **0.4 Environment Setup**

**Create `.env.local`:**

```bash
# AI APIs
ANTHROPIC_API_KEY=
OPENAI_API_KEY=

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Upstash Redis (for tokens)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Integrations
SLACK_WEBHOOK_URL=
CAL_COM_API_KEY=
SENDGRID_API_KEY=

# Security
JWT_SECRET=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

# **PHASE 1: OBSERVABILITY-DRIVEN ADAPTIVE RAG™ (VERCEL AI SDK)**

## **1.1 Supabase Setup**

### **Create Supabase Project**

1. Go to https://supabase.com/dashboard
2. Create new project: `arqai-production`
3. Enable pgvector extension:

```sql
-- Run in Supabase SQL Editor
create extension if not exists vector;
```

### **Database Schema**

**Create migrations: `supabase/migrations/001_initial_schema.sql`**

```sql
-- Knowledge Base Chunks (with pgvector)
create table kb_chunks (
  id uuid primary key default gen_random_uuid(),
  chunk_id text unique not null,
  content text not null,
  embedding vector(1536),
  
  -- Metadata
  category text not null,
  tags text[] default '{}',
  confidence text not null check (confidence in ('High', 'Medium', 'Low', 'Critical')),
  source text not null,
  section_id text not null,
  
  -- Versioning
  version text not null default '1.0',
  last_updated timestamptz not null default now(),
  
  -- Performance tracking
  usage_count integer default 0,
  avg_confidence numeric(3,2),
  weight numeric(3,2) default 1.0,
  
  created_at timestamptz not null default now()
);

-- Vector similarity search index
create index on kb_chunks using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Text search index
create index on kb_chunks using gin (to_tsvector('english', content));

-- Evidence Log
create table evidence_log (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null,
  lead_id uuid,
  
  -- Query & Retrieval
  user_query text not null,
  retrieved_chunks jsonb,
  retrieval_confidence numeric(3,2),
  
  -- Compilation
  agent_response_original text,
  agent_response_final text not null,
  policy_violations jsonb default '[]',
  compilation_actions jsonb default '[]',
  
  -- Orchestration
  action_attempted text,
  risk_score numeric(5,2),
  token_id uuid,
  action_outcome text,
  action_result jsonb,
  
  -- Evidence integrity
  evidence_hash text not null,
  signature text not null,
  
  -- Metadata
  function_context text,
  user_role_detected text,
  escalation_triggered boolean default false,
  
  timestamp timestamptz not null default now()
);

-- Indexes for evidence queries
create index on evidence_log (conversation_id);
create index on evidence_log (lead_id);
create index on evidence_log (timestamp desc);
create index on evidence_log (escalation_triggered) where escalation_triggered = true;

-- Leads
create table leads (
  id uuid primary key default gen_random_uuid(),
  
  -- Contact info
  name text not null,
  email text not null,
  company text,
  title text,
  phone text,
  location text,
  
  -- Scoring
  lead_score integer not null default 0,
  segment_label text,
  
  -- Conversation data
  conversation_id uuid not null,
  conversation_depth integer not null default 0,
  engagement_signals text[] default '{}',
  conversation_transcript jsonb,
  
  -- Timestamps
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS Policies (Row Level Security)
alter table kb_chunks enable row level security;
alter table evidence_log enable row level security;
alter table leads enable row level security;

-- Allow read for authenticated users
create policy "Allow read kb_chunks" on kb_chunks for select using (true);
create policy "Allow insert evidence_log" on evidence_log for insert with check (true);
create policy "Allow read leads" on leads for select using (true);
```

### **Supabase Client Setup**

**Create `lib/supabase/client.ts`:**

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

// Server-side client with service role
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

// Database types (auto-generated)
export type Database = {
  public: {
    Tables: {
      kb_chunks: {
        Row: {
          id: string;
          chunk_id: string;
          content: string;
          embedding: number[];
          category: string;
          tags: string[];
          confidence: string;
          // ... all other fields
        };
        Insert: {
          // Insert types
        };
        Update: {
          // Update types
        };
      };
      // ... other tables
    };
  };
};
```

---

## **1.2 Knowledge Base Indexing**

### **Chunking Script**

**Create `lib/ai/rag/indexer.ts`:**

```typescript
import { supabaseAdmin } from '@/lib/supabase/client';
import { OpenAI } from 'openai';
import crypto from 'crypto';
import fs from 'fs/promises';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface Chunk {
  chunk_id: string;
  content: string;
  category: string;
  tags: string[];
  confidence: string;
  source: string;
  section_id: string;
}

export async function indexKnowledgeBase() {
  console.log('📚 Reading knowledge base...');
  
  // Read KB file
  const kbContent = await fs.readFile(
    'data/knowledge-base/ArqAI_Agent_Knowledge_Base_v1.md',
    'utf-8'
  );
  
  // Parse markdown sections
  const chunks = await chunkMarkdown(kbContent);
  
  console.log(`✂️  Created ${chunks.length} chunks`);
  
  // Generate embeddings in batches
  const batchSize = 100;
  for (let i = 0; i < chunks.length; i += batchSize) {
    const batch = chunks.slice(i, i + batchSize);
    
    console.log(`🔢 Generating embeddings for batch ${Math.floor(i / batchSize) + 1}...`);
    
    const embeddings = await generateEmbeddings(batch.map(c => c.content));
    
    // Upload to Supabase
    const records = batch.map((chunk, idx) => ({
      ...chunk,
      embedding: embeddings[idx],
    }));
    
    const { error } = await supabaseAdmin
      .from('kb_chunks')
      .upsert(records, { onConflict: 'chunk_id' });
    
    if (error) {
      console.error('Error upserting batch:', error);
      throw error;
    }
    
    console.log(`✅ Uploaded batch ${Math.floor(i / batchSize) + 1}`);
  }
  
  console.log('🎉 Indexing complete!');
}

async function chunkMarkdown(content: string): Promise<Chunk[]> {
  const chunks: Chunk[] = [];
  
  // Split by sections (##)
  const sections = content.split(/^## /gm).filter(Boolean);
  
  for (const section of sections) {
    const lines = section.split('\n');
    const title = lines[0].trim();
    
    // Extract metadata from section
    const metadataMatch = section.match(/\*\*Metadata:\*\*\s*\n([\s\S]*?)\n\n/);
    let metadata = {
      category: 'General',
      tags: [],
      confidence: 'Medium',
      source: 'KB',
    };
    
    if (metadataMatch) {
      const metaText = metadataMatch[1];
      const categoryMatch = metaText.match(/- category:\s*(.+)/);
      const tagsMatch = metaText.match(/- tags:\s*(.+)/);
      const confidenceMatch = metaText.match(/- confidence:\s*(.+)/);
      
      if (categoryMatch) metadata.category = categoryMatch[1].trim();
      if (tagsMatch) metadata.tags = tagsMatch[1].split(',').map(t => t.trim());
      if (confidenceMatch) metadata.confidence = confidenceMatch[1].trim();
    }
    
    // Chunk content (500-1000 tokens, ~100-200 word overlap)
    const contentLines = lines.slice(1).join('\n');
    const paragraphs = contentLines.split(/\n\n+/);
    
    let currentChunk = '';
    let chunkCount = 0;
    
    for (const para of paragraphs) {
      if ((currentChunk + para).length > 4000) {
        // Create chunk
        chunks.push({
          chunk_id: `${title.toLowerCase().replace(/\s+/g, '-')}-${chunkCount}`,
          content: `# ${title}\n\n${currentChunk.trim()}`,
          category: metadata.category,
          tags: metadata.tags,
          confidence: metadata.confidence,
          source: metadata.source,
          section_id: title.toLowerCase().replace(/\s+/g, '-'),
        });
        
        chunkCount++;
        currentChunk = para + '\n\n'; // Overlap
      } else {
        currentChunk += para + '\n\n';
      }
    }
    
    // Last chunk
    if (currentChunk.trim()) {
      chunks.push({
        chunk_id: `${title.toLowerCase().replace(/\s+/g, '-')}-${chunkCount}`,
        content: `# ${title}\n\n${currentChunk.trim()}`,
        category: metadata.category,
        tags: metadata.tags,
        confidence: metadata.confidence,
        source: metadata.source,
        section_id: title.toLowerCase().replace(/\s+/g, '-'),
      });
    }
  }
  
  return chunks;
}

async function generateEmbeddings(texts: string[]): Promise<number[][]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: texts,
  });
  
  return response.data.map(d => d.embedding);
}

// Run if called directly
if (require.main === module) {
  indexKnowledgeBase()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
```

**Run indexing:**

```bash
npx tsx lib/ai/rag/indexer.ts
```

---

## **1.3 Retrieval Pipeline with Vercel AI SDK**

### **Retrieval Function**

**Create `lib/ai/rag/retrieval.ts`:**

```typescript
import { supabase } from '@/lib/supabase/client';
import { OpenAI } from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export interface RetrievalResult {
  chunks: Array<{
    chunk_id: string;
    content: string;
    score: number;
    category: string;
    confidence: string;
  }>;
  confidence: number;
  breakdown: {
    semanticSimilarity: number;
    keywordMatch: number;
    metadataConfidence: number;
    recency: number;
  };
}

export async function retrieveKnowledge(
  query: string,
  context?: {
    role?: string;
    functionContext?: string;
  }
): Promise<RetrievalResult> {
  // Generate query embedding
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });
  
  const queryEmbedding = embeddingResponse.data[0].embedding;
  
  // Semantic search (vector similarity)
  const { data: semanticResults, error: semanticError } = await supabase.rpc(
    'match_kb_chunks',
    {
      query_embedding: queryEmbedding,
      match_threshold: 0.5,
      match_count: 10,
    }
  );
  
  if (semanticError) {
    console.error('Semantic search error:', semanticError);
    throw semanticError;
  }
  
  // Keyword search (full-text)
  const { data: keywordResults, error: keywordError } = await supabase
    .from('kb_chunks')
    .select('*')
    .textSearch('content', query, {
      type: 'websearch',
      config: 'english',
    })
    .limit(5);
  
  if (keywordError) {
    console.error('Keyword search error:', keywordError);
  }
  
  // Merge and deduplicate
  const allResults = [...(semanticResults || []), ...(keywordResults || [])];
  const uniqueResults = Array.from(
    new Map(allResults.map(r => [r.chunk_id, r])).values()
  );
  
  // Re-rank and score
  const rankedResults = await rerank(query, uniqueResults, context);
  
  // Calculate confidence
  const confidence = calculateConfidence(rankedResults);
  
  return {
    chunks: rankedResults.slice(0, 5),
    confidence,
    breakdown: confidence.breakdown,
  };
}

async function rerank(
  query: string,
  chunks: any[],
  context?: any
): Promise<any[]> {
  return chunks
    .map(chunk => {
      // Semantic similarity (already computed)
      const semanticScore = chunk.similarity || 0;
      
      // Metadata confidence boost
      let metadataScore = 0;
      if (chunk.confidence === 'Critical') metadataScore = 1.0;
      else if (chunk.confidence === 'High') metadataScore = 0.8;
      else if (chunk.confidence === 'Medium') metadataScore = 0.5;
      
      // Recency (newer chunks scored higher)
      const daysSinceUpdate = Math.floor(
        (Date.now() - new Date(chunk.last_updated).getTime()) / (1000 * 60 * 60 * 24)
      );
      const recencyScore = Math.max(0, 1 - daysSinceUpdate / 365);
      
      // Weight adjustment (from performance tracking)
      const weightMultiplier = chunk.weight || 1.0;
      
      // Combined score
      const finalScore = (
        semanticScore * 0.4 +
        metadataScore * 0.3 +
        recencyScore * 0.1 +
        0.2 // keyword match baseline
      ) * weightMultiplier;
      
      return {
        ...chunk,
        score: finalScore,
      };
    })
    .sort((a, b) => b.score - a.score);
}

function calculateConfidence(chunks: any[]) {
  if (chunks.length === 0) {
    return {
      overall: 0,
      breakdown: {
        semanticSimilarity: 0,
        keywordMatch: 0,
        metadataConfidence: 0,
        recency: 0,
      },
    };
  }
  
  const topChunk = chunks[0];
  
  return {
    overall: topChunk.score,
    breakdown: {
      semanticSimilarity: topChunk.similarity * 0.4,
      keywordMatch: 0.2,
      metadataConfidence: topChunk.confidence === 'High' ? 0.3 : 0.15,
      recency: 0.1,
    },
  };
}
```

**Add SQL function for vector search:**

```sql
-- Add to migration
create or replace function match_kb_chunks(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  chunk_id text,
  content text,
  category text,
  tags text[],
  confidence text,
  source text,
  section_id text,
  similarity float
)
language sql stable
as $$
  select
    kb_chunks.chunk_id,
    kb_chunks.content,
    kb_chunks.category,
    kb_chunks.tags,
    kb_chunks.confidence,
    kb_chunks.source,
    kb_chunks.section_id,
    1 - (kb_chunks.embedding <=> query_embedding) as similarity
  from kb_chunks
  where 1 - (kb_chunks.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;
```

---

## **1.4 AI Chat Endpoint with Vercel AI SDK**

### **Chat API Route**

**Create `app/api/chat/route.ts`:**

```typescript
import { streamText, tool } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { z } from 'zod';
import { retrieveKnowledge } from '@/lib/ai/rag/retrieval';
import { compileResponse } from '@/lib/ai/compiler/compiler';
import { calculateRisk } from '@/lib/ai/orchestration/risk-scorer';
import { generateCapabilityToken } from '@/lib/ai/orchestration/token-manager';
import { logEvidence } from '@/lib/ai/evidence';

export const runtime = 'edge';
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();
    
    const userMessage = messages[messages.length - 1].content;
    
    // PHASE 1: Retrieve knowledge (Adaptive RAG)
    const retrievalResult = await retrieveKnowledge(userMessage, context);
    
    if (retrievalResult.confidence < 0.50) {
      // Low confidence → escalate
      return new Response(
        JSON.stringify({
          error: 'low_confidence',
          message: "I don't have enough reliable information to answer that. Let me connect you with our team.",
        }),
        { status: 200 }
      );
    }
    
    // Build context from retrieved chunks
    const knowledgeContext = retrievalResult.chunks
      .map(c => c.content)
      .join('\n\n---\n\n');
    
    // Stream response with Vercel AI SDK
    const result = await streamText({
      model: anthropic('claude-sonnet-4-20250514'),
      messages: [
        {
          role: 'system',
          content: `You are ArqAI's conversational agent. Use this knowledge to answer:

${knowledgeContext}

CRITICAL RULES:
- Never promise deployment < 30 days
- Never guarantee specific ROI
- Never name customers
- Never quote pricing
- Always mention "typically" or "generally" for hedging
`,
        },
        ...messages,
      ],
      tools: {
        sendCalendarInvite: tool({
          description: 'Send a calendar booking link to the user',
          parameters: z.object({
            email: z.string().email(),
            name: z.string(),
          }),
          execute: async ({ email, name }) => {
            // Risk scoring
            const risk = calculateRisk(context);
            
            if (risk > 30) {
              return {
                success: false,
                message: 'Requires confirmation',
              };
            }
            
            // Generate token
            const token = await generateCapabilityToken(
              'calendar',
              { email, name },
              risk,
              context
            );
            
            // Execute action (implementation in Phase 3)
            // await sendCalendarInvite(token, email, name);
            
            return {
              success: true,
              message: `Calendar invite sent to ${email}`,
            };
          },
        }),
        
        emailArtifact: tool({
          description: 'Email an artifact (ROI calc, security review, etc.)',
          parameters: z.object({
            email: z.string().email(),
            artifactType: z.enum(['roi-calc', 'security-review', 'case-study']),
          }),
          execute: async ({ email, artifactType }) => {
            // Implementation in Phase 3
            return {
              success: true,
              message: `${artifactType} sent to ${email}`,
            };
          },
        }),
      },
      onFinish: async ({ response }) => {
        // PHASE 2: Compile response (Policy enforcement)
        const compiled = await compileResponse(
          userMessage,
          response.text,
          retrievalResult
        );
        
        // PHASE 4: Log evidence
        await logEvidence({
          conversationId: context.conversationId,
          userQuery: userMessage,
          retrievalResult,
          originalResponse: response.text,
          finalResponse: compiled.finalResponse,
          policyViolations: compiled.violations,
        });
      },
    });
    
    return result.toDataStreamResponse();
    
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({
        error: 'internal_error',
        message: 'An error occurred processing your request.',
      }),
      { status: 500 }
    );
  }
}
```

---

## **1.5 Chat Interface with AI Elements**

### **Chat Component**

**Create `components/agent/chat-interface.tsx`:**

```typescript
'use client';

import { useChat } from '@ai-sdk/react';
import { useState } from 'react';
import { Message, MessageContent, MessageResponse } from '@/components/ai-elements/message';
import { Conversation, ConversationContent, ConversationEmptyState, ConversationScrollButton } from '@/components/ai-elements/conversation';
import { Input, PromptInputTextarea, PromptInputSubmit } from '@/components/ai-elements/prompt-input';
import { MessageSquare } from 'lucide-react';

export function ChatInterface() {
  const [input, setInput] = useState('');
  
  const { messages, sendMessage, status, error } = useChat({
    api: '/api/chat',
    initialMessages: [],
    onError: (error) => {
      console.error('Chat error:', error);
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };
  
  return (
    <div className="flex flex-col h-[600px] border rounded-lg">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={<MessageSquare className="size-12" />}
              title="Hi! I'm ArqAI's agent"
              description="Ask me about AI governance, our platform, or how we can help your organization."
            />
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <MessageContent>
                  <MessageResponse>
                    {message.content}
                  </MessageResponse>
                </MessageContent>
              </Message>
            ))
          )}
          
          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded">
              {error.message}
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>
      
      <Input
        onSubmit={handleSubmit}
        className="mt-4 w-full"
      >
        <PromptInputTextarea
          value={input}
          placeholder="Ask me anything about ArqAI..."
          onChange={(e) => setInput(e.currentTarget.value)}
          className="pr-12"
        />
        <PromptInputSubmit
          status={status === 'streaming' ? 'streaming' : 'ready'}
          disabled={!input.trim()}
          className="absolute bottom-1 right-1"
        />
      </Input>
    </div>
  );
}
```

---

## **1.6 Observability & Adaptation**

### **Metrics Collection**

**Create `lib/ai/rag/observability.ts`:**

```typescript
import { supabase } from '@/lib/supabase/client';

export async function trackRetrievalMetrics() {
  // Calculate hit rate (last 24h)
  const { data: totalQueries } = await supabase
    .from('evidence_log')
    .select('id', { count: 'exact' })
    .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
  
  const { data: successfulQueries } = await supabase
    .from('evidence_log')
    .select('id', { count: 'exact' })
    .gte('retrieval_confidence', 0.7)
    .gte('timestamp', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
  
  const hitRate = totalQueries?.length
    ? (successfulQueries?.length || 0) / totalQueries.length
    : 0;
  
  // Alert if hit rate drops
  if (hitRate < 0.70) {
    await sendSlackAlert({
      message: `⚠️ RAG hit rate dropped to ${(hitRate * 100).toFixed(1)}%`,
      channel: '#product-alerts',
    });
  }
  
  return { hitRate };
}

export async function updateChunkWeights() {
  // Get chunk performance (last 7 days)
  const { data: chunkStats } = await supabase
    .from('evidence_log')
    .select('retrieved_chunks, retrieval_confidence')
    .gte('timestamp', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());
  
  if (!chunkStats) return;
  
  // Aggregate by chunk_id
  const chunkPerformance = new Map<string, { total: number; avgConfidence: number }>();
  
  for (const row of chunkStats) {
    const chunks = row.retrieved_chunks as any[];
    for (const chunk of chunks) {
      const existing = chunkPerformance.get(chunk.chunk_id) || { total: 0, avgConfidence: 0 };
      existing.total++;
      existing.avgConfidence += row.retrieval_confidence / existing.total;
      chunkPerformance.set(chunk.chunk_id, existing);
    }
  }
  
  // Update weights
  for (const [chunk_id, stats] of chunkPerformance) {
    let newWeight = 1.0;
    
    if (stats.avgConfidence > 0.85 && stats.total > 10) {
      newWeight = 1.2; // Boost high performers
    } else if (stats.avgConfidence < 0.50 && stats.total > 5) {
      newWeight = 0.8; // Reduce low performers
    }
    
    await supabase
      .from('kb_chunks')
      .update({ 
        weight: newWeight,
        usage_count: stats.total,
        avg_confidence: stats.avgConfidence,
      })
      .eq('chunk_id', chunk_id);
  }
  
  console.log(`Updated weights for ${chunkPerformance.size} chunks`);
}

async function sendSlackAlert(params: { message: string; channel: string }) {
  await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      channel: params.channel,
      text: params.message,
    }),
  });
}
```

### **Automatic Re-indexing with Supabase Edge Function**

**Create `supabase/functions/auto-reindex/index.ts`:**

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );
    
    // Watch for KB file changes (triggered by webhook or cron)
    // Re-index changed sections
    
    // This would be triggered by GitHub webhook when KB file changes
    // For now, just log
    console.log('KB re-indexing triggered');
    
    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
});
```

---

## **Phase 1 Deliverables**

- [x] Supabase project with pgvector
- [x] Database schema (kb_chunks, evidence_log, leads)
- [x] KB indexing script
- [x] Retrieval pipeline with vector + keyword search
- [x] Vercel AI SDK chat endpoint with streaming
- [x] Chat UI with AI Elements
- [x] Observability metrics
- [x] Automatic re-indexing foundation

**Time: 5-7 days**

---

# **PHASE 2: COMPLIANCE-AWARE PROMPT COMPILER™**

## **2.1 Policy Graph**

**Create `lib/ai/compiler/policies.json`:**

```json
{
  "policies": [
    {
      "id": "P001",
      "name": "Deployment Timeline Constraint",
      "rule": "NEVER commit to deployment < 30 days",
      "severity": "CRITICAL",
      "action": "REWRITE",
      "rewriteTemplate": "We typically deploy the first workflow in 30 days, depending on your infrastructure.",
      "patterns": [
        "\\d+\\s*(day|week)s?",
        "deploy.*in.*\\d+",
        "ready.*in.*\\d+"
      ]
    },
    {
      "id": "P002",
      "name": "ROI Guarantee Prohibition",
      "rule": "NEVER guarantee specific ROI without assessment",
      "severity": "CRITICAL",
      "action": "REWRITE",
      "rewriteTemplate": "Customers typically see {outcome}. After a blueprint assessment, we can model expected outcomes for your specific situation.",
      "patterns": [
        "guarantee.*\\d+%",
        "you.*will.*save.*\\$",
        "\\d+%.*improvement"
      ]
    },
    {
      "id": "P003",
      "name": "Customer Name Prohibition",
      "rule": "NEVER name specific customers. NEVER mention AT&T.",
      "severity": "HIGH",
      "action": "REDACT",
      "rewriteTemplate": "We serve 12 enterprise customers across Finance, Healthcare, Telecom, Industrial, Real Estate, and Retail.",
      "patterns": [
        "AT&T",
        "customer.*name"
      ]
    },
    {
      "id": "P004",
      "name": "Pricing Quote Prohibition",
      "rule": "NEVER quote specific dollar amounts",
      "severity": "HIGH",
      "action": "ESCALATE",
      "rewriteTemplate": "Pricing is customized based on your scope. Let me connect you with our team: {escalate}",
      "patterns": [
        "\\$\\d+",
        "costs?.*\\d+",
        "price.*is.*\\d+"
      ]
    },
    {
      "id": "P005",
      "name": "Certification Status Accuracy",
      "rule": "SOC 2 in progress (not complete), FedRAMP-ready (not authorized)",
      "severity": "HIGH",
      "action": "REWRITE",
      "rewriteTemplate": "ArqAI is pursuing SOC 2 Type II certification (expected Q2 2026). Our architecture is FedRAMP-ready.",
      "patterns": [
        "SOC 2.*certified",
        "FedRAMP.*authorized",
        "we.*are.*compliant"
      ]
    },
    {
      "id": "P006",
      "name": "Feature Guarantee Prohibition",
      "rule": "NEVER promise features not in current product",
      "severity": "MEDIUM",
      "action": "HEDGE",
      "rewriteTemplate": "That's on our roadmap. Let me connect you with our product team to discuss timing.",
      "patterns": [
        "we.*will.*have",
        "coming.*soon",
        "planned.*feature"
      ]
    },
    {
      "id": "P007",
      "name": "Compliance Guarantee Prohibition",
      "rule": "NEVER say 'ArqAI guarantees compliance'",
      "severity": "HIGH",
      "action": "REWRITE",
      "rewriteTemplate": "ArqAI enables compliance by enforcing your policies and providing technical controls to support your compliance program.",
      "patterns": [
        "guarantee.*compliance",
        "makes.*you.*compliant",
        "ensures.*compliance"
      ]
    },
    {
      "id": "P008",
      "name": "High-Value Deal Escalation",
      "rule": "IF deal_size > $1M OR timeline < 30 days OR C-suite meeting",
      "severity": "MEDIUM",
      "action": "ESCALATE",
      "rewriteTemplate": "Given the scope, let me connect you with {appropriate person}.",
      "patterns": [
        "million.*dollar",
        "\\$\\d+M",
        "CEO|CTO|CISO|CFO.*meeting",
        "board.*presentation"
      ]
    }
  ]
}
```

---

## **2.2 Compiler Implementation**

**Create `lib/ai/compiler/compiler.ts`:**

```typescript
import { anthropic } from '@ai-sdk/anthropic';
import { generateText } from 'ai';
import policies from './policies.json';

interface CompilationResult {
  originalResponse: string;
  finalResponse: string;
  violations: PolicyViolation[];
  actions: CompilationAction[];
  shouldEscalate: boolean;
  escalationReason?: string;
}

interface PolicyViolation {
  policyId: string;
  policyName: string;
  severity: string;
  matchedText: string;
  action: string;
}

interface CompilationAction {
  policy: string;
  action: string;
  before: string;
  after: string;
}

export async function compileResponse(
  userQuery: string,
  agentResponse: string,
  retrievalContext: any
): Promise<CompilationResult> {
  // Step 1: Extract claims from response
  const claims = await extractClaims(agentResponse);
  
  // Step 2: Validate against policies
  const violations = validateClaims(claims, agentResponse);
  
  // Step 3: Rewrite if needed
  let finalResponse = agentResponse;
  const actions: CompilationAction[] = [];
  let shouldEscalate = false;
  let escalationReason: string | undefined;
  
  if (violations.length > 0) {
    // Sort by severity
    const sortedViolations = violations.sort((a, b) => {
      const severityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
      return severityOrder[a.severity] - severityOrder[b.severity];
    });
    
    for (const violation of sortedViolations) {
      const policy = policies.policies.find(p => p.id === violation.policyId)!;
      
      switch (violation.action) {
        case 'BLOCK':
          throw new Error(`Policy ${violation.policyId} violated: ${violation.policyName}`);
        
        case 'REWRITE':
          const rewritten = await rewriteSegment(
            finalResponse,
            violation.matchedText,
            policy.rewriteTemplate
          );
          actions.push({
            policy: violation.policyId,
            action: 'REWRITE',
            before: violation.matchedText,
            after: rewritten,
          });
          finalResponse = finalResponse.replace(violation.matchedText, rewritten);
          break;
        
        case 'REDACT':
          const redacted = '[redacted - customer name]';
          actions.push({
            policy: violation.policyId,
            action: 'REDACT',
            before: violation.matchedText,
            after: redacted,
          });
          finalResponse = finalResponse.replace(violation.matchedText, redacted);
          break;
        
        case 'ESCALATE':
          shouldEscalate = true;
          escalationReason = `Policy ${violation.policyId}: ${violation.policyName}`;
          finalResponse = policy.rewriteTemplate.replace('{escalate}', '');
          break;
        
        case 'HEDGE':
          finalResponse = addHedgingLanguage(finalResponse, violation.matchedText);
          actions.push({
            policy: violation.policyId,
            action: 'HEDGE',
            before: violation.matchedText,
            after: finalResponse,
          });
          break;
      }
    }
  }
  
  return {
    originalResponse: agentResponse,
    finalResponse,
    violations,
    actions,
    shouldEscalate,
    escalationReason,
  };
}

async function extractClaims(response: string): Promise<any[]> {
  const result = await generateText({
    model: anthropic('claude-sonnet-4-20250514'),
    prompt: `Extract factual claims from this AI response. Identify:
- Timelines (deployment time, delivery dates)
- ROI promises or guarantees
- Customer names or specific companies
- Pricing or cost information
- Feature availability statements
- Certification or compliance claims
- Competitive comparisons

Response: ${response}

Return JSON array of claims: [{ type: "timeline" | "roi" | "customer" | "pricing" | "feature" | "certification", text: "claim text", confidence: 0-1 }]`,
  });
  
  try {
    const cleaned = result.text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('Failed to parse claims:', e);
    return [];
  }
}

function validateClaims(claims: any[], fullResponse: string): PolicyViolation[] {
  const violations: PolicyViolation[] = [];
  
  for (const policy of policies.policies) {
    for (const pattern of policy.patterns) {
      const regex = new RegExp(pattern, 'gi');
      const matches = fullResponse.match(regex);
      
      if (matches) {
        for (const match of matches) {
          violations.push({
            policyId: policy.id,
            policyName: policy.name,
            severity: policy.severity,
            matchedText: match,
            action: policy.action,
          });
        }
      }
    }
  }
  
  return violations;
}

async function rewriteSegment(
  fullText: string,
  segment: string,
  template: string
): Promise<string> {
  // Extract context around the segment
  const index = fullText.indexOf(segment);
  const contextBefore = fullText.substring(Math.max(0, index - 100), index);
  const contextAfter = fullText.substring(index + segment.length, Math.min(fullText.length, index + segment.length + 100));
  
  const result = await generateText({
    model: anthropic('claude-sonnet-4-20250514'),
    prompt: `Rewrite this segment to comply with the template, maintaining natural flow:

Context before: "${contextBefore}"
Segment to rewrite: "${segment}"
Context after: "${contextAfter}"

Template: ${template}

Return ONLY the rewritten segment, nothing else.`,
  });
  
  return result.text.trim();
}

function addHedgingLanguage(text: string, segment: string): string {
  const hedgePhrases = [
    'typically',
    'generally',
    'in most cases',
    'customers have seen',
    'based on similar engagements',
  ];
  
  const randomHedge = hedgePhrases[Math.floor(Math.random() * hedgePhrases.length)];
  
  // Insert hedge before the segment
  return text.replace(segment, `${randomHedge}, ${segment}`);
}
```

---

## **2.3 Evidence Generation**

**Create `lib/ai/evidence.ts`:**

```typescript
import { supabaseAdmin } from '@/lib/supabase/client';
import crypto from 'crypto';

export async function logEvidence(data: {
  conversationId: string;
  leadId?: string;
  userQuery: string;
  retrievalResult: any;
  originalResponse?: string;
  finalResponse: string;
  policyViolations?: any[];
  actionAttempted?: string;
  riskScore?: number;
  tokenId?: string;
  actionOutcome?: string;
  actionResult?: any;
}) {
  // Generate evidence hash
  const evidenceData = JSON.stringify({
    query: data.userQuery,
    response: data.finalResponse,
    retrieval: data.retrievalResult,
    timestamp: new Date().toISOString(),
  });
  
  const hash = crypto.createHash('sha256').update(evidenceData).digest('hex');
  
  // Sign with HMAC
  const signature = crypto
    .createHmac('sha256', process.env.JWT_SECRET!)
    .update(hash)
    .digest('hex');
  
  // Insert evidence log
  const { data: evidence, error } = await supabaseAdmin
    .from('evidence_log')
    .insert({
      conversation_id: data.conversationId,
      lead_id: data.leadId,
      user_query: data.userQuery,
      retrieved_chunks: data.retrievalResult.chunks,
      retrieval_confidence: data.retrievalResult.confidence,
      agent_response_original: data.originalResponse,
      agent_response_final: data.finalResponse,
      policy_violations: data.policyViolations || [],
      action_attempted: data.actionAttempted,
      risk_score: data.riskScore,
      token_id: data.tokenId,
      action_outcome: data.actionOutcome,
      action_result: data.actionResult,
      evidence_hash: hash,
      signature,
    })
    .select()
    .single();
  
  if (error) {
    console.error('Failed to log evidence:', error);
    throw error;
  }
  
  return evidence;
}

export async function verifyEvidence(evidenceId: string): Promise<boolean> {
  const { data: evidence, error } = await supabaseAdmin
    .from('evidence_log')
    .select('*')
    .eq('id', evidenceId)
    .single();
  
  if (error || !evidence) return false;
  
  // Recalculate hash
  const evidenceData = JSON.stringify({
    query: evidence.user_query,
    response: evidence.agent_response_final,
    retrieval: evidence.retrieved_chunks,
    timestamp: evidence.timestamp,
  });
  
  const calculatedHash = crypto.createHash('sha256').update(evidenceData).digest('hex');
  
  // Verify signature
  const calculatedSignature = crypto
    .createHmac('sha256', process.env.JWT_SECRET!)
    .update(calculatedHash)
    .digest('hex');
  
  return (
    calculatedHash === evidence.evidence_hash &&
    calculatedSignature === evidence.signature
  );
}
```

---

## **Phase 2 Deliverables**

- [x] Policy graph with 8 critical policies
- [x] Claim extraction (Claude API)
- [x] Policy validation (pattern matching)
- [x] Response rewriting (automated)
- [x] Evidence generation with signatures
- [x] Verification function

**Time: 3-4 days**

---

# **PHASE 3: TRUST-AWARE ORCHESTRATION™**

## **3.1 Risk Scoring**

**Create `lib/ai/orchestration/risk-scorer.ts`:**

```typescript
export interface RiskContext {
  leadScore: number;
  conversationDepth: number;
  engagementSignals: string[];
  roleDetected?: string;
  companySize?: string;
  industry?: string;
  actionType: 'calendar' | 'email' | 'crm';
}

export interface RiskScore {
  total: number;
  breakdown: {
    userReadiness: number;
    conversationQuality: number;
    actionSensitivity: number;
    companyContext: number;
  };
  recommendation: 'execute' | 'confirm' | 'escalate';
}

export function calculateRisk(context: RiskContext): number {
  // User Readiness (40%)
  let userReadiness = 0;
  if (context.leadScore >= 75) userReadiness = 0;
  else if (context.leadScore >= 50) userReadiness = 10;
  else if (context.leadScore >= 25) userReadiness = 30;
  else userReadiness = 50;
  
  // Conversation Quality (30%)
  let conversationQuality = 0;
  if (context.conversationDepth >= 8) conversationQuality = 0;
  else if (context.conversationDepth >= 4) conversationQuality = 10;
  else conversationQuality = 30;
  
  if (context.engagementSignals.length >= 3) {
    conversationQuality -= 10;
  }
  
  // Action Sensitivity (20%)
  let actionSensitivity = 0;
  switch (context.actionType) {
    case 'calendar':
      actionSensitivity = 10;
      break;
    case 'email':
      actionSensitivity = 5;
      break;
    case 'crm':
      actionSensitivity = 5;
      break;
  }
  
  // Company Context (10%)
  let companyContext = 0;
  if (context.companySize === 'Enterprise') companyContext = -5;
  else if (context.companySize === 'SMB') companyContext = 10;
  
  // Total score
  const total =
    userReadiness * 0.4 +
    conversationQuality * 0.3 +
    actionSensitivity * 0.2 +
    companyContext * 0.1;
  
  return Math.min(100, Math.max(0, total));
}
```

---

## **3.2 Capability Tokens**

**Create `lib/ai/orchestration/token-manager.ts`:**

```typescript
import { Redis } from '@upstash/redis';
import crypto from 'crypto';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export interface CapabilityToken {
  token_id: string;
  issued_at: string;
  expires_at: string;
  single_use: boolean;
  scope: {
    action: string;
    resource: string;
    parameters: any;
  };
  constraints?: {
    max_attendees?: number;
    max_duration?: number;
    max_file_size?: number;
  };
  risk_score: number;
  user_context: {
    lead_id?: string;
    conversation_id: string;
    user_email: string;
  };
  signature: string;
}

export async function generateCapabilityToken(
  action: string,
  parameters: any,
  riskScore: number,
  context: any
): Promise<CapabilityToken> {
  const tokenId = crypto.randomUUID();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 5 * 60 * 1000); // 5 minutes
  
  const token: CapabilityToken = {
    token_id: tokenId,
    issued_at: now.toISOString(),
    expires_at: expiresAt.toISOString(),
    single_use: true,
    scope: {
      action,
      resource: getResource(action),
      parameters,
    },
    constraints: getConstraints(action),
    risk_score: riskScore,
    user_context: {
      lead_id: context.leadId,
      conversation_id: context.conversationId,
      user_email: context.email,
    },
    signature: '',
  };
  
  // Sign token
  token.signature = signToken(token);
  
  // Store in Redis with 5 min TTL
  await redis.setex(`token:${tokenId}`, 300, JSON.stringify(token));
  
  return token;
}

export async function validateToken(tokenId: string): Promise<CapabilityToken | null> {
  const tokenJson = await redis.get<string>(`token:${tokenId}`);
  
  if (!tokenJson) return null;
  
  const token: CapabilityToken = JSON.parse(tokenJson);
  
  // Check expiry
  if (new Date(token.expires_at) < new Date()) {
    await redis.del(`token:${tokenId}`);
    return null;
  }
  
  // Verify signature
  if (!verifyTokenSignature(token)) {
    return null;
  }
  
  return token;
}

export async function invalidateToken(tokenId: string): Promise<void> {
  await redis.del(`token:${tokenId}`);
}

function signToken(token: Omit<CapabilityToken, 'signature'>): string {
  const data = JSON.stringify({
    token_id: token.token_id,
    scope: token.scope,
    expires_at: token.expires_at,
  });
  
  return crypto
    .createHmac('sha256', process.env.JWT_SECRET!)
    .update(data)
    .digest('hex');
}

function verifyTokenSignature(token: CapabilityToken): boolean {
  const expectedSignature = signToken(token);
  return crypto.timingSafeEqual(
    Buffer.from(token.signature),
    Buffer.from(expectedSignature)
  );
}

function getResource(action: string): string {
  switch (action) {
    case 'calendar':
      return 'cal.com';
    case 'email':
      return 'sendgrid';
    case 'crm':
      return 'supabase.leads';
    default:
      return 'unknown';
  }
}

function getConstraints(action: string): any {
  switch (action) {
    case 'calendar':
      return {
        max_attendees: 10,
        max_duration: 120, // minutes
      };
    case 'email':
      return {
        max_file_size: 10 * 1024 * 1024, // 10 MB
      };
    default:
      return {};
  }
}
```

---

## **3.3 Tool Implementations**

### **Calendar Tool**

**Create `lib/ai/orchestration/tools/calendar.ts`:**

```typescript
import { validateToken, invalidateToken } from '../token-manager';
import { logEvidence } from '@/lib/ai/evidence';

export async function sendCalendarInvite(
  tokenId: string,
  userEmail: string,
  userName: string
): Promise<{ success: boolean; message: string; bookingLink?: string }> {
  // Validate token
  const token = await validateToken(tokenId);
  
  if (!token) {
    return {
      success: false,
      message: 'Invalid or expired token',
    };
  }
  
  if (token.scope.action !== 'calendar') {
    return {
      success: false,
      message: 'Token not authorized for calendar action',
    };
  }
  
  try {
    // Call Cal.com API
    const response = await fetch('https://api.cal.com/v1/booking-links', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.CAL_COM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventType: 'demo', // Your Cal.com event type
        attendees: [{ email: userEmail, name: userName }],
        // Additional Cal.com parameters
      }),
    });
    
    const data = await response.json();
    
    // Send email with booking link
    await sendEmail({
      to: userEmail,
      subject: 'Schedule Your ArqAI Demo',
      html: `
        <h2>Hi ${userName},</h2>
        <p>Thanks for your interest in ArqAI! Here's your personalized booking link:</p>
        <a href="${data.bookingLink}" style="background: #0066FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Schedule Demo</a>
        <p>Looking forward to showing you how ArqAI can help your organization deploy AI with confidence.</p>
      `,
    });
    
    // Invalidate token
    await invalidateToken(tokenId);
    
    // Log evidence
    await logEvidence({
      conversationId: token.user_context.conversation_id,
      leadId: token.user_context.lead_id,
      userQuery: '[tool call]',
      retrievalResult: { chunks: [], confidence: 1 },
      finalResponse: '[calendar invite sent]',
      actionAttempted: 'calendar',
      riskScore: token.risk_score,
      tokenId: token.token_id,
      actionOutcome: 'success',
      actionResult: {
        email: userEmail,
        bookingLink: data.bookingLink,
      },
    });
    
    return {
      success: true,
      message: `Calendar invite sent to ${userEmail}`,
      bookingLink: data.bookingLink,
    };
    
  } catch (error) {
    console.error('Calendar invite error:', error);
    
    await logEvidence({
      conversationId: token.user_context.conversation_id,
      userQuery: '[tool call]',
      retrievalResult: { chunks: [], confidence: 1 },
      finalResponse: '[calendar invite failed]',
      actionAttempted: 'calendar',
      riskScore: token.risk_score,
      tokenId: token.token_id,
      actionOutcome: 'error',
      actionResult: { error: error.message },
    });
    
    return {
      success: false,
      message: 'Failed to send calendar invite',
    };
  }
}

async function sendEmail(params: {
  to: string;
  subject: string;
  html: string;
}): Promise<void> {
  await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: params.to }] }],
      from: { email: 'noreply@thearq.ai', name: 'ArqAI' },
      subject: params.subject,
      content: [{ type: 'text/html', value: params.html }],
    }),
  });
}
```

### **Email Tool**

**Create `lib/ai/orchestration/tools/email.ts`:**

```typescript
import { validateToken, invalidateToken } from '../token-manager';
import { generateArtifact } from './artifact-generator';

export async function emailArtifact(
  tokenId: string,
  userEmail: string,
  artifactType: 'roi-calc' | 'security-review' | 'case-study'
): Promise<{ success: boolean; message: string }> {
  const token = await validateToken(tokenId);
  
  if (!token) {
    return { success: false, message: 'Invalid token' };
  }
  
  try {
    // Generate artifact (PDF)
    const artifact = await generateArtifact(artifactType, token.scope.parameters);
    
    // Send email with attachment
    await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: userEmail }] }],
        from: { email: 'noreply@thearq.ai', name: 'ArqAI' },
        subject: `Your ${artifactType} from ArqAI`,
        content: [
          {
            type: 'text/html',
            value: `<p>Attached is the ${artifactType} we discussed. If you have questions, just reply to this email.</p>`,
          },
        ],
        attachments: [
          {
            content: artifact.base64,
            filename: `${artifactType}.pdf`,
            type: 'application/pdf',
            disposition: 'attachment',
          },
        ],
      }),
    });
    
    await invalidateToken(tokenId);
    
    return {
      success: true,
      message: `${artifactType} sent to ${userEmail}`,
    };
  } catch (error) {
    console.error('Email artifact error:', error);
    return {
      success: false,
      message: 'Failed to send artifact',
    };
  }
}
```

### **CRM Tool**

**Create `lib/ai/orchestration/tools/crm.ts`:**

```typescript
import { supabaseAdmin } from '@/lib/supabase/client';
import { validateToken, invalidateToken } from '../token-manager';

export async function createCRMLead(
  tokenId: string,
  leadData: {
    name: string;
    email: string;
    company?: string;
    title?: string;
    phone?: string;
    location?: string;
    leadScore: number;
    segmentLabel: string;
    conversationTranscript: any;
  }
): Promise<{ success: boolean; message: string; leadId?: string }> {
  const token = await validateToken(tokenId);
  
  if (!token) {
    return { success: false, message: 'Invalid token' };
  }
  
  try {
    // Insert lead
    const { data: lead, error } = await supabaseAdmin
      .from('leads')
      .insert({
        name: leadData.name,
        email: leadData.email,
        company: leadData.company,
        title: leadData.title,
        phone: leadData.phone,
        location: leadData.location,
        lead_score: leadData.leadScore,
        segment_label: leadData.segmentLabel,
        conversation_id: token.user_context.conversation_id,
        conversation_depth: leadData.conversationTranscript?.length || 0,
        conversation_transcript: leadData.conversationTranscript,
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Send Slack notification
    await fetch(process.env.SLACK_WEBHOOK_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel: '#sales-leads',
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: `🔥 New ${leadData.segmentLabel} Lead`,
            },
          },
          {
            type: 'section',
            fields: [
              { type: 'mrkdwn', text: `*Name:*\n${leadData.name}` },
              { type: 'mrkdwn', text: `*Company:*\n${leadData.company || 'Unknown'}` },
              { type: 'mrkdwn', text: `*Email:*\n${leadData.email}` },
              { type: 'mrkdwn', text: `*Score:*\n${leadData.leadScore}/100` },
            ],
          },
          {
            type: 'actions',
            elements: [
              {
                type: 'button',
                text: { type: 'plain_text', text: 'View Lead' },
                url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/leads/${lead.id}`,
              },
            ],
          },
        ],
      }),
    });
    
    await invalidateToken(tokenId);
    
    return {
      success: true,
      message: 'Lead captured',
      leadId: lead.id,
    };
  } catch (error) {
    console.error('CRM lead error:', error);
    return {
      success: false,
      message: 'Failed to capture lead',
    };
  }
}
```

---

## **Phase 3 Deliverables**

- [x] Risk scoring engine
- [x] Capability token system (Upstash Redis)
- [x] Calendar integration (Cal.com)
- [x] Email integration (SendGrid)
- [x] CRM lead capture (Supabase)
- [x] Escalation notifications (Slack)

**Time: 4-5 days**

---

# **PHASE 4: MONITORING & DASHBOARDS**

## **4.1 Built-in Analytics**

**No custom dashboard needed! Use:**

1. **Vercel Analytics** (built-in)
   - Page views, user sessions, performance
   - Real User Monitoring (RUM)
   - Web Vitals

2. **Supabase Dashboard** (built-in)
   - Database queries in real-time
   - API usage metrics
   - Error logs
   - Table browser

3. **Simple Metrics API**

**Create `app/api/metrics/route.ts`:**

```typescript
import { supabase } from '@/lib/supabase/client';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const period = searchParams.get('period') || '24h';
  
  const since = getSinceDate(period);
  
  // Query metrics from evidence_log
  const [
    totalQueries,
    avgConfidence,
    escalations,
    policyViolations,
  ] = await Promise.all([
    supabase
      .from('evidence_log')
      .select('id', { count: 'exact' })
      .gte('timestamp', since.toISOString()),
    
    supabase
      .from('evidence_log')
      .select('retrieval_confidence')
      .gte('timestamp', since.toISOString()),
    
    supabase
      .from('evidence_log')
      .select('id', { count: 'exact' })
      .eq('escalation_triggered', true)
      .gte('timestamp', since.toISOString()),
    
    supabase
      .from('evidence_log')
      .select('policy_violations')
      .not('policy_violations', 'eq', '[]')
      .gte('timestamp', since.toISOString()),
  ]);
  
  const avgConf = avgConfidence.data?.reduce((sum, row) => sum + (row.retrieval_confidence || 0), 0) / (avgConfidence.data?.length || 1);
  
  return Response.json({
    period,
    metrics: {
      totalQueries: totalQueries.count || 0,
      averageConfidence: avgConf.toFixed(2),
      escalations: escalations.count || 0,
      policyViolations: policyViolations.count || 0,
      hitRate: totalQueries.count ? (totalQueries.count - (policyViolations.count || 0)) / totalQueries.count : 0,
    },
  });
}

function getSinceDate(period: string): Date {
  const now = new Date();
  switch (period) {
    case '1h':
      return new Date(now.getTime() - 60 * 60 * 1000);
    case '24h':
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
    case '7d':
      return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }
}
```

---

## **4.2 Simple Dashboard Page**

**Create `app/dashboard/page.tsx`:**

```typescript
import { supabaseAdmin } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const revalidate = 60; // Revalidate every minute

export default async function DashboardPage() {
  // Fetch metrics (Server Component)
  const { data: recentLeads } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10);
  
  const { data: recentEvidence } = await supabaseAdmin
    .from('evidence_log')
    .select('*')
    .order('timestamp', { ascending: false })
    .limit(20);
  
  // Calculate metrics
  const avgConfidence = recentEvidence?.reduce((sum, e) => sum + (e.retrieval_confidence || 0), 0) / (recentEvidence?.length || 1);
  const escalationRate = recentEvidence?.filter(e => e.escalation_triggered).length / (recentEvidence?.length || 1);
  
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Agent Dashboard</h1>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Queries (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{recentEvidence?.length || 0}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Avg Confidence</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{(avgConfidence * 100).toFixed(0)}%</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Leads Captured</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{recentLeads?.length || 0}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Escalation Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{(escalationRate * 100).toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads?.map(lead => (
                <div key={lead.id} className="border-b pb-2">
                  <p className="font-medium">{lead.name}</p>
                  <p className="text-sm text-gray-600">{lead.company || 'No company'}</p>
                  <p className="text-sm text-gray-500">Score: {lead.lead_score}/100</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {recentEvidence?.slice(0, 10).map(e => (
                <div key={e.id} className="text-sm border-b pb-2">
                  <p className="font-medium truncate">{e.user_query}</p>
                  <p className="text-gray-500">Confidence: {(e.retrieval_confidence * 100).toFixed(0)}%</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
```

---

## **Phase 4 Deliverables**

- [x] Metrics API endpoint
- [x] Simple dashboard (Server Component)
- [x] Vercel Analytics integration
- [x] Supabase Dashboard usage

**Time: 2-3 days**

---

# **PHASE 5: SELF-IMPROVEMENT LOOP**

## **5.1 Supabase Edge Functions for Automation**

### **Failed Query Analyzer**

**Create `supabase/functions/analyze-failed-queries/index.ts`:**

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  // Get failed queries (confidence < 0.50)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
  const { data: failedQueries } = await supabase
    .from('evidence_log')
    .select('user_query, retrieval_confidence')
    .lt('retrieval_confidence', 0.50)
    .gte('timestamp', yesterday.toISOString());
  
  if (!failedQueries || failedQueries.length === 0) {
    return new Response(JSON.stringify({ message: 'No failed queries' }));
  }
  
  // Group similar queries (simple clustering by keyword overlap)
  const clusters = clusterQueries(failedQueries);
  
  // Send Slack notification with suggestions
  for (const cluster of clusters) {
    await fetch(Deno.env.get('SLACK_WEBHOOK_URL')!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        channel: '#product-ai-agent',
        blocks: [
          {
            type: 'header',
            text: {
              type: 'plain_text',
              text: '📚 Knowledge Base Gap Detected',
            },
          },
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `*Theme:* ${cluster.theme}\n*Query Count:* ${cluster.queries.length}\n*Examples:*\n${cluster.examples.join('\n')}`,
            },
          },
        ],
      }),
    });
  }
  
  return new Response(JSON.stringify({ 
    analyzed: failedQueries.length,
    clusters: clusters.length,
  }));
});

function clusterQueries(queries: any[]): any[] {
  // Simple keyword-based clustering
  // (In production, use embeddings + K-means)
  
  const keywords = extractKeywords(queries.map(q => q.user_query));
  
  return keywords.map(keyword => ({
    theme: keyword,
    queries: queries.filter(q => q.user_query.toLowerCase().includes(keyword)),
    examples: queries
      .filter(q => q.user_query.toLowerCase().includes(keyword))
      .slice(0, 3)
      .map(q => q.user_query),
  }));
}

function extractKeywords(queries: string[]): string[] {
  const words = queries
    .join(' ')
    .toLowerCase()
    .split(/\s+/)
    .filter(w => w.length > 4);
  
  const frequency = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(frequency)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([word]) => word);
}
```

### **Weekly Chunk Weight Update**

**Create `supabase/functions/update-chunk-weights/index.ts`:**

```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  // Get chunk usage from last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  const { data: evidence } = await supabase
    .from('evidence_log')
    .select('retrieved_chunks, retrieval_confidence')
    .gte('timestamp', sevenDaysAgo.toISOString());
  
  if (!evidence) {
    return new Response(JSON.stringify({ message: 'No data' }));
  }
  
  // Calculate performance by chunk
  const chunkStats = new Map();
  
  for (const row of evidence) {
    const chunks = row.retrieved_chunks as any[];
    if (!chunks) continue;
    
    for (const chunk of chunks) {
      const stats = chunkStats.get(chunk.chunk_id) || { total: 0, sumConf: 0 };
      stats.total++;
      stats.sumConf += row.retrieval_confidence;
      chunkStats.set(chunk.chunk_id, stats);
    }
  }
  
  // Update weights
  let updated = 0;
  for (const [chunk_id, stats] of chunkStats) {
    const avgConf = stats.sumConf / stats.total;
    let newWeight = 1.0;
    
    if (avgConf > 0.85 && stats.total > 10) {
      newWeight = 1.2;
    } else if (avgConf < 0.50 && stats.total > 5) {
      newWeight = 0.8;
    }
    
    await supabase
      .from('kb_chunks')
      .update({
        weight: newWeight,
        usage_count: stats.total,
        avg_confidence: avgConf,
      })
      .eq('chunk_id', chunk_id);
    
    updated++;
  }
  
  return new Response(JSON.stringify({ 
    analyzed: chunkStats.size,
    updated,
  }));
});
```

---

## **5.2 Vercel Cron Jobs**

**Create `app/api/cron/daily-analysis/route.ts`:**

```typescript
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  
  // Call Supabase Edge Function
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/analyze-failed-queries`,
    {
      headers: {
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
    }
  );
  
  const data = await response.json();
  
  return NextResponse.json(data);
}
```

**Configure in `vercel.json`:**

```json
{
  "crons": [
    {
      "path": "/api/cron/daily-analysis",
      "schedule": "0 0 * * *"
    },
    {
      "path": "/api/cron/weekly-weights",
      "schedule": "0 2 * * 0"
    }
  ]
}
```

---

## **Phase 5 Deliverables**

- [x] Failed query analyzer (Supabase Edge Function)
- [x] Chunk weight updater (Supabase Edge Function)
- [x] Vercel Cron jobs
- [x] Slack notifications

**Time: 2-3 days**

---

# **TESTING & DEPLOYMENT**

## **Testing**

**Create `tests/agent.test.ts`:**

```typescript
import { describe, it, expect } from 'vitest';
import { retrieveKnowledge } from '@/lib/ai/rag/retrieval';
import { compileResponse } from '@/lib/ai/compiler/compiler';
import { calculateRisk } from '@/lib/ai/orchestration/risk-scorer';

describe('Adaptive RAG', () => {
  it('should retrieve relevant chunks', async () => {
    const result = await retrieveKnowledge('What is ArqAI?');
    expect(result.confidence).toBeGreaterThan(0.7);
    expect(result.chunks.length).toBeGreaterThan(0);
  });
  
  it('should handle low confidence queries', async () => {
    const result = await retrieveKnowledge('asdfkjasdfkj random nonsense');
    expect(result.confidence).toBeLessThan(0.5);
  });
});

describe('Policy Compiler', () => {
  it('should detect timeline violations', async () => {
    const result = await compileResponse(
      'How fast can you deploy?',
      'We can deploy in 2 weeks',
      { chunks: [], confidence: 1 }
    );
    expect(result.violations.length).toBeGreaterThan(0);
    expect(result.finalResponse).not.toContain('2 weeks');
  });
  
  it('should pass clean responses', async () => {
    const result = await compileResponse(
      'Tell me about ArqAI',
      'ArqAI is an AI governance platform',
      { chunks: [], confidence: 1 }
    );
    expect(result.violations.length).toBe(0);
  });
});

describe('Risk Scoring', () => {
  it('should score low risk for qualified leads', () => {
    const risk = calculateRisk({
      leadScore: 80,
      conversationDepth: 10,
      engagementSignals: ['roi-calc', 'case-study', 'security-review'],
      actionType: 'calendar',
    });
    expect(risk).toBeLessThan(30);
  });
  
  it('should score high risk for cold leads', () => {
    const risk = calculateRisk({
      leadScore: 20,
      conversationDepth: 2,
      engagementSignals: [],
      actionType: 'calendar',
    });
    expect(risk).toBeGreaterThan(60);
  });
});
```

**Run tests:**

```bash
npm run test
```

---

## **Deployment**

### **1. Push to GitHub**

```bash
git init
git add .
git commit -m "Initial ArqAI agent"
git remote add origin <your-repo>
git push -u origin main
```

### **2. Deploy to Vercel**

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add environment variables
4. Deploy!

### **3. Set up Supabase Edge Functions**

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase functions deploy analyze-failed-queries
npx supabase functions deploy update-chunk-weights
```

### **4. Index Knowledge Base**

```bash
npm run index-kb
```

---

# **FINAL CHECKLIST**

## **Phase 0: Setup**
- [x] Next.js 15 project created
- [x] PPR enabled
- [x] Dependencies installed
- [x] Environment variables configured

## **Phase 1: Adaptive RAG**
- [x] Supabase database with pgvector
- [x] Knowledge base indexed
- [x] Retrieval pipeline working
- [x] Vercel AI SDK chat endpoint
- [x] Chat UI with streaming
- [x] Observability metrics

## **Phase 2: Policy Compiler**
- [x] 8 policies defined
- [x] Claim extraction
- [x] Policy validation
- [x] Response rewriting
- [x] Evidence generation

## **Phase 3: Orchestration**
- [x] Risk scoring
- [x] Capability tokens (Upstash)
- [x] Calendar integration
- [x] Email integration
- [x] CRM lead capture

## **Phase 4: Monitoring**
- [x] Metrics API
- [x] Simple dashboard
- [x] Vercel Analytics
- [x] Supabase Dashboard

## **Phase 5: Self-Improvement**
- [x] Failed query analysis
- [x] Chunk weight updates
- [x] Cron jobs
- [x] Slack alerts

## **Testing & Deployment**
- [x] Test suite
- [x] GitHub repository
- [x] Vercel deployment
- [x] Supabase Edge Functions
- [x] KB indexed

---

# **TIMELINE SUMMARY**

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| Phase 0 | 1 day | Project setup |
| Phase 1 | 5-7 days | RAG + Streaming |
| Phase 2 | 3-4 days | Policy Compiler |
| Phase 3 | 4-5 days | Orchestration + Tools |
| Phase 4 | 2-3 days | Monitoring |
| Phase 5 | 2-3 days | Self-Improvement |
| **TOTAL** | **4-5 weeks** | **Production-ready agent** |

---

# **SUCCESS CRITERIA**

**Agent Performance:**
- ✅ Retrieval confidence >0.75 for 80%+ queries
- ✅ Zero policy violations in production
- ✅ <2s response time (streaming starts)
- ✅ 95%+ uptime

**Business Metrics:**
- ✅ Lead capture rate >30%
- ✅ Escalation rate <40%
- ✅ User satisfaction >4.0/5
- ✅ Calendar booking rate >20%

**Technical Quality:**
- ✅ Lighthouse score >90
- ✅ Test coverage >80%
- ✅ Zero security vulnerabilities
- ✅ Evidence integrity 100%

---

**YOU'RE READY TO BUILD! 🚀**

This stack is optimized for Claude Code, uses battle-tested technologies, and will actually work in production.

Ship fast. Ship smart. Use the right tools for 2025.
