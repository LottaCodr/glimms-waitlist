import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const revalidate = 60;

export async function GET() {
  const { count } = await supabaseAdmin()
    .from('waitlist_entries')
    .select('id', { count: 'exact', head: true })
    .eq('unsubscribed', false);

  const base  = parseInt(process.env.NEXT_PUBLIC_BASE_COUNT ?? '2847');
  return NextResponse.json(
    { count: base + (count ?? 0) },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' } },
  );
}
