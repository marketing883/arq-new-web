import { createSupabaseAdmin } from '@/lib/supabase/client';
import { generateEmbedding } from '@/lib/openai/embeddings';

export interface KBChunk {
  chunk_id: string;
  content: string;
  category: string;
  subcategory?: string;
  function_area?: string;
  confidence: 'high' | 'medium' | 'low';
  metadata?: Record<string, unknown>;
}

export interface RetrievalResult {
  chunk_id: string;
  content: string;
  category: string;
  function_area: string | null;
  confidence: string;
  similarity: number;
}

export async function retrieveRelevantChunks(
  query: string,
  options: {
    matchThreshold?: number;
    matchCount?: number;
    filterCategory?: string;
    filterFunction?: string;
  } = {}
): Promise<RetrievalResult[]> {
  const {
    matchThreshold = 0.7,
    matchCount = 5,
    filterCategory,
    filterFunction,
  } = options;

  const supabase = createSupabaseAdmin();
  if (!supabase) {
    console.warn('Supabase not configured, skipping RAG retrieval');
    return [];
  }

  // Generate embedding for the query
  const queryEmbedding = await generateEmbedding(query);

  // Call the Supabase RPC function for semantic search
  const { data, error } = await supabase.rpc('match_kb_chunks', {
    query_embedding: queryEmbedding,
    match_threshold: matchThreshold,
    match_count: matchCount,
    filter_category: filterCategory || null,
    filter_function: filterFunction || null,
  });

  if (error) {
    console.error('Error retrieving chunks:', error);
    return [];
  }

  return data || [];
}

export function buildContextFromChunks(chunks: RetrievalResult[]): string {
  if (chunks.length === 0) {
    return '';
  }

  const contextParts = chunks.map((chunk, index) => {
    return `[Source ${index + 1} - ${chunk.category}${chunk.function_area ? ` (${chunk.function_area})` : ''} - Relevance: ${(chunk.similarity * 100).toFixed(1)}%]
${chunk.content}`;
  });

  return `RELEVANT KNOWLEDGE BASE CONTEXT:
${contextParts.join('\n\n')}

---
Use the above context to inform your response. Cite specific details when applicable.`;
}

export async function logEvidence(
  conversationId: string,
  userQuery: string,
  matchedChunks: string[],
  retrievalConfidence: number,
  agentResponse: string,
  responseTimeMs: number
): Promise<void> {
  const supabase = createSupabaseAdmin();
  if (!supabase) {
    console.warn('Supabase not configured, skipping evidence logging');
    return;
  }

  await supabase.from('evidence_log').insert({
    conversation_id: conversationId,
    user_query: userQuery,
    matched_chunks: matchedChunks,
    retrieval_confidence: retrievalConfidence,
    agent_response_final: agentResponse,
    response_time_ms: responseTimeMs,
  });
}
