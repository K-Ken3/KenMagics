const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasPublicSupabaseEnv = Boolean(url && anonKey);
export const hasServiceSupabaseEnv = Boolean(url && serviceKey);

export function getSupabaseUrl() {
  if (!url) throw new Error('NEXT_PUBLIC_SUPABASE_URL is not set. See .env.example.');
  return url;
}

export function getAnonKey() {
  if (!anonKey) throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set. See .env.example.');
  return anonKey;
}

export function getServiceKey() {
  if (!serviceKey) throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set. See .env.example.');
  return serviceKey;
}
