'use client';

/* eslint-disable @next/next/no-img-element */
export type MediaRow = {
  id: string;
  name: string;
  url: string;
  path: string;
  type: string;
  alt?: string | null;
};

export function MediaGrid({ items, deleteAction }: { items: MediaRow[]; deleteAction: (formData: FormData) => Promise<void> }) {
  return (
    <ul className="admin-media-grid">
      {items.map((item) => (
        <li key={item.id}>
          {item.type === 'image' ? (
            <img src={item.url} alt={item.alt ?? item.name} loading="lazy" />
          ) : (
            <video src={item.url} muted playsInline />
          )}
          <div>
            <p className="label">{item.name}</p>
            <button type="button" onClick={() => void navigator.clipboard.writeText(item.url)}>Copy URL</button>
            <form action={deleteAction}>
              <input type="hidden" name="id" value={item.id} />
              <input type="hidden" name="path" value={item.path} />
              <button type="submit" className="admin-danger">Delete</button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
