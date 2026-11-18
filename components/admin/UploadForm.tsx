'use client';

import { useState } from 'react';

export function UploadForm() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [url, setUrl] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const body = new FormData(form);
    setStatus('uploading');
    setMessage('');
    const response = await fetch('/api/admin/upload', { method: 'POST', body });
    const result = (await response.json()) as { url?: string; error?: string };
    if (!response.ok || !result.url) {
      setStatus('error');
      setMessage(result.error ?? 'Upload failed.');
      return;
    }
    setUrl(result.url);
    setStatus('done');
    setMessage('Uploaded. Copy the URL into a project cover or gallery field.');
    form.reset();
  }

  return (
    <form className="admin-form admin-upload" onSubmit={onSubmit}>
      <label>
        <span className="label">Image or video</span>
        <input name="file" type="file" accept="image/*,video/*" required />
      </label>
      <label>
        <span className="label">Alt text</span>
        <input name="alt" type="text" />
      </label>
      <button className="button" type="submit" disabled={status === 'uploading'}>
        {status === 'uploading' ? 'Uploading…' : 'Upload to media library'}
      </button>
      <p className="admin-note" role="status">{message}</p>
      {url ? <input className="admin-url" readOnly value={url} onFocus={(event) => event.currentTarget.select()} /> : null}
    </form>
  );
}
