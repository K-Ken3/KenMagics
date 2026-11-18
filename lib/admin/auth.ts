import { createClient } from '@/lib/supabase/server';

export async function getAdminUser() {
  const supabase = await createClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return null;

  const { data, error } = await supabase
    .from('admin_allowed_emails')
    .select('email')
    .ilike('email', user.email)
    .maybeSingle();
  if (error || !data) return null;
  return user;
}

export async function assertAdmin() {
  const user = await getAdminUser();
  if (!user) throw new Error('Unauthorized');
  return user;
}
