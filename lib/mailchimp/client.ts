const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY;
const MAILCHIMP_SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX || 'us5';

// Default list ID - would be configured per account
const DEFAULT_LIST_ID = process.env.MAILCHIMP_LIST_ID || '';

interface SubscribeOptions {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  tags?: string[];
  source?: string;
}

interface MailchimpError {
  status: number;
  title: string;
  detail: string;
}

export async function subscribeToNewsletter(options: SubscribeOptions): Promise<{ success: boolean; error?: string }> {
  if (!MAILCHIMP_API_KEY) {
    console.warn('MAILCHIMP_API_KEY not configured');
    return { success: false, error: 'Email service not configured' };
  }

  if (!DEFAULT_LIST_ID) {
    console.warn('MAILCHIMP_LIST_ID not configured');
    return { success: false, error: 'Email list not configured' };
  }

  try {
    const response = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${DEFAULT_LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        },
        body: JSON.stringify({
          email_address: options.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: options.firstName || '',
            LNAME: options.lastName || '',
            COMPANY: options.company || '',
          },
          tags: options.tags || ['website-signup'],
          source: options.source || 'ArqAI Website',
        }),
      }
    );

    if (!response.ok) {
      const errorData: MailchimpError = await response.json();

      // Handle already subscribed
      if (response.status === 400 && errorData.title === 'Member Exists') {
        return { success: true }; // Already subscribed is still a success
      }

      throw new Error(errorData.detail || `Mailchimp API error: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error subscribing to Mailchimp:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function sendTransactionalEmail(options: {
  to: string;
  templateName: string;
  subject: string;
  mergeVars?: Record<string, string>;
}): Promise<{ success: boolean; error?: string }> {
  // Mailchimp transactional (Mandrill) requires separate API
  // For now, we'll log and return success
  console.log('Transactional email would be sent:', options);
  return { success: true };
}

export async function addTagToMember(email: string, tags: string[]): Promise<{ success: boolean; error?: string }> {
  if (!MAILCHIMP_API_KEY || !DEFAULT_LIST_ID) {
    return { success: false, error: 'Mailchimp not configured' };
  }

  try {
    const emailHash = require('crypto').createHash('md5').update(email.toLowerCase()).digest('hex');

    const response = await fetch(
      `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${DEFAULT_LIST_ID}/members/${emailHash}/tags`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString('base64')}`,
        },
        body: JSON.stringify({
          tags: tags.map((tag) => ({ name: tag, status: 'active' })),
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Mailchimp API error: ${response.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error('Error adding tags in Mailchimp:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
