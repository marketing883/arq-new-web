import { NextRequest, NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/lib/mailchimp/client';
import { createSupabaseAdmin } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName, lastName, company, source } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // Store in database first
    let dbSuccess = false;
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createSupabaseAdmin();
      if (supabase) {
        const { error: dbError } = await supabase.from('email_subscriptions').upsert(
          {
            email: email.toLowerCase(),
            name: firstName ? `${firstName} ${lastName || ''}`.trim() : null,
            source: source || 'website',
            subscribed: true,
          },
          { onConflict: 'email' }
        );

        if (dbError) {
          console.warn('Failed to store subscription in database:', dbError);
        } else {
          dbSuccess = true;
        }
      }
    }

    // Subscribe to Mailchimp
    const result = await subscribeToNewsletter({
      email,
      firstName,
      lastName,
      company,
      source: source || 'ArqAI Website',
      tags: ['website-signup'],
    });

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to updates!',
      });
    } else {
      // Still return success if database worked
      if (dbSuccess) {
        return NextResponse.json({
          success: true,
          message: 'Successfully subscribed to updates!',
        });
      }

      return NextResponse.json({
        success: false,
        error: result.error || 'Failed to subscribe',
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Subscribe API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
