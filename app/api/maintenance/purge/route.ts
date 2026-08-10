import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const authorization = request.headers.get('authorization');
  if (!process.env.CRON_SECRET || authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { error, count } = await supabaseAdmin()
    .from('waitlist_entries')
    .delete({ count: 'exact' })
    .eq('unsubscribed', true)
    .lt('unsubscribed_at', cutoff);

  if (error) {
    console.error('Waitlist purge failed:', error.message);
    return NextResponse.json({ error: 'Purge failed' }, { status: 500 });
  }
  return NextResponse.json({ deleted: count ?? 0 });
}
