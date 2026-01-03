import { NextRequest, NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase/client';

interface LeadData {
  name: string;
  email: string;
  company?: string;
  title?: string;
  phone?: string;
  functionExplored?: string;
  conversationId?: string;
  leadScore?: number;
  painPoints?: string[];
  interests?: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json();
    const { name, email, company, title, phone, functionExplored, conversationId, leadScore, painPoints, interests } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const supabase = createSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    // Calculate segment based on lead score
    const score = leadScore || 50;
    let segmentLabel: string;
    if (score >= 80) {
      segmentLabel = 'Hot';
    } else if (score >= 60) {
      segmentLabel = 'Warm';
    } else if (score >= 40) {
      segmentLabel = 'Nurture';
    } else {
      segmentLabel = 'Research';
    }

    // Upsert lead
    const { data, error } = await supabase
      .from('leads')
      .upsert(
        {
          name,
          email: email.toLowerCase(),
          company,
          title,
          phone,
          function_explored: functionExplored,
          conversation_id: conversationId,
          lead_score: score,
          segment_label: segmentLabel,
          readiness_level: segmentLabel,
          pain_points: painPoints || [],
          interests: interests || [],
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'email' }
      )
      .select()
      .single();

    if (error) {
      console.error('Error creating lead:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      lead: data,
    });
  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create lead' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 });
    }

    const supabase = createSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 });
    }

    const searchParams = request.nextUrl.searchParams;
    const segment = searchParams.get('segment');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (segment) {
      query = query.eq('segment_label', segment);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching leads:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      leads: data,
      total: count,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Leads API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}
