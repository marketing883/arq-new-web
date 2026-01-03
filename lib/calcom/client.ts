const CAL_API_KEY = process.env.CAL_COM_API_KEY;
const CAL_BOOKING_URL = process.env.CAL_COM_BOOKING_URL || 'https://cal.com/habib-mehmoodi-rj394w/30min';

export interface BookingDetails {
  name: string;
  email: string;
  company?: string;
  notes?: string;
  startTime: string;
  endTime: string;
  timeZone: string;
}

export interface AvailableSlot {
  start: string;
  end: string;
}

export async function getAvailableSlots(
  dateFrom: string,
  dateTo: string,
  timeZone: string = 'America/New_York'
): Promise<AvailableSlot[]> {
  if (!CAL_API_KEY) {
    console.warn('CAL_COM_API_KEY not configured');
    return [];
  }

  try {
    const response = await fetch(
      `https://api.cal.com/v1/availability?apiKey=${CAL_API_KEY}&dateFrom=${dateFrom}&dateTo=${dateTo}&timeZone=${encodeURIComponent(timeZone)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Cal.com API error: ${response.status}`);
    }

    const data = await response.json();
    return data.slots || [];
  } catch (error) {
    console.error('Error fetching Cal.com availability:', error);
    return [];
  }
}

export async function createBooking(details: BookingDetails): Promise<{ success: boolean; bookingId?: string; error?: string }> {
  if (!CAL_API_KEY) {
    return { success: false, error: 'CAL_COM_API_KEY not configured' };
  }

  try {
    const response = await fetch(`https://api.cal.com/v1/bookings?apiKey=${CAL_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        eventTypeId: 1, // Default event type - would need to be configured
        start: details.startTime,
        end: details.endTime,
        timeZone: details.timeZone,
        language: 'en',
        metadata: {
          company: details.company,
        },
        responses: {
          name: details.name,
          email: details.email,
          notes: details.notes || '',
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Cal.com API error: ${response.status}`);
    }

    const data = await response.json();
    return { success: true, bookingId: data.id?.toString() };
  } catch (error) {
    console.error('Error creating Cal.com booking:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export function getCalBookingUrl(params?: {
  name?: string;
  email?: string;
  notes?: string;
}): string {
  const url = new URL(CAL_BOOKING_URL);

  if (params?.name) {
    url.searchParams.set('name', params.name);
  }
  if (params?.email) {
    url.searchParams.set('email', params.email);
  }
  if (params?.notes) {
    url.searchParams.set('notes', params.notes);
  }

  return url.toString();
}
