import type { SiteContent } from '@/lib/types';

/**
 * Headlines use [square brackets] to mark the words rendered in the serif
 * accent style, e.g. "What I do, [precisely]."
 */
export const defaultSiteContent: SiteContent = {
  tagline: 'Design · Digital · Motion',
  copyright: '© 2026 Ken Karasira',
  navLabels: ['About', 'Work', 'Services', 'Contact'],
  menuBrand: 'KARASIRA Ken / Creative Studio',
  headerWordmark: 'Ken',
  headerWordmarkAccent: 'Designs',
  preloaderWordmark: 'KENDESIGNS',
  preloaderTagline: 'KenDesigns / Design · Digital · Motion',
  preloaderStatus: 'Loading portfolio',
  heroBadgeText: 'AVAILABLE FOR FREELANCE · KIGALI, RWANDA · ',
  heroScrollLabel: 'Scroll to explore',
  tickerTop: ['Design', 'Digital', 'Motion', 'Engineering'],
  tickerBottom: ["Let's build something", 'Available for freelance', 'Kigali / Remote'],
  aboutEyebrow: '01 / About',
  aboutCaption: 'KARASIRA Ken',
  aboutHeadline: 'Design that gets noticed. [Software] that works.',
  disciplinesLabel: 'Disciplines',
  toolsLabel: 'Tools',
  workEyebrow: '02 / Selected Work',
  workHeadline: 'Chosen work, [recently] made.',
  workAsideSuffix: 'projects',
  servicesEyebrow: '03 / Services',
  servicesHeadline: 'What I do, [precisely].',
  servicesAside: 'Design · Digital · Motion',
  clientsEyebrow: '04 / Clients',
  clientsIntro: 'Brands and collaborators I have worked with.',
  clientsSeparator: '·',
  disciplinesSeparator: '✦',
  processEyebrow: '05 / Process',
  processHeadline: 'A clear way [through].',
  processAside: 'Four steps, no theatre',
  testimonialsEyebrow: '06 / Feedback',
  testimonialsHeadline: 'In their [words].',
  contactEyebrow: '07 / Contact',
  contactHeadline: "Let's make something [worth keeping].",
  contactAside: 'Kigali / Remote',
  contactNote:
    'Whether you need a web app, video editing, Photoshop posters, or video audio arrangement, drop a message below or connect directly.',
  contactResponse: 'Response within two working days.',
  contactEmailLabel: 'Direct email',
  contactWhatsappLabel: 'WhatsApp',
  contactLocationLabel: 'Based in',
  contactSubmitLabel: 'Send message',
  contactServices: [
    'Full-Stack Web Development',
    'CapCut & Premiere Video Editing',
    'Photoshop Graphic Design',
    'Video Sound Placement',
    'UI/UX & Brand Identity',
  ],
  contactBudgets: ['Under $1,000', '$1,000 – $5,000', '$5,000+'],
  footerGhost: 'KARASIRA',
  footerTagline: 'Digital product engineer & designer',
  footerBackToTop: 'Back to top',
  caseStudyLabel: 'Case study',
  caseStudyNotesLabel: 'Project notes',
  caseStudyNextLabel: 'Next project',
  caseStudyLiveLabel: 'Launch live application',
  caseStudyClientLabel: 'Client',
  caseStudyYearLabel: 'Year',
  caseStudyRoleLabel: 'Role',
  caseStudyTagsLabel: 'Tags',
  caseStudyGalleryLabel: 'Gallery',
  caseStudyOverviewLabel: 'Overview',
  caseStudyChallengeLabel: 'Challenge',
  caseStudyApproachLabel: 'Approach',
  caseStudyOutcomeLabel: 'Outcome',
};

function pick<K extends keyof SiteContent>(key: K, raw: Record<string, unknown>): SiteContent[K] {
  const fallback = defaultSiteContent[key];
  const value = raw[key as string];
  if (Array.isArray(fallback)) {
    return (
      Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : fallback
    ) as SiteContent[K];
  }
  return (typeof value === 'string' ? value : fallback) as SiteContent[K];
}

export function resolveSiteContent(value: unknown): SiteContent {
  const raw = (value && typeof value === 'object' ? value : {}) as Record<string, unknown>;
  return Object.fromEntries(
    (Object.keys(defaultSiteContent) as (keyof SiteContent)[]).map((key) => [key, pick(key, raw)]),
  ) as unknown as SiteContent;
}
