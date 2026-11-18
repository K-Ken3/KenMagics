'use client';

import { createBrowserClient } from '@supabase/ssr';
import { getAnonKey, getSupabaseUrl, hasPublicSupabaseEnv } from './env';

/** Browser client for auth and realtime. Returns null when Supabase is not configured. */
export function createClient() {
  if (!hasPublicSupabaseEnv) return null;
  return createBrowserClient(getSupabaseUrl(), getAnonKey());
}
