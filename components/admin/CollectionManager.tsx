import { randomUUID } from 'node:crypto';
import Link from 'next/link';
import { SortableList } from '@/components/admin/SortableList';
import { collections, type CollectionKey } from '@/lib/admin/collections';
import { deleteCollectionItem, reorderCollection, saveCollectionItem } from '@/app/admin/actions';
import { createClient } from '@/lib/supabase/server';

export async function CollectionManager({ resource }: { resource: CollectionKey }) {
  const config = collections[resource];
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from(config.table).select('*').order('sort_order')
    : { data: null };

  const rows = (data ?? []) as Record<string, unknown>[];
  const items = rows.map((row) => ({
    id: String(row.id),
    label: String(row.title ?? row.name ?? row.number ?? row.id),
    meta: String(row.description ?? row.quote ?? row.role ?? '').slice(0, 90),
    status: config.supportsStatus ? (row.status === 'published' ? 'Published' : 'Draft') : undefined,
  }));

  return (
    <section className="admin-page">
      <header className="admin-head admin-head--row">
        <div>
          <p className="label">Content</p>
          <h1 className="serif">{config.title}</h1>
        </div>
      </header>
      {items.length ? (
        <SortableList
          items={items}
          onReorder={reorderCollection.bind(null, resource)}
          deleteAction={deleteCollectionItem.bind(null, resource)}
          basePath={`/admin/${resource}`}
        />
      ) : (
        <p className="admin-empty">Nothing here yet.</p>
      )}

      <details className="admin-add">
        <summary>Add new {config.title.replace(/s$/, '').toLowerCase()}</summary>
        <CollectionForm resource={resource} row={{ id: randomUUID(), sort_order: rows.length + 1 }} />
      </details>
    </section>
  );
}

export function CollectionForm({ resource, row }: { resource: CollectionKey; row: Record<string, unknown> }) {
  const config = collections[resource];
  const action = saveCollectionItem.bind(null, resource);
  const stringify = (field: string, value: unknown) => {
    if (!Array.isArray(value)) return String(value ?? '');
    return field === 'tags' ? value.join(', ') : value.join('\n');
  };

  return (
    <form className="admin-form" action={action}>
      <input type="hidden" name="id" value={String(row.id)} />
      <input type="hidden" name="sortOrder" value={String(row.sort_order ?? 0)} />
      <div className="admin-form__grid">
        {config.fields.map((field) => (
          <label key={field.name}>
            <span className="label">{field.label}</span>
            {field.type === 'select' ? (
              <select name={field.name} defaultValue={String(row[field.name] ?? '')}>
                {field.options?.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea name={field.name} rows={4} defaultValue={stringify(field.name, row[field.name])} />
            ) : (
              <input name={field.name} defaultValue={stringify(field.name, row[field.name])} />
            )}
          </label>
        ))}
      </div>
      <button className="button" type="submit">Save</button>
    </form>
  );
}
