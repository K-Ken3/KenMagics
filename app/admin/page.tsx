import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export const metadata = { title: 'Overview — Admin' };

export default async function AdminHome() {
  const supabase = await createClient();
  const tables = ['projects', 'services', 'clients', 'testimonials', 'process_steps', 'messages'];
  const counts = await Promise.all(
    tables.map(async (table) => ({
      table,
      count: supabase ? (await supabase.from(table).select('*', { count: 'exact', head: true })).count ?? 0 : 0,
    })),
  );

  return (
    <section className="admin-page">
      <header className="admin-head">
        <p className="label">Overview</p>
        <h1 className="serif">Good to see you, Ken.</h1>
      </header>
      <div className="admin-stats">
        {counts.map(({ table, count }) => (
          <div key={table}>
            <strong>{count}</strong>
            <span className="label">{table.replace('_', ' ')}</span>
          </div>
        ))}
      </div>
      <div className="admin-actions">
        <Link className="button" href="/admin/projects">Edit projects ↗</Link>
        <Link className="button button--ghost" href="/admin/media">Open media library ↗</Link>
      </div>
      <p className="admin-note">
        Every save publishes immediately through on-demand revalidation. Use the Draft/Published toggle to stage work.
      </p>
    </section>
  );
}
