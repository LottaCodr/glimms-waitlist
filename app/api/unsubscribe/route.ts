import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  let code: unknown;
  try {
    const body = (await req.json()) as { code?: unknown };
    code = body.code;
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  if (!code || typeof code !== 'string') {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  const { error } = await supabaseAdmin()
    .from('waitlist_entries')
    .update({ unsubscribed: true })
    .eq('referral_code', code);

  if (error) {
    // Do not leak DB error details to client
    console.error('[unsubscribe] failed', { code: error.code });
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
