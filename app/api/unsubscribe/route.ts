import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { code } = await req.json();
  if (!code) return NextResponse.json({ error: 'Missing code' }, { status: 400 });

  const { error } = await supabaseAdmin()
    .from('waitlist_entries')
    .update({ unsubscribed: true, unsubscribed_at: new Date().toISOString() })
    .eq('referral_code', code);

  if (error) return NextResponse.json({ error: 'Failed' }, { status: 500 });
  return NextResponse.json({ success: true });
}
