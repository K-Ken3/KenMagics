/**
 * Idempotent seed: imports every piece of inherited copy/media into Supabase.
 * Usage: copy .env.example to .env.local, fill in the keys, then `npm run seed`.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { legacyPortfolio } from '../lib/data/portfolio';

// tsx does not load Next's .env.local automatically.
function loadEnv() {
  try {
    const file = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8');
    for (const rawLine of file.split(/\r?\n/)) {
      const line = rawLine.trim();
      if (!line || line.startsWith('#')) continue;
      const separator = line.indexOf('=');
      if (separator < 0) continue;
      const key = line.slice(0, separator).trim();
      const value = line.slice(separator + 1).trim().replace(/^["']|["']$/g, '');
      if (!(key in process.env)) process.env[key] = value;
    }
  } catch {
    // Rely on shell-provided environment variables instead.
  }
}
loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !serviceKey) {
  throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local before seeding.');
}

const supabase = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function upsert(table: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const { error } = await supabase.from(table).upsert(rows, { onConflict: 'id' });
  if (error) throw new Error(`${table}: ${error.message}`);
}

async function seed() {
  const { projects, services, clients, about, testimonials, process: processSteps, settings, translations } = legacyPortfolio;

  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail) {
    const { error } = await supabase.from('admin_allowed_emails').upsert({ email: adminEmail.toLowerCase() });
    if (error) throw new Error(`admin_allowed_emails: ${error.message}`);
  }

  await upsert('site_settings', [
    {
      id: 'default',
      hero_headline_prefix: settings.heroHeadlinePrefix,
      hero_headline_accent: settings.heroHeadlineAccent,
      hero_headline_suffix: settings.heroHeadlineSuffix,
      hero_subtext: settings.heroSubtext,
      availability_status: settings.availabilityStatus,
      email: settings.email,
      whatsapp: settings.whatsapp,
      location: settings.location,
      socials: settings.socials,
      stats: settings.stats,
      disciplines: settings.disciplines,
      seo_title: settings.seoTitle,
      seo_description: settings.seoDescription,
      og_image: settings.ogImage,
      translations,
    },
  ]);

  await upsert('about', [
    {
      id: 'default',
      bio: about.bio,
      photo: about.photo,
      photo_alt: about.photoAlt,
      current_role: about.currentRole,
      tools: about.tools,
      skills: about.skills,
      timeline: about.timeline,
    },
  ]);

  await upsert(
    'projects',
    projects.map((project) => ({
      id: project.id,
      slug: project.slug,
      title: project.title,
      kind: project.kind,
      category: project.category,
      year: project.year,
      client: project.client ?? null,
      role: project.role ?? null,
      summary: project.summary,
      long_description: project.longDescription ?? project.summary,
      cover_image: project.coverImage,
      cover_alt: project.coverAlt,
      tags: project.tags,
      tools: project.tools ?? [],
      external_link: project.externalLink ?? null,
      featured: project.featured,
      status: project.status,
      sort_order: project.sortOrder,
      read_time: project.readTime ?? null,
      aspect_ratio: project.aspectRatio ?? null,
      challenge: project.challenge ?? null,
      solution: project.solution ?? null,
      impact: project.impact ?? null,
      needs_real_media: project.needsRealMedia ?? false,
    })),
  );

  await upsert(
    'project_media',
    projects.flatMap((project) =>
      project.gallery.map((item) => ({
        id: item.id,
        project_id: project.id,
        type: item.type,
        url: item.url,
        poster: item.poster ?? null,
        caption: item.caption ?? null,
        alt: item.alt ?? null,
        sort_order: item.order,
      })),
    ),
  );

  await upsert(
    'services',
    services.map((service) => ({
      id: service.id,
      title: service.title,
      description: service.description,
      bullets: service.bullets,
      tags: service.tags,
      metric: service.metric ?? null,
      sort_order: service.order,
      status: service.status,
      locale: service.locale,
    })),
  );

  await upsert(
    'clients',
    clients.map((client) => ({ id: client.id, name: client.name, logo: client.logo ?? null, sort_order: client.order })),
  );

  await upsert(
    'testimonials',
    testimonials.map((item) => ({
      id: item.id,
      quote: item.quote,
      name: item.name,
      role: item.role ?? null,
      company: item.company ?? null,
      avatar: item.avatar ?? null,
      sort_order: item.order,
    })),
  );

  await upsert(
    'process_steps',
    processSteps.map((step) => ({
      id: step.id,
      number: step.number,
      title: step.title,
      description: step.description,
      deliverables: step.deliverables,
      sort_order: step.order,
    })),
  );

  // TODO: upload real client logos and replace stock imagery; the inherited
  // URLs are seeded verbatim so nothing is lost.
  console.log(
    `Seeded ${projects.length} projects, ${services.length} services, ${clients.length} clients, ` +
      `${testimonials.length} testimonials, ${processSteps.length} process steps and the singleton content.`,
  );
}

seed().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
