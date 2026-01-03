import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create Supabase client for browser
export const supabase = createClient(supabaseUrl, supabaseKey);

// Create Supabase admin client for server-side operations
export const createSupabaseAdmin = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!serviceRoleKey) {
    console.warn('SUPABASE_SERVICE_ROLE_KEY not set');
    return supabase;
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
