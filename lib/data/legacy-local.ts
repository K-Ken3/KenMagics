import type { Project, Service, Testimonial } from '@/lib/types';

/**
 * Content that only existed in the pre-deployment local codebase.
 * Kept as draft records so the copy and assets survive the migration.
 */
export const localServices: Service[] = [
  {
    id: 'legacy-web-dev',
    title: 'Modern Web Apps',
    description:
      'Building blazing fast, SEO-optimized SPAs using React, Next.js, and TypeScript with a focus on performance.',
    bullets: [],
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    order: 101,
    status: 'draft',
    locale: 'en',
  },
  {
    id: 'legacy-ui-ux',
    title: 'UI/UX Design Systems',
    description:
      'Crafting intuitive, accessible, and high-fidelity interfaces that prioritize user experience and consistency.',
    bullets: [],
    tags: ['Tailwind CSS', 'Framer Motion', 'Figma', 'A11y'],
    order: 102,
    status: 'draft',
    locale: 'en',
  },
  {
    id: 'legacy-ai-integration',
    title: 'AI Solutions',
    description:
      'Integrating Generative AI capabilities into products, from LLM chatbots to intelligent automation.',
    bullets: [],
    tags: ['Gemini API', 'LangChain', 'Prompt Engineering'],
    order: 103,
    status: 'draft',
    locale: 'en',
  },
  {
    id: 'legacy-graphic-design',
    title: 'Graphic Design',
    description:
      'Professional visual branding, identity design, and marketing assets tailored for digital and print media.',
    bullets: [],
    tags: ['Illustrator', 'Photoshop', 'Branding'],
    order: 104,
    status: 'draft',
    locale: 'en',
  },
  {
    id: 'legacy-video-editing',
    title: 'Video Editing',
    description:
      'High-quality post-production, motion graphics, and storytelling for social media and commercial content.',
    bullets: [],
    tags: ['Premiere Pro', 'After Effects', 'Color Grade'],
    order: 105,
    status: 'draft',
    locale: 'en',
  },
  {
    id: 'legacy-social-mgmt',
    title: 'Social Management',
    description:
      'Strategic content planning and community management to grow your presence and engagement online.',
    bullets: [],
    tags: ['Strategy', 'Analytics', 'Growth'],
    order: 106,
    status: 'draft',
    locale: 'en',
  },
];

