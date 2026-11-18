import { deleteMedia } from '../actions';
import { MediaGrid } from '@/components/admin/MediaGrid';
import { UploadForm } from '@/components/admin/UploadForm';
import { createClient } from '@/lib/supabase/server';

export const metadata = { title: 'Media — Admin' };

export default async function AdminMedia() {
  const supabase = await createClient();
  const { data } = supabase
    ? await supabase.from('media_library').select('*').order('created_at', { ascending: false }).limit(100)
    : { data: null };

  return (
    <section className="admin-page">
      <header className="admin-head">
        <p className="label">Assets</p>
        <h1 className="serif">Media library</h1>
      </header>
      <UploadForm />
      {data?.length ? <MediaGrid items={data} deleteAction={deleteMedia} /> : <p className="admin-empty">No uploads yet.</p>}
    </section>
  );
}
