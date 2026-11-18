import { randomUUID } from 'node:crypto';
import { notFound } from 'next/navigation';
import { ProjectForm } from '../ProjectForm';
import { createClient } from '@/lib/supabase/server';

export const metadata = { title: 'Edit project — Admin' };

const blank = {
  id: '',
  slug: '',
  title: '',
  kind: 'software',
  category: '',
  year: '',
  client: '',
  role: '',
  summary: '',
  longDescription: '',
  coverImage: '',
  coverAlt: '',
  tags: '',
  tools: '',
  externalLink: '',
  featured: false,
  status: 'draft',
  sortOrder: 1,
  readTime: '',
  aspectRatio: '',
  challenge: '',
  solution: '',
  impact: '',
  gallery: '',
  needsRealMedia: false,
};

export default async function EditProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  if (id === 'new') {
    return (
      <section className="admin-page">
        <header className="admin-head">
          <p className="label">Projects / New</p>
          <h1 className="serif">New project</h1>
        </header>
        <ProjectForm project={{ ...blank, id: randomUUID() }} />
      </section>
    );
  }

  const { data } = supabase ? await supabase.from('projects').select('*').eq('id', id).maybeSingle() : { data: null };
  if (!data) notFound();

  const { data: mediaRows } = supabase
    ? await supabase.from('project_media').select('*').eq('project_id', id).order('sort_order')
    : { data: null };
  const gallery = (mediaRows ?? [])
    .map((item) => {
      const columns = [item.url, item.alt ?? '', item.caption ?? '', item.poster ?? ''];
      while (columns.length > 1 && !columns[columns.length - 1]) columns.pop();
      return columns.join(' | ');
    })
    .join('\n');

  return (
    <section className="admin-page">
      <header className="admin-head">
        <p className="label">Projects / Edit</p>
        <h1 className="serif">{data.title}</h1>
      </header>
      <ProjectForm
        project={{
          id: data.id,
          slug: data.slug,
          title: data.title,
          kind: data.kind,
          category: data.category ?? '',
          year: data.year ?? '',
          client: data.client ?? '',
          role: data.role ?? '',
          summary: data.summary ?? '',
          longDescription: data.long_description ?? '',
          coverImage: data.cover_image ?? '',
          coverAlt: data.cover_alt ?? '',
          tags: (data.tags ?? []).join(', '),
          tools: (data.tools ?? []).join(', '),
          externalLink: data.external_link ?? '',
          featured: data.featured ?? false,
          status: data.status ?? 'draft',
          sortOrder: data.sort_order ?? 0,
          readTime: data.read_time ?? '',
          aspectRatio: data.aspect_ratio ?? '',
          challenge: data.challenge ?? '',
          solution: data.solution ?? '',
          impact: data.impact ?? '',
          gallery,
          needsRealMedia: data.needs_real_media ?? false,
        }}
      />
    </section>
  );
}
