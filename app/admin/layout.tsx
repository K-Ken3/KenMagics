import Link from 'next/link';
import { redirect } from 'next/navigation';
import { signOut } from './actions';
import { getAdminUser } from '@/lib/admin/auth';
import { hasPublicSupabaseEnv } from '@/lib/supabase/env';

export const metadata = { title: 'Admin' };

const nav = [
  { href: '/admin', label: 'Overview' },
  { href: '/admin/projects', label: 'Projects' },
  { href: '/admin/services', label: 'Services' },
  { href: '/admin/clients', label: 'Clients' },
  { href: '/admin/testimonials', label: 'Testimonials' },
  { href: '/admin/process_steps', label: 'Process' },
  { href: '/admin/settings', label: 'Site & About' },
  { href: '/admin/media', label: 'Media' },
  { href: '/admin/messages', label: 'Messages' },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!hasPublicSupabaseEnv) {
    return (
      <main className="admin-login">
        <div className="admin-login__card">
          <p className="label">KenDesigns / CMS</p>
          <h1 className="serif">Connect Supabase first.</h1>
          <p className="admin-note">
            Copy <code>.env.example</code> to <code>.env.local</code>, add your project keys, apply{' '}
            <code>supabase/migrations/0001_initial.sql</code> and run <code>npm run seed</code>.
          </p>
        </div>
      </main>
    );
  }

  const user = await getAdminUser();
  if (!user) redirect('/admin/login');

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link href="/admin" className="admin-brand serif">Ken.</Link>
        <p className="label">Portfolio CMS</p>
        <nav aria-label="Admin">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="admin-sidebar__foot">
          <Link className="admin-preview" href="/" target="_blank">Live site ↗</Link>
          <form action={signOut}>
            <button type="submit" className="label">Sign out</button>
          </form>
        </div>
      </aside>
      <main className="admin-main">{children}</main>
    </div>
  );
}
