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

export interface SiteContent {
  tagline: string;
  copyright: string;
  navLabels: string[];
  menuBrand: string;
  headerWordmark: string;
  headerWordmarkAccent: string;
  preloaderWordmark: string;
  preloaderTagline: string;
  preloaderStatus: string;
  heroBadgeText: string;
  heroScrollLabel: string;
  tickerTop: string[];
  tickerBottom: string[];
  aboutEyebrow: string;
  aboutCaption: string;
  aboutHeadline: string;
  disciplinesLabel: string;
  toolsLabel: string;
  workEyebrow: string;
  workHeadline: string;
  workAsideSuffix: string;
  servicesEyebrow: string;
  servicesHeadline: string;
  servicesAside: string;
  clientsEyebrow: string;
  clientsIntro: string;
  clientsSeparator: string;
  disciplinesSeparator: string;
  processEyebrow: string;
  processHeadline: string;
  processAside: string;
  testimonialsEyebrow: string;
  testimonialsHeadline: string;
  contactEyebrow: string;
  contactHeadline: string;
  contactAside: string;
  contactNote: string;
  contactResponse: string;
  contactEmailLabel: string;
  contactWhatsappLabel: string;
  contactLocationLabel: string;
  contactSubmitLabel: string;
  contactServices: string[];
  contactBudgets: string[];
  footerGhost: string;
  footerTagline: string;
  footerBackToTop: string;
  caseStudyLabel: string;
  caseStudyNotesLabel: string;
  caseStudyNextLabel: string;
  caseStudyLiveLabel: string;
  caseStudyClientLabel: string;
  caseStudyYearLabel: string;
  caseStudyRoleLabel: string;
  caseStudyTagsLabel: string;
  caseStudyGalleryLabel: string;
  caseStudyOverviewLabel: string;
  caseStudyChallengeLabel: string;
  caseStudyApproachLabel: string;
  caseStudyOutcomeLabel: string;
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
  content: SiteContent;
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
