'use client';

import { useState } from 'react';

export type SortableItem = {
  id: string;
  label: string;
  meta?: string;
  status?: string;
  editHref?: string;
};

type Props = {
  items: SortableItem[];
  onReorder: (ids: string[]) => Promise<void>;
  toggleStatus?: (formData: FormData) => Promise<void>;
  deleteAction?: (formData: FormData) => Promise<void>;
  basePath?: string;
};

export function SortableList({ items, onReorder, toggleStatus, deleteAction, basePath }: Props) {
  const [order, setOrder] = useState(items.map((item) => item.id));
  const [dragging, setDragging] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const byId = new Map(items.map((item) => [item.id, item]));

  async function commit(next: string[]) {
    setOrder(next);
    setBusy(true);
    try {
      await onReorder(next);
    } finally {
      setBusy(false);
    }
  }

  function move(id: string, direction: -1 | 1) {
    const index = order.indexOf(id);
    const target = index + direction;
    if (target < 0 || target >= order.length) return;
    const next = [...order];
    [next[index], next[target]] = [next[target], next[index]];
    void commit(next);
  }

  return (
    <ul className={`admin-list${busy ? ' admin-list--busy' : ''}`}>
      {order.map((id, index) => {
        const item = byId.get(id);
        if (!item) return null;
        return (
          <li
            key={id}
            className="admin-list__row"
            draggable={!busy}
            onDragStart={() => setDragging(id)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (!dragging || dragging === id) return;
              const next = order.filter((value) => value !== dragging);
              next.splice(next.indexOf(id), 0, dragging);
              void commit(next);
              setDragging(null);
            }}
          >
            <span className="admin-list__handle" aria-hidden="true">⠿</span>
            <span className="admin-list__index label">{String(index + 1).padStart(2, '0')}</span>
            <div className="admin-list__title">
              {item.editHref || basePath ? (
                <a href={item.editHref ?? `${basePath}/${id}`}>{item.label}</a>
              ) : (
                <strong>{item.label}</strong>
              )}
              {item.meta ? <span className="label">{item.meta}</span> : null}
            </div>
            {item.status ? <span className="admin-badge label">{item.status}</span> : null}
            <div className="admin-list__tools">
              <button type="button" onClick={() => move(id, -1)} aria-label={`Move ${item.label} up`}>↑</button>
              <button type="button" onClick={() => move(id, 1)} aria-label={`Move ${item.label} down`}>↓</button>
              {toggleStatus ? (
                <form action={toggleStatus}>
                  <input type="hidden" name="id" value={id} />
                  <input type="hidden" name="status" value={item.status === 'Published' ? 'published' : 'draft'} />
                  <button type="submit">{item.status === 'Published' ? 'Unpublish' : 'Publish'}</button>
                </form>
              ) : null}
              {deleteAction ? (
                <form action={deleteAction}>
                  <input type="hidden" name="id" value={id} />
                  <button type="submit" className="admin-danger" onClick={(event) => {
                    if (!window.confirm(`Delete ${item.label}?`)) event.preventDefault();
                  }}>Delete</button>
                </form>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
