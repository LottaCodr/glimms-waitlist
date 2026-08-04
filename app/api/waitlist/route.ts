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
  try {
    const input = schema.safeParse(await req.json());
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

    // Insert
    const referralCode = generateReferralCode();
    const { data: entry, error } = await db.from('waitlist_entries').insert({
      email: email.toLowerCase(), name: name ?? null,
      referral_code: referralCode, referred_by: validatedReferredBy,
      source: source ?? (validatedReferredBy ? 'referral' : 'direct'),
    }).select().single();

    if (error || !entry) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: 'Failed to join waitlist' }, { status: 500 });
    }

    const position = effectivePosition(entry as WaitlistEntry);

    // Welcome email (non-blocking)
    sendWelcomeEmail({ email, name: name ?? null, position, referralCode })
      .catch(e => console.error('Welcome email failed:', e));

    // Notify referrer (non-blocking)
    if (validatedReferredBy) {
      db.from('waitlist_entries').select('email, name, referral_count, position, referral_code')
        .eq('referral_code', validatedReferredBy).single()
        .then(({ data: referrer }) => {
          if (!referrer) return;
          sendReferralNotificationEmail({
            referrerEmail: referrer.email, referrerName: referrer.name,
            newPosition: effectivePosition(referrer as WaitlistEntry),
            referralCount: referrer.referral_count, referralCode: referrer.referral_code,
          }).catch(console.error);
        });
    }

    return NextResponse.json({ success: true, position, referralCode });

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
