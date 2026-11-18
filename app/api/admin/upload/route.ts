import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { getAdminUser } from '@/lib/admin/auth';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  if (!(await getAdminUser())) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get('file');
  const alt = String(formData.get('alt') ?? '');
  if (!(file instanceof File)) return NextResponse.json({ error: 'No file supplied.' }, { status: 400 });
  if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
    return NextResponse.json({ error: 'Images and videos only.' }, { status: 400 });
  }

  const supabase = await createClient();
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured.' }, { status: 503 });

  const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
  const path = `uploads/${randomUUID()}-${cleanName}`;

  let bytes: Buffer;
  let width: number | undefined;
  let height: number | undefined;
  let mime = file.type;
  let objectPath = path;

  if (file.type.startsWith('image/')) {
    const input = Buffer.from(await file.arrayBuffer());
    const optimized = await sharp(input, { failOn: 'none' })
      .rotate()
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 82 })
      .toBuffer({ resolveWithObject: true });
    bytes = optimized.data;
    width = optimized.info.width;
    height = optimized.info.height;
    mime = 'image/webp';
    objectPath = `${path.replace(/\.[^.]+$/, '')}.webp`;
  } else {
    bytes = Buffer.from(await file.arrayBuffer());
  }

  const { error: uploadError } = await supabase.storage.from('media').upload(objectPath, bytes, {
    contentType: mime,
    upsert: false,
  });
  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

  const { data: publicData } = supabase.storage.from('media').getPublicUrl(objectPath);
  const { error: dbError } = await supabase.from('media_library').insert({
    name: cleanName,
    path: objectPath,
    url: publicData.publicUrl,
    type: file.type.startsWith('video/') ? 'video' : 'image',
    mime,
    size_bytes: bytes.byteLength,
    width,
    height,
    alt: alt || null,
  });
  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 });

  return NextResponse.json({ url: publicData.publicUrl, path: objectPath });
}
