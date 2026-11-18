export type Locale = 'en' | 'fr';
export type ContentStatus = 'draft' | 'published';
export type MediaType = 'image' | 'video';
export type ProjectKind = 'software' | 'design';

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  poster?: string;
  caption?: string;
  alt?: string;
  order: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  kind: ProjectKind;
  category: string;
  year: string;
  client?: string;
  role?: string;
  summary: string;
  longDescription?: string;
  coverImage: string;
  coverAlt: string;
  gallery: MediaItem[];
  tags: string[];
  tools?: string[];
  externalLink?: string;
  featured: boolean;
  status: ContentStatus;
  sortOrder: number;
  readTime?: string;
  aspectRatio?: string;
  challenge?: string;
  solution?: string;
  impact?: string;
  /** True for inherited stock media waiting for the owner's real work. */
  needsRealMedia?: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  bullets: string[];
  tags: string[];
  metric?: string;
  order: number;
  status: ContentStatus;
  locale: Locale;
}

export interface Client {
  id: string;
  name: string;
  logo?: string;
  order: number;
}

export interface TimelineEntry {
  period: string;
  role: string;
  detail: string;
}

export interface About {
  bio: string;
  photo: string;
  photoAlt: string;
  currentRole: string;
  tools: string[];
  skills: string[];
  timeline: TimelineEntry[];
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatar?: string;
  order: number;
}

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
  deliverables: string[];
  order: number;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface Stat {
  label: string;
  value: string;
}

export interface SiteSettings {
  heroHeadlinePrefix: string;
  heroHeadlineAccent: string;
  heroHeadlineSuffix: string;
  heroSubtext: string;
  availabilityStatus: string;
  email: string;
  whatsapp: string;
  location: string;
  socials: SocialLink[];
  stats: Stat[];
  disciplines: string[];
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
}

export interface Translations {
  en: Record<string, unknown>;
  fr: Record<string, unknown>;
}

export interface PortfolioData {
  projects: Project[];
  services: Service[];
  clients: Client[];
  about: About;
  testimonials: Testimonial[];
  process: ProcessStep[];
  settings: SiteSettings;
  translations: Translations;
}
