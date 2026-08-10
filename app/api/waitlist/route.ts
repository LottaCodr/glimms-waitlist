import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin, effectivePosition, WaitlistEntry } from '@/lib/supabase';
import { sendWelcomeEmail, sendReferralNotificationEmail } from '@/lib/resend';
import { generateReferralCode } from '@/lib/utils';

const schema = z.object({
  email:      z.string().email('Please enter a valid email address'),
  name:       z.string().max(100).optional(),
  referredBy: z.string().max(20).optional(),
  source:     z.string().max(50).optional(),
});

export async function POST(req: NextRequest) {

  let rawBody: unknown;
  
  try {
    rawBody = await req.text();
  } catch (err) {
    console.error('Error parsing request body:', err);
    return NextResponse.json({ error: 'Request body is missing or not valid JSON' }, { status: 400 });
  }

  //Gaurd: if body was double-stringified, parse it again
  if(typeof rawBody === 'string') {
    try {
      rawBody = JSON.parse(rawBody);
    } catch (err) {
      console.error('Error parsing request body:', err);
      return NextResponse.json({ error: 'Request body is not valid JSON' }, { status: 400 });
    }
  }

  try {
    const input = schema.safeParse(rawBody);
    if (!input.success) {
      return NextResponse.json({ error: input.error.errors[0]?.message ?? 'Invalid input' }, { status: 400 });
    }

    const { email, name, referredBy, source } = input.data;
    const db = supabaseAdmin();

    // Check duplicate
    const { data: existing } = await db.from('waitlist_entries')
      .select('id, email, referral_code, position, referral_count')
      .eq('email', email.toLowerCase()).single();

    if (existing) {
      return NextResponse.json({
        error: 'already_registered',
        message: "You're already on the waitlist!",
        referralCode: existing.referral_code,
        position: effectivePosition(existing as WaitlistEntry),
      }, { status: 409 });
    }

    // Validate referral code
    let validatedReferredBy: string | null = null;
    if (referredBy) {
      const { data: ref } = await db.from('waitlist_entries')
        .select('referral_code').eq('referral_code', referredBy).single();
      if (ref) validatedReferredBy = referredBy;
    }

    // ── Insert ────────────────────────────────────────────────────────────────────
    const referralCode = generateReferralCode();
    const { error: insertError } = await db
      .from('waitlist_entries')
      .insert({
        email:         email.toLowerCase(),
        name:          name ?? null,
        referral_code: referralCode,
        referred_by:   validatedReferredBy,
        source:        source ?? (validatedReferredBy ? 'referral' : 'direct'),
      });

    if (insertError) {
      console.error('Insert error:', insertError);
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    // ── Fetch the created row ─────────────────────────────────────────────────────
    const { data: entry, error: fetchError } = await db
      .from('waitlist_entries')
      .select('*')
      .eq('referral_code', referralCode)
      .single();

    if (fetchError || !entry) {
      console.error('Fetch error:', fetchError);
      return NextResponse.json({ error: 'Failed to retrieve entry' }, { status: 500 });
    }

    const position = effectivePosition(entry as WaitlistEntry);

    // Await delivery attempts so serverless execution cannot end before Resend receives them.
    // A delivery failure never rolls back a successful waitlist signup.
    await sendWelcomeEmail({ email, name: name ?? null, position, referralCode })
      .catch(error => console.error('Welcome email failed:', error));

    if (validatedReferredBy) {
      const { data: referrer } = await db
        .from('waitlist_entries')
        .select('email, name, referral_count, position, referral_code')
        .eq('referral_code', validatedReferredBy)
        .single();

      if (referrer) {
        await sendReferralNotificationEmail({
          referrerEmail: referrer.email,
          referrerName: referrer.name,
          newPosition: effectivePosition(referrer as WaitlistEntry),
          referralCount: referrer.referral_count,
          referralCode: referrer.referral_code,
        }).catch(error => console.error('Referral notification email failed:', error));
      }
    }

    return NextResponse.json({ success: true, position, referralCode }, { status: 201 });

  } catch (err) {
    console.error('Waitlist API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 });

  const { data } = await supabaseAdmin().from('waitlist_entries')
    .select('position, referral_count, referral_code, name, created_at')
    .eq('referral_code', code).single();

  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    position: effectivePosition(data as WaitlistEntry),
    referralCount: data.referral_count,
    referralCode:  data.referral_code,
    joinedAt:      data.created_at,
  });
}