export const localProjects: Project[] = [
  {
    id: 'legacy-1',
    slug: 'ndaje-app',
    title: 'Ndaje App',
    kind: 'software',
    category: 'Web App',
    year: '2025',
    summary:
      'A premier delivery service platform, connecting hotels with reliable suppliers across Rwanda. Fast, efficient, and professional.',
    longDescription:
      'A premier delivery service platform, connecting hotels with reliable suppliers across Rwanda. Fast, efficient, and professional.',
    coverImage: '/legacy/ndaje poster.jpg',
    coverAlt: 'Ndaje App poster',
    gallery: [],
    tags: ['TypeScript', 'Firebase', 'Tailwind', 'Next.js', 'mongodb'],
    externalLink: 'https://ndaje-hotel-supply.vercel.app/',
    featured: true,
    status: 'draft',
    sortOrder: 101,
  },
  {
    id: 'legacy-2',
    slug: 'video-summarizer-ai',
    title: 'Video Summarizer AI',
    kind: 'software',
    category: 'AI & Systems',
    year: '2025',
    summary:
      'An AI-powered application that analyzes video content and generates concise summaries automatically. It helps users quickly understand long videos by extracting key points, improving content consumption efficiency.',
    longDescription:
      'An AI-powered application that analyzes video content and generates concise summaries automatically. It helps users quickly understand long videos by extracting key points, improving content consumption efficiency.',
    coverImage: '/legacy/vid-sum.png',
    coverAlt: 'Video Summarizer AI interface',
    gallery: [],
    tags: ['React', 'D3.js', 'AI'],
    externalLink: 'https://notegpt.io/youtube-video-summarizer',
    featured: true,
    status: 'draft',
    sortOrder: 102,
  },
  {
    id: 'legacy-3',
    slug: 'stock-expense-management-system',
    title: 'Stock & Expense Management System',
    kind: 'software',
    category: 'Web App',
    year: '2025',
    summary:
      'A web-based financial tracking system that manages stock items, expenses, payment status (paid/unpaid), and date filtering, designed to improve business record accuracy and control.',
    longDescription:
      'A web-based financial tracking system that manages stock items, expenses, payment status (paid/unpaid), and date filtering, designed to improve business record accuracy and control.',
    coverImage: '/legacy/stock-man.png',
    coverAlt: 'Stock and expense management dashboard',
    gallery: [],
    tags: ['Next.js', 'Stripe', 'Zustand'],
    featured: false,
    status: 'draft',
    sortOrder: 103,
  },
  {
    id: 'legacy-4',
    slug: 'responsive-news-reporter-platform',
    title: 'Responsive News Reporter Platform',
    kind: 'software',
    category: 'Web App',
    year: '2025',
    summary:
      'A dynamic, database-driven news website with categorized content, reporter dashboard, and publishing features, built for scalability and real-world deployment.',
    longDescription:
      'A dynamic, database-driven news website with categorized content, reporter dashboard, and publishing features, built for scalability and real-world deployment.',
    coverImage: '/legacy/news-repo.png',
    coverAlt: 'News reporter platform interface',
    gallery: [],
    tags: ['TypeScript', 'Firebase', 'Tailwind'],
    externalLink: 'https://veritas-news-reporter-check-fact.vercel.app/',
    featured: true,
    status: 'draft',
    sortOrder: 104,
  },
  {
    id: 'legacy-5',
    slug: 'icyeza-one-coffee-shop-website',
    title: 'Icyeza One Coffee Shop Website',
    kind: 'software',
    category: 'Web App',
    year: '2025',
    summary:
      'A modern, responsive website for a local coffee shop, featuring a menu display, online ordering system, and customer reviews.',
    longDescription:
      'A modern, responsive website for a local coffee shop, featuring a menu display, online ordering system, and customer reviews.',
    coverImage: '/legacy/Icyeza.png',
    coverAlt: 'Icyeza One Coffee Shop website',
    gallery: [],
    tags: ['React', 'Node.js', 'MongoDB'],
    externalLink: 'https://icyeza-one-website.vercel.app/',
    featured: true,
    status: 'draft',
    sortOrder: 105,
  },
];

export const localTestimonial: Testimonial = {
  id: 'legacy-local-1',
  quote:
    'Ken is a motivated and versatile tech enthusiast with strong interests in software development, networking, and digital innovation. You actively build real-world projects, combining technical skills in programming with creativity in design and media.',
  name: 'KARASIRA Ken',
  role: 'Social manager at Icyeza One Coffee Shop',
  order: 99,
};

export const legacyAiCopy = {
  assistantGreeting:
    "Hi! I'm Ken's AI twin. I'm motivated and detail-oriented. Ask me anything about my IT skills or digital design services!",
  systemInstruction: `You are the AI Assistant for Ken, a world-class professional with a strong interest in technology.
Ken combines skills in IT, software development, and digital design.

Key Facts about Ken:
- Experience: 3+ years in technology and design.
- Bio: Motivated and versatile tech enthusiast with strong interests in software development, networking, and digital innovation. He actively builds real-world projects, combining technical skills in programming with creativity in design and media.
- Current Role: Social manager at Icyeza One Coffee Shop.
- Services: Modern Web Apps, UI/UX Design, AI Integration, Consulting, Graphic Design, and Social Management.
- Personality: Motivated, professional, creative, and detail-oriented.
- Location: Kigali, Rwanda.
- Email: karasiraken5@gmail.com

Your goal is to answer questions about Ken's skills, services, and professional outlook.
Answer concisely and professionally. If someone asks for a quote or to start a project, tell them to use the contact form or click the WhatsApp button.
Always be polite and helpful.`,
};

export const legacySiteCopy = {
  loader: 'Assembling Digital Identity',
  liveLoader: 'KARASIRA KEN • CREATIVE STUDIO',
  wordmark: 'KEN.DEV',
  footer: '© 2026 Ken. Motivated by Code & Design.',
  serviceIntro:
    'I offer a wide range of digital services combining technical precision with creative flair. Each service is delivered with a commitment to continuous learning and improvement.',
  contactIntro:
    "Currently available for freelance work and consulting. I'm always looking for interesting projects and ambitious teams.",
};
