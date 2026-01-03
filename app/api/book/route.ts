import { NextRequest, NextResponse } from 'next/server';
import { createBooking, getCalBookingUrl } from '@/lib/calcom/client';
import { createSupabaseAdmin } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, notes, startTime, endTime, timeZone, conversationId, leadId } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // If we have start/end times, try to create a booking via API
    if (startTime && endTime) {
      const result = await createBooking({
        name,
        email,
        company,
        notes,
        startTime,
        endTime,
        timeZone: timeZone || 'America/New_York',
      });

      if (result.success) {
        // Log the booking request to database
        if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
          const supabase = createSupabaseAdmin();
          if (supabase) {
            await supabase.from('booking_requests').insert({
              lead_id: leadId || null,
              conversation_id: conversationId || null,
              cal_event_id: result.bookingId,
              scheduled_time: startTime,
              duration_minutes: 30,
              status: 'confirmed',
              notes,
            });
          }
        }

        return NextResponse.json({
          success: true,
          bookingId: result.bookingId,
          message: 'Booking confirmed!',
        });
      } else {
        return NextResponse.json({
          success: false,
          error: result.error,
          // Fallback to booking URL
          bookingUrl: getCalBookingUrl({ name, email, notes }),
        }, { status: 400 });
      }
    }

    // If no times provided, return the booking URL
    const bookingUrl = getCalBookingUrl({ name, email, notes });

    // Log the booking request to database
    if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const supabase = createSupabaseAdmin();
      if (supabase) {
        await supabase.from('booking_requests').insert({
          lead_id: leadId || null,
          conversation_id: conversationId || null,
          status: 'pending',
          notes,
        });
      }
    }

    return NextResponse.json({
      success: true,
      bookingUrl,
      message: 'Click the link to schedule your call',
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process booking' },
      { status: 500 }
    );
  }
}

export async function GET() {
  // Return the booking URL for GET requests
  const bookingUrl = getCalBookingUrl();
  return NextResponse.json({ bookingUrl });
}
