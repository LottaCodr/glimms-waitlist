import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Public Supabase client (anon key). Safe for server-side use only.
 * The anon key is intentionally public (NEXT_PUBLIC_) but this module is
 * server-only to prevent accidental bundling of the service-role key.
 * We use a runtime guard (typeof window) instead of `import 'server-only'`
 * to avoid Netlify's `react-server` export condition issues.
 */
let cachedClient: SupabaseClient | null = null;

function assertPublicEnv(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build' || process.env.NETLIFY === 'true' || process.env.CI === 'true';
  if (!url || !anonKey) {
    if (isBuild) {
      // Allow `next build` to succeed without real env (Netlify preview without secrets)
      return {
        url: url || 'https://placeholder.supabase.co',
        anonKey: anonKey || 'placeholder-anon-key-for-build',
      };
    }
    throw new Error(
      'Missing Supabase public env vars: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY',
    );
  }
  return { url, anonKey };
}

export function getSupabase(): SupabaseClient {
  assertPublicEnv();
  if (!cachedClient) {
    const { url, anonKey } = assertPublicEnv();
    cachedClient = createClient(url, anonKey);
  }
  return cachedClient;
}

/**
 * Admin client — uses SUPABASE_SERVICE_ROLE_KEY (secret, never NEXT_PUBLIC).
 * Guarded to run only on the server. Never import this in a Client Component.
 */
let cachedAdminClient: SupabaseClient | null = null;

function assertAdminEnv(): { url: string; serviceRoleKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build' || process.env.NETLIFY === 'true' || process.env.CI === 'true';
  if (!url || !serviceRoleKey) {
    if (isBuild) {
      return {
        url: url || 'https://placeholder.supabase.co',
        serviceRoleKey: serviceRoleKey || 'placeholder-service-role-key-for-build',
      };
    }
    if (!url) throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_URL');
    if (!serviceRoleKey) throw new Error('Missing env: SUPABASE_SERVICE_ROLE_KEY (server-only)');
  }
  return { url: url!, serviceRoleKey: serviceRoleKey! };
}

export function supabaseAdmin(): SupabaseClient {
  if (typeof window !== 'undefined') {
    throw new Error('supabaseAdmin() must only be called on the server');
  }
  assertAdminEnv();
  if (!cachedAdminClient) {
    const { url, serviceRoleKey } = assertAdminEnv();
    cachedAdminClient = createClient(url, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return cachedAdminClient;
}

export interface WaitlistEntry {
  id: string;
  email: string;
  name: string | null;
  referral_code: string;
  referred_by: string | null;
  referral_count: number;
  position: number;
  source: string;
  unsubscribed: boolean;
  created_at: string;
}

export function effectivePosition(entry: WaitlistEntry): number {
  return Math.max(1, entry.position - entry.referral_count * 10);
}
