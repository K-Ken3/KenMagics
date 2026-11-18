import type {
  About,
  Client,
  MediaItem,
  PortfolioData,
  ProcessStep,
  Project,
  Service,
  SiteSettings,
  Testimonial,
} from '@/lib/types';

type Row = Record<string, unknown>;

const str = (value: unknown, fallback = '') => (typeof value === 'string' ? value : fallback);
const arr = <T>(value: unknown): T[] => (Array.isArray(value) ? (value as T[]) : []);
const bool = (value: unknown) => value === true;

export function mapProject(row: Row, media: Row[] = []): Project {
  return {
    id: str(row.id),
    slug: str(row.slug),
    title: str(row.title),
    kind: row.kind === 'design' ? 'design' : 'software',
    category: str(row.category),
    year: str(row.year),
    client: (row.client as string) ?? undefined,
    role: (row.role as string) ?? undefined,
    summary: str(row.summary),
    longDescription: (row.long_description as string) ?? undefined,
    coverImage: str(row.cover_image),
    coverAlt: str(row.cover_alt),
    gallery: media.map<MediaItem>((item, index) => ({
      id: str(item.id, String(index)),
      type: item.type === 'video' ? 'video' : 'image',
      url: str(item.url),
      poster: (item.poster as string) ?? undefined,
      caption: (item.caption as string) ?? undefined,
      alt: (item.alt as string) ?? undefined,
      order: Number(item.sort_order ?? index),
    })),
    tags: arr<string>(row.tags),
    tools: arr<string>(row.tools),
    externalLink: (row.external_link as string) ?? undefined,
    featured: bool(row.featured),
    status: row.status === 'published' ? 'published' : 'draft',
    sortOrder: Number(row.sort_order ?? 0),
    readTime: (row.read_time as string) ?? undefined,
    aspectRatio: (row.aspect_ratio as string) ?? undefined,
    challenge: (row.challenge as string) ?? undefined,
    solution: (row.solution as string) ?? undefined,
    impact: (row.impact as string) ?? undefined,
    needsRealMedia: bool(row.needs_real_media),
  };
}

export function mapService(row: Row): Service {
  return {
    id: str(row.id),
    title: str(row.title),
    description: str(row.description),
    bullets: arr<string>(row.bullets),
    tags: arr<string>(row.tags),
    metric: (row.metric as string) ?? undefined,
    order: Number(row.sort_order ?? 0),
    status: row.status === 'published' ? 'published' : 'draft',
    locale: row.locale === 'fr' ? 'fr' : 'en',
  };
}

export function mapClient(row: Row): Client {
  return {
    id: str(row.id),
    name: str(row.name),
    logo: (row.logo as string) ?? undefined,
    order: Number(row.sort_order ?? 0),
  };
}

export function mapTestimonial(row: Row): Testimonial {
  return {
    id: str(row.id),
    quote: str(row.quote),
    name: str(row.name),
    role: (row.role as string) ?? undefined,
    company: (row.company as string) ?? undefined,
    avatar: (row.avatar as string) ?? undefined,
    order: Number(row.sort_order ?? 0),
  };
}

export function mapProcessStep(row: Row): ProcessStep {
  return {
    id: str(row.id),
    number: str(row.number),
    title: str(row.title),
    description: str(row.description),
    deliverables: arr<string>(row.deliverables),
    order: Number(row.sort_order ?? 0),
  };
}

export function mapAbout(row: Row): About {
  return {
    bio: str(row.bio),
    photo: str(row.photo),
    photoAlt: str(row.photo_alt),
    currentRole: str(row.current_role),
    tools: arr<string>(row.tools),
    skills: arr<string>(row.skills),
    timeline: arr<About['timeline'][number]>(row.timeline),
  };
}

export function mapSettings(row: Row): SiteSettings {
  return {
    heroHeadlinePrefix: str(row.hero_headline_prefix),
    heroHeadlineAccent: str(row.hero_headline_accent),
    heroHeadlineSuffix: str(row.hero_headline_suffix),
    heroSubtext: str(row.hero_subtext),
    availabilityStatus: str(row.availability_status),
    email: str(row.email),
    whatsapp: str(row.whatsapp),
    location: str(row.location),
    socials: arr<SiteSettings['socials'][number]>(row.socials),
    stats: arr<SiteSettings['stats'][number]>(row.stats),
    disciplines: arr<string>(row.disciplines),
    seoTitle: str(row.seo_title),
    seoDescription: str(row.seo_description),
    ogImage: str(row.og_image, '/og.png'),
  };
}

export type PortfolioRows = {
  settings?: Row | null;
  about?: Row | null;
  projects?: Row[] | null;
  projectMedia?: Row[] | null;
  services?: Row[] | null;
  clients?: Row[] | null;
  testimonials?: Row[] | null;
  process?: Row[] | null;
};

export function mapPortfolio(rows: PortfolioRows): PortfolioData {
  const mediaByProject = new Map<string, Row[]>();
  rows.projectMedia?.forEach((item) => {
    const key = str(item.project_id);
    mediaByProject.set(key, [...(mediaByProject.get(key) ?? []), item]);
  });

  return {
    settings: mapSettings(rows.settings ?? {}),
    about: mapAbout(rows.about ?? {}),
    projects: (rows.projects ?? []).map((row) => mapProject(row, mediaByProject.get(str(row.id)))),
    services: (rows.services ?? []).map(mapService),
    clients: (rows.clients ?? []).map(mapClient),
    testimonials: (rows.testimonials ?? []).map(mapTestimonial),
    process: (rows.process ?? []).map(mapProcessStep),
    translations: (rows.settings?.translations as PortfolioData['translations']) ?? { en: {}, fr: {} },
  };
}
