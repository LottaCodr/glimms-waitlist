import { redirect }     from 'next/navigation';
import { cookies }      from 'next/headers';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

interface Props { params: { code: string } }

export default async function ReferralRedirectPage({ params }: Props) {
  const { code } = params;

  // Validate the referral code exists
  const { data } = await supabaseAdmin()
    .from('waitlist_entries')
    .select('referral_code')
    .eq('referral_code', code)
    .single();

  // Set referral cookie (30 day TTL) so the homepage form picks it up
  if (data) {
    cookies().set('glimms_ref', code, {
      maxAge:   30 * 24 * 60 * 60,
      path:     '/',
      sameSite: 'lax',
      secure:   process.env.NODE_ENV === 'production',
    });
  }

  // Always redirect to home — referral code in cookie is picked up by form
  redirect(`/?ref=${code}`);
}
