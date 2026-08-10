import { NextRequest, NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: 'Webhook is not configured' }, { status: 503 });

  const payload = await request.text();
  try {
    new Webhook(secret).verify(payload, {
      'svix-id': request.headers.get('svix-id') ?? '',
      'svix-timestamp': request.headers.get('svix-timestamp') ?? '',
      'svix-signature': request.headers.get('svix-signature') ?? '',
    });
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
  }

  const event = JSON.parse(payload) as { type?: string; data?: { to?: string | string[] } };
  if (!['email.bounced', 'email.complained'].includes(event.type ?? '')) {
    return NextResponse.json({ received: true });
  }

  const recipients = Array.isArray(event.data?.to) ? event.data.to : [event.data?.to];
  const emails = recipients.filter((email): email is string => Boolean(email));
  if (emails.length) {
    const status = event.type === 'email.complained' ? 'complained' : 'bounced';
    const { error } = await supabaseAdmin()
      .from('waitlist_entries')
      .update({ email_status: status, email_bounced_at: new Date().toISOString() })
      .in('email', emails.map(email => email.toLowerCase()));
    if (error) {
      console.error('Unable to suppress Resend recipient:', error.message);
      return NextResponse.json({ error: 'Unable to process webhook' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
