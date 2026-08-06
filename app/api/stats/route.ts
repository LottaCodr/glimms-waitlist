import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { count } = await supabaseAdmin()
    .from('waitlist_entries')
    .select('id', { count: 'exact', head: true })
    .eq('unsubscribed', false);

  // NEXT_PUBLIC_BASE_COUNT is intentionally public — not a secret
  const base = parseInt(process.env.NEXT_PUBLIC_BASE_COUNT ?? '2847', 10);
  return NextResponse.json(
    { count: base + (count ?? 0) },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } },
  );
}
