import { notFound } from 'next/navigation';
import { CollectionForm } from './CollectionManager';
import { collections, type CollectionKey } from '@/lib/admin/collections';
import { createClient } from '@/lib/supabase/server';

export async function CollectionEditor({ resource, id }: { resource: CollectionKey; id: string }) {
  const config = collections[resource];
  const supabase = await createClient();
  const { data } = supabase ? await supabase.from(config.table).select('*').eq('id', id).maybeSingle() : { data: null };
  if (!data) notFound();

  return (
    <section className="admin-page">
      <header className="admin-head">
        <p className="label">{config.title} / Edit</p>
        <h1 className="serif">{String((data as Record<string, unknown>).title ?? (data as Record<string, unknown>).name ?? 'Edit')}</h1>
      </header>
      <CollectionForm resource={resource} row={data as Record<string, unknown>} />
    </section>
  );
}
