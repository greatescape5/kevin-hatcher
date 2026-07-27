'use client';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Browser client for the admin area. Persists the login session in the browser
// so the admin stays logged in between page loads.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let _client: SupabaseClient | null = null;

export function browserSupabase(): SupabaseClient {
  if (!_client) {
    // Placeholder values keep `next build` from crashing when env vars are
    // absent (e.g. a local build with no .env.local). Real values are inlined
    // at build time on Vercel, so the browser always gets the real client.
    _client = createClient(
      url || 'https://placeholder.supabase.co',
      anonKey || 'public-anon-key-placeholder',
      { auth: { persistSession: true, autoRefreshToken: true } },
    );
  }
  return _client;
}
