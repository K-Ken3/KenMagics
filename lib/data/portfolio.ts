import live from './legacy-live.generated.json';
import { localProjects, localServices, localTestimonial } from './legacy-local';
import type {
  About,
  Client,
  Locale,
  MediaItem,
  PortfolioData,
  ProcessStep,
  Project,
  Service,
  Testimonial,
} from '@/lib/types';

type RawMedia = { id: string; mediaType: string; mediaUrl: string; caption?: string };
type RawProject = Record<string, unknown> & {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link?: string;
  category: string;
  year: string;
  readTime?: string;
  featured?: boolean;
  caseStudyDetails?: { challenge: string; solution: string; impact: string };
  gallery?: RawMedia[];
  toolsUsed?: string[];
  aspectRatio?: string;
  client?: string;
};
type RawDesign = {
  id: string;
  title: string;
  category: string;
  mediaType: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  aspectRatio?: string;
  toolsUsed: string[];
  description: string;
  gallery?: RawMedia[];
  year: string;
  client: string;
  featured?: boolean;
};
type RawService = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  icon: string;
  metrics: string;
  features: string[];
};
type RawStep = {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
};
type RawTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function mapGallery(items: RawMedia[] = []): MediaItem[] {
  return items.map((item, index) => ({
    id: item.id,
    type: item.mediaType === 'video' ? 'video' : 'image',
    url: item.mediaUrl,
    caption: item.caption,
    alt: item.caption,
    order: index,
  }));
}

function mapSoftware(p: RawProject, index: number): Project {
  return {
    id: `sw-${p.id}`,
    slug: slugify(p.title),
    title: p.title,
    kind: 'software',
    category: p.category,
    year: p.year,
    summary: p.description,
    longDescription: p.description,
    coverImage: p.image,
    coverAlt: `${p.title} — inherited project imagery`,
    gallery: [],
    tags: p.tags ?? [],
    externalLink: p.link && p.link !== '#' ? p.link : undefined,
    featured: Boolean(p.featured),
    status: 'published',
    sortOrder: index + 1,
    readTime: p.readTime,
    challenge: p.caseStudyDetails?.challenge,
    solution: p.caseStudyDetails?.solution,
    impact: p.caseStudyDetails?.impact,
    needsRealMedia: true,
  };
}

function mapDesign(p: RawDesign, index: number): Project {
  return {
    id: `design-${p.id}`,
    slug: slugify(p.title),
    title: p.title,
    kind: 'design',
    category: p.category,
    year: p.year,
    client: p.client,
    summary: p.description,
    longDescription: p.description,
    coverImage: p.mediaUrl,
    coverAlt: `${p.title} — inherited project imagery`,
    gallery: mapGallery(p.gallery),
    tags: p.toolsUsed ?? [],
    tools: p.toolsUsed,
    featured: Boolean(p.featured),
    status: 'published',
    sortOrder: index + 20,
    aspectRatio: p.aspectRatio,
    needsRealMedia: true,
  };
}

function mapService(s: RawService, locale: Locale, order: number): Service {
  return {
    id: `${locale}-${s.id}`,
    title: s.title,
    description: s.description,
    bullets: s.features ?? [],
    tags: s.tags ?? [],
    metric: s.metrics,
    order,
    status: 'published',
    locale,
  };
}

const en = (live.translations as Record<string, Record<string, unknown>>).en as {
  hero: Record<string, string | string[]>;
  contact: Record<string, string>;
  footer: Record<string, string>;
};

const heroCopy = en.hero;
const softwareProjects = (live.softwareProjects as RawProject[]).map(mapSoftware);
const designProjects = (live.designProjects as unknown as RawDesign[]).map(mapDesign);

const about: About = {
  bio: 'I am a motivated and detail-oriented professional with a strong interest in technology, combining skills in IT, software development, and digital design, and a commitment to continuous learning and improvement. Motivated and versatile tech enthusiast with strong interests in software development, networking, and digital innovation. I actively build real-world projects, combining technical skills in programming with creativity in design and media.',
  photo: '/legacy/keke.jpeg',
  photoAlt: 'KARASIRA Ken',
  currentRole: 'Freelancer',
  tools: ['React', 'Photoshop', 'CapCut', 'Premiere Pro'],
  skills: [
    'Software development',
    'Networking',
    'Digital design',
    'CapCut & Premiere video editing',
    'Photoshop poster design',
    'Video audio arrangement',
  ],
  timeline: [
    {
      period: '3+ years',
      role: 'Freelancer',
      detail: 'Software development, video editing and digital design.',
    },
  ],
};

const testimonials: Testimonial[] = [
  ...(live.testimonials as RawTestimonial[]).map((t, index) => ({
    id: `live-${t.id}`,
    quote: t.quote,
    name: t.name,
    role: t.role,
    company: t.company,
    avatar: t.avatar,
    order: index + 1,
  })),
  localTestimonial,
];

const clientNames = Array.from(
  new Set([
    ...testimonials.map((t) => t.company).filter((value): value is string => Boolean(value)),
    ...designProjects.map((p) => p.client).filter((value): value is string => Boolean(value)),
  ]),
);

const clients: Client[] = clientNames.map((name, index) => ({
  id: `client-${index + 1}`,
  name,
  order: index + 1,
}));

export const legacyPortfolio: PortfolioData = {
  projects: [...softwareProjects, ...designProjects, ...localProjects],
  services: [
    ...(live.servicesEn as RawService[]).map((s, i) => mapService(s, 'en', i + 1)),
    ...(live.servicesFr as RawService[]).map((s, i) => mapService(s, 'fr', i + 1)),
    ...localServices,
  ],
  clients,
  about,
  testimonials,
  process: (live.process as RawStep[]).map((step, index) => ({
    id: `process-${step.number}`,
    number: step.number,
    title: step.title,
    description: step.description,
    deliverables: step.deliverables,
    order: index + 1,
  })),
  settings: {
    heroHeadlinePrefix: String(heroCopy.headlinePrefix),
    heroHeadlineAccent: String(heroCopy.headlineGradient),
    heroHeadlineSuffix: String(heroCopy.headlineSuffix),
    heroSubtext: String(heroCopy.subtitle),
    availabilityStatus: String(heroCopy.availableTag),
    email: 'karasiraken5@gmail.com',
    whatsapp: '250780000000',
    location: String(heroCopy.location),
    socials: [
      { label: 'GitHub', url: 'https://github.com/K-Ken3' },
      { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ken-karasira-442452292/' },
      { label: 'Instagram', url: 'https://www.instagram.com/k.k3n.__/' },
    ],
    stats: [
      { label: 'Years Experience', value: '3+' },
      { label: 'Software & Web Apps', value: '30+' },
      { label: 'Video & Photo Projects', value: '50+' },
      { label: 'Happy Partners', value: '50+' },
    ],
    disciplines: live.disciplines as string[],
    seoTitle: 'KEN KARASIRA | Digital Product Engineer & Designer',
    seoDescription:
      'KenDesigns — design, digital and motion. Web engineering, video editing, graphic design and social content from Kigali, Rwanda.',
    ogImage: '/og.png',
  },
  translations: live.translations as PortfolioData['translations'],
};
