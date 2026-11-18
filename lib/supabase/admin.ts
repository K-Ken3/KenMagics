import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { getServiceKey, getSupabaseUrl, hasServiceSupabaseEnv } from './env';

/**
 * Service-role client for trusted server work only (seeding, revalidation
 * helpers, contact storage). Never import this into a Client Component.
 */
export function createAdminClient() {
  if (!hasServiceSupabaseEnv) return null;
  return createSupabaseClient(getSupabaseUrl(), getServiceKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
