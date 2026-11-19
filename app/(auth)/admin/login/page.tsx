import { LoginForm } from './LoginForm';
import { hasPublicSupabaseEnv } from '@/lib/supabase/env';

export const metadata = { title: 'Admin login' };

export default function AdminLogin() {
  return (
    <main className="admin-login">
      <div className="admin-login__card">
        <p className="label">KenDesigns / CMS</p>
        <h1 className="serif">Sign in to edit.</h1>
        {hasPublicSupabaseEnv ? (
          <LoginForm />
        ) : (
          <p className="admin-note">
            Supabase is not configured. Add the values from <code>.env.example</code> to <code>.env.local</code>, run the
            migration and seed, then reload.
          </p>
        )}
      </div>
    </main>
  );
}
