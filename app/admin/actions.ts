'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { assertAdmin } from '@/lib/admin/auth';
import { collections, type CollectionKey } from '@/lib/admin/collections';
import { createClient } from '@/lib/supabase/server';
import { revalidatePortfolio } from '@/lib/revalidate';

async function adminDb() {
  await assertAdmin();
  const supabase = await createClient();
  if (!supabase) throw new Error('Supabase is not configured.');
  return supabase;
}

function refresh() {
  revalidatePortfolio();
  revalidatePath('/admin', 'layout');
}

export async function signOut() {
  const supabase = await createClient();
  await supabase?.auth.signOut();
  redirect('/admin/login');
}

const projectSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  kind: z.enum(['software', 'design']),
  category: z.string(),
  year: z.string(),
  client: z.string(),
  role: z.string(),
  summary: z.string().min(1),
  longDescription: z.string(),
  coverImage: z.string().min(1),
  coverAlt: z.string(),
  tags: z.string(),
  tools: z.string(),
  externalLink: z.string(),
  featured: z.boolean(),
  status: z.enum(['draft', 'published']),
  sortOrder: z.coerce.number().int(),
  readTime: z.string(),
  aspectRatio: z.string(),
  challenge: z.string(),
  solution: z.string(),
  impact: z.string(),
  needsRealMedia: z.boolean(),
});

const csv = (value: string) => value.split(',').map((part) => part.trim()).filter(Boolean);
const lines = (value: string) => value.split('\n').map((part) => part.trim()).filter(Boolean);
const nullable = (value: string) => value.trim() || null;

export async function saveProject(formData: FormData) {
  const supabase = await adminDb();
  const parsed = projectSchema.safeParse({
    id: formData.get('id'),
    slug: formData.get('slug'),
    title: formData.get('title'),
    kind: formData.get('kind'),
    category: formData.get('category'),
    year: formData.get('year'),
    client: formData.get('client'),
    role: formData.get('role'),
    summary: formData.get('summary'),
    longDescription: formData.get('longDescription'),
    coverImage: formData.get('coverImage'),
    coverAlt: formData.get('coverAlt'),
    tags: formData.get('tags'),
    tools: formData.get('tools'),
    externalLink: formData.get('externalLink'),
    featured: formData.get('featured') === 'on',
    status: formData.get('status'),
    sortOrder: formData.get('sortOrder'),
    readTime: formData.get('readTime'),
    aspectRatio: formData.get('aspectRatio'),
    challenge: formData.get('challenge'),
    solution: formData.get('solution'),
    impact: formData.get('impact'),
    needsRealMedia: formData.get('needsRealMedia') === 'on',
  });
  if (!parsed.success) throw new Error('Invalid project data: ' + parsed.error.issues[0].message);
  const p = parsed.data;

  const { error } = await supabase.from('projects').upsert({
    id: p.id,
    slug: p.slug,
    title: p.title,
    kind: p.kind,
    category: p.category,
    year: p.year,
    client: nullable(p.client),
    role: nullable(p.role),
    summary: p.summary,
    long_description: p.longDescription || p.summary,
    cover_image: p.coverImage,
    cover_alt: p.coverAlt,
    tags: csv(p.tags),
    tools: csv(p.tools),
    external_link: nullable(p.externalLink),
    featured: p.featured,
    status: p.status,
    sort_order: p.sortOrder,
    read_time: nullable(p.readTime),
    aspect_ratio: nullable(p.aspectRatio),
    challenge: nullable(p.challenge),
    solution: nullable(p.solution),
    impact: nullable(p.impact),
    needs_real_media: p.needsRealMedia,
  });
  if (error) throw new Error(error.message);
  refresh();
  redirect('/admin/projects?saved=1');
}

