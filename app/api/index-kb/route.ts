import { NextRequest, NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';
import { indexKnowledgeBase } from '@/lib/rag/indexer';

export async function POST(request: NextRequest) {
  try {
    // Verify authorization (use a secret key in production)
    const authHeader = request.headers.get('authorization');
    const expectedKey = process.env.CRON_SECRET || process.env.JWT_SECRET;

    if (!authHeader || authHeader !== `Bearer ${expectedKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check for required environment variables
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OPENAI_API_KEY not configured' }, { status: 500 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'NEXT_PUBLIC_SUPABASE_URL not configured' }, { status: 500 });
    }

    // Read the knowledge base file
    const kbPath = join(process.cwd(), 'data', 'knowledge-base', 'ArqAI_Agent_Knowledge_Base_v1.md');
    let kbContent: string;

    try {
      kbContent = readFileSync(kbPath, 'utf-8');
    } catch {
      return NextResponse.json({ error: 'Knowledge base file not found' }, { status: 404 });
    }

    // Index the knowledge base
    const result = await indexKnowledgeBase(kbContent);

    if (result.success) {
      return NextResponse.json({
        message: 'Knowledge base indexed successfully',
        chunksIndexed: result.indexed,
      });
    } else {
      return NextResponse.json({
        message: 'Indexing completed with errors',
        chunksIndexed: result.indexed,
        errors: result.errors,
      }, { status: 207 });
    }
  } catch (error) {
    console.error('Error indexing knowledge base:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to index knowledge base' },
      { status: 500 }
    );
  }
}
