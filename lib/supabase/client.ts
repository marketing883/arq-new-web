import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a null client when not configured
let _supabaseClient: SupabaseClient | null = null;

// Create Supabase client for browser (lazy initialization)
export const getSupabase = (): SupabaseClient | null => {
  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  if (!_supabaseClient) {
    _supabaseClient = createClient(supabaseUrl, supabaseKey);
  }

  return _supabaseClient;
};

// Legacy export for backwards compatibility
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// Create Supabase admin client for server-side operations
export const createSupabaseAdmin = (): SupabaseClient | null => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    console.warn('NEXT_PUBLIC_SUPABASE_URL not set');
    return null;
  }

  if (!serviceRoleKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not set');
    // Fall back to anon key if available
    if (supabaseKey) {
      return createClient(supabaseUrl, supabaseKey);
    }
    return null;
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

// Database types (placeholder - would be auto-generated from Supabase)
export type Database = {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          company: string | null;
          title: string | null;
          lead_score: number;
          segment_label: string | null;
          conversation_id: string;
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          company?: string;
          title?: string;
          lead_score?: number;
          segment_label?: string;
          conversation_id: string;
        };
      };
      kb_chunks: {
        Row: {
          id: string;
          chunk_id: string;
          content: string;
          category: string;
          confidence: string;
        };
      };
      evidence_log: {
        Row: {
          id: string;
          conversation_id: string;
          user_query: string;
          retrieval_confidence: number;
          agent_response_final: string;
          timestamp: string;
        };
      };
    };
  };
};