export async function deleteProject(formData: FormData) {
  const supabase = await adminDb();
  const id = String(formData.get('id') ?? '');
  if (!id) return;
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function toggleProjectStatus(formData: FormData) {
  const supabase = await adminDb();
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? '') === 'published' ? 'draft' : 'published';
  if (!id) return;
  const { error } = await supabase.from('projects').update({ status }).eq('id', id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function reorderProjects(ids: string[]) {
  const supabase = await adminDb();
  await Promise.all(ids.map((id, index) => supabase.from('projects').update({ sort_order: index + 1 }).eq('id', id)));
  refresh();
}

export async function saveCollectionItem(resource: CollectionKey, formData: FormData) {
  const supabase = await adminDb();
  const config = collections[resource];
  const id = String(formData.get('id') ?? '');
  if (!id) throw new Error('Missing id.');

  const required = new Set(
    resource === 'testimonials'
      ? ['quote', 'name']
      : resource === 'process_steps'
        ? ['number', 'title']
        : [config.fields[0].name],
  );
  const shape = Object.fromEntries(
    config.fields.map((field) => [field.name, required.has(field.name) ? z.string().min(1) : z.string()]),
  );
  const values = Object.fromEntries(config.fields.map((field) => [field.name, String(formData.get(field.name) ?? '')]));
  const parsed = z.object(shape).safeParse(values);
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);

  const row: Record<string, unknown> = {};
  for (const field of config.fields) {
    const raw = parsed.data[field.name];
    row[field.name] = field.list
      ? field.name === 'bullets' || field.name === 'deliverables'
        ? lines(raw)
        : csv(raw)
      : raw;
  }
  row.sort_order = Number(formData.get('sortOrder') ?? 0);
  if (resource === 'clients' || resource === 'testimonials' || resource === 'process_steps') {
    row.logo = row.logo ? nullable(String(row.logo)) : null;
  }

  const { error } = await supabase.from(config.table).upsert({ ...row, id });
  if (error) throw new Error(error.message);
  refresh();
  redirect(`/admin/${resource}?saved=1`);
}

export async function deleteCollectionItem(resource: CollectionKey, formData: FormData) {
  const supabase = await adminDb();
  const id = String(formData.get('id') ?? '');
  if (!id) return;
  const { error } = await supabase.from(collections[resource].table).delete().eq('id', id);
  if (error) throw new Error(error.message);
  refresh();
}

export async function reorderCollection(resource: CollectionKey, ids: string[]) {
  const supabase = await adminDb();
  const table = collections[resource].table;
  await Promise.all(ids.map((id, index) => supabase.from(table).update({ sort_order: index + 1 }).eq('id', id)));
  refresh();
}

const settingsSchema = z.object({
  heroHeadlinePrefix: z.string(),
  heroHeadlineAccent: z.string(),
  heroHeadlineSuffix: z.string(),
  heroSubtext: z.string(),
  availabilityStatus: z.string(),
  email: z.string().email(),
  whatsapp: z.string(),
  location: z.string(),
  socials: z.string(),
  stats: z.string(),
  disciplines: z.string(),
  seoTitle: z.string(),
  seoDescription: z.string(),
  ogImage: z.string(),
});

export async function saveSettings(formData: FormData) {
  const supabase = await adminDb();
  const parsed = settingsSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  const s = parsed.data;
  const { error } = await supabase.from('site_settings').upsert({
    id: 'default',
    hero_headline_prefix: s.heroHeadlinePrefix,
    hero_headline_accent: s.heroHeadlineAccent,
    hero_headline_suffix: s.heroHeadlineSuffix,
    hero_subtext: s.heroSubtext,
    availability_status: s.availabilityStatus,
    email: s.email,
    whatsapp: s.whatsapp,
    location: s.location,
    socials: s.socials.split('\n').filter(Boolean).map((line) => {
      const [label, ...rest] = line.split('|');
      return { label: label.trim(), url: rest.join('|').trim() };
    }),
    stats: s.stats.split('\n').filter(Boolean).map((line) => {
      const [value, ...rest] = line.split('|');
      return { value: value.trim(), label: rest.join('|').trim() };
    }),
    disciplines: csv(s.disciplines),
    seo_title: s.seoTitle,
    seo_description: s.seoDescription,
    og_image: s.ogImage,
  });
  if (error) throw new Error(error.message);
  refresh();
  redirect('/admin/settings?saved=1');
}

const aboutSchema = z.object({
  bio: z.string(),
  photo: z.string(),
  photoAlt: z.string(),
  currentRole: z.string(),
  tools: z.string(),
  skills: z.string(),
  timeline: z.string(),
});

export async function saveAbout(formData: FormData) {
  const supabase = await adminDb();
  const parsed = aboutSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) throw new Error(parsed.error.issues[0].message);
  const a = parsed.data;
  const { error } = await supabase.from('about').upsert({
    id: 'default',
    bio: a.bio,
    photo: a.photo,
    photo_alt: a.photoAlt,
    current_role: a.currentRole,
    tools: csv(a.tools),
    skills: lines(a.skills),
    timeline: a.timeline.split('\n').filter(Boolean).map((line) => {
      const [period, role, ...rest] = line.split('|');
      return { period: period.trim(), role: role.trim(), detail: rest.join('|').trim() };
    }),
  });
  if (error) throw new Error(error.message);
  refresh();
  redirect('/admin/settings?saved=1');
}

export async function updateMessage(formData: FormData) {
  const supabase = await adminDb();
  const id = String(formData.get('id') ?? '');
  const status = String(formData.get('status') ?? 'read');
  if (!id) return;
  await supabase.from('messages').update({ status }).eq('id', id);
  revalidatePath('/admin/messages');
}

export async function deleteMessage(formData: FormData) {
  const supabase = await adminDb();
  const id = String(formData.get('id') ?? '');
  if (!id) return;
  await supabase.from('messages').delete().eq('id', id);
  revalidatePath('/admin/messages');
}

export async function deleteMedia(formData: FormData) {
  const supabase = await adminDb();
  const id = String(formData.get('id') ?? '');
  const path = String(formData.get('path') ?? '');
  if (!path) return;
  await supabase.storage.from('media').remove([path]);
  await supabase.from('media_library').delete().eq('id', id);
  revalidatePath('/admin/media');
}
