import { createClient, SupabaseClient } from '@supabase/supabase-js';

let cachedClient: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!cachedClient) {
    cachedClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  return cachedClient;
}

let cachedAdminClient: SupabaseClient | null = null;

export function supabaseAdmin() {
  if (!cachedAdminClient) {
    cachedAdminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    );
  }
  return cachedAdminClient;
}

export interface WaitlistEntry {
  id:             string;
  email:          string;
  name:           string | null;
  referral_code:  string;
  referred_by:    string | null;
  referral_count: number;
  position:       number;
  source:         string;
  unsubscribed:   boolean;
  created_at:     string;
}

export function effectivePosition(entry: WaitlistEntry): number {
  return Math.max(1, entry.position - entry.referral_count * 10);
}
