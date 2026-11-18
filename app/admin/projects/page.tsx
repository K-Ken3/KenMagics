import Link from 'next/link';
import { SortableList } from '@/components/admin/SortableList';
import { deleteProject, reorderProjects, toggleProjectStatus } from '../actions';
import { statusLabel } from '@/lib/admin/collections';
import { createClient } from '@/lib/supabase/server';

export const metadata = { title: 'Projects — Admin' };

export default async function AdminProjects({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from('projects').select('id,title,category,year,status,sort_order').order('sort_order')
    : { data: null };

  const items = (data ?? []).map((project) => ({
    id: project.id,
    label: project.title,
    meta: `${project.category || 'Uncategorised'} · ${project.year || '—'}`,
    status: statusLabel(project.status),
  }));

  return (
    <section className="admin-page">
      <header className="admin-head admin-head--row">
        <div>
          <p className="label">Portfolio</p>
          <h1 className="serif">Projects</h1>
        </div>
        <Link className="button" href="/admin/projects/new">New project ↗</Link>
      </header>
      {saved ? <p className="admin-success">Saved. The live site has been revalidated.</p> : null}
      {items.length ? (
        <SortableList
          items={items}
          onReorder={reorderProjects}
          toggleStatus={toggleProjectStatus}
          deleteAction={deleteProject}
          basePath="/admin/projects"
        />
      ) : (
        <div className="admin-empty">
          <p>No projects yet.</p>
          <Link href="/admin/projects/new">Create the first one</Link>
        </div>
      )}
    </section>
  );
}
