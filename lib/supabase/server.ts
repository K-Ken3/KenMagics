import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { getAnonKey, getSupabaseUrl, hasPublicSupabaseEnv } from './env';

/** Request-scoped client that carries the admin auth cookie. */
export async function createClient() {
  if (!hasPublicSupabaseEnv) return null;
  const cookieStore = await cookies();

  return createServerClient(getSupabaseUrl(), getAnonKey(), {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(items) {
        try {
          items.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Server Components cannot set cookies; middleware refreshes them.
        }
      },
    },
  });
}
