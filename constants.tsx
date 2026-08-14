import { Service, Project, Testimonial, ProcessStep, DesignAsset } from './types';
import { Language } from './context/LanguageContext';

export const TECH_STACK = [
  'React 19',
  'TypeScript',
  'Next.js 15',
  'Tailwind CSS',
  'Adobe Photoshop',
  'CapCut Pro',
  'Premiere Pro',
  'Video Audio Arrangement',
  'Adobe Audition',
  'Figma',
  'Framer Motion',
  'Gemini 2.5 AI',
  'Node.js',
  'PostgreSQL',
  'Adobe Illustrator',
  'Audacity',
  'MongoDB'
];

export const DESIGN_ASSETS: DesignAsset[] = [
  {
    id: 'des-1',
    title: 'CapCut & Premiere Video Edit Reel',
    category: 'Video Editing',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-grid-display-31780-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16/9',
    toolsUsed: ['CapCut Pro', 'Premiere Pro', 'Photoshop'],
    description: 'A multi-clip promo edit featuring fast-paced cuts, trendy sound effects, smooth speed ramps, and color grading tuned for social media virality.',
    gallery: [
      { id: 'm1', mediaType: 'video', mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-grid-display-31780-large.mp4', caption: 'Fast-paced speed ramps & video transitions' },
      { id: 'm2', mediaType: 'video', mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-liquid-motion-abstract-art-41584-large.mp4', caption: 'Color grading & atmosphere adjustment' },
      { id: 'm3', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80', caption: 'Photoshop Video Thumbnail Cover Design' },
      { id: 'm4', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80', caption: 'CapCut Timeline Layout & Beat Syncing' }
    ],
    year: '2026',
    client: 'Urban Creative Studio',
    featured: true
  },
  {
    id: 'des-2',
    title: 'Photoshop Digital Art & Photo Collage Collection',
    category: 'Photoshop & Graphics',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '1/1',
    toolsUsed: ['Adobe Photoshop', 'Lightroom', 'Illustrator'],
    description: 'High-resolution photo manipulation and composite artwork featuring double exposures, poster layouts, and vibrant gradient color tones.',
    gallery: [
      { id: 'p1', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', caption: 'Abstract Poster Manipulation #1' },
      { id: 'p2', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80', caption: 'Digital Composite Art & Masking' },
      { id: 'p3', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80', caption: 'Neon Cyberpunk Portrait Grade' },
      { id: 'p4', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80', caption: 'Social Media Banner Design System' }
    ],
    year: '2025',
    client: 'Self-Directed Gallery',
    featured: true
  },
  {
    id: 'des-3',
    title: 'Video Audio Arrangement & Beat Sync',
    category: 'Video Audio Arrangement',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41560-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16/9',
    toolsUsed: ['CapCut Pro', 'Premiere Pro', 'Adobe Audition', 'Beat Placement'],
    description: 'Arranging sound effects, background audio tracks, voiceovers, and beat sync placements precisely timed to video cuts and scenes.',
    gallery: [
      { id: 's1', mediaType: 'video', mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41560-large.mp4', caption: 'Video Audio Arrangement & Beat Drop Placement' },
      { id: 's2', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80', caption: 'Timeline Audio Layering & Sound FX Placement' },
      { id: 's3', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80', caption: 'CapCut / Premiere Audio Track Alignment' }
    ],
    year: '2025',
    client: 'Video Post-Production',
    featured: true
  },
  {
    id: 'des-4',
    title: 'Icyeza One Coffee — Brand Identity & Packaging',
    category: 'Brand Identity',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '4/3',
    toolsUsed: ['Photoshop', 'Illustrator', 'Lightroom'],
    description: 'Full visual identity system for Icyeza One Coffee Shop in Kigali, including custom typography logo, eco-friendly coffee bag mockups, menu collateral, and social media brand guidelines.',
    gallery: [
      { id: 'b1', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80', caption: 'Eco-Packaging Mockup' },
      { id: 'b2', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80', caption: 'Brand Typography & Logo Identity' },
      { id: 'b3', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80', caption: 'Social Media Instagram Templates' }
    ],
    year: '2025',
    client: 'Icyeza One Coffee',
    featured: true
  },
  {
    id: 'des-5',
    title: 'Short-Form TikTok & Reels CapCut Edits',
    category: 'Video Editing',
    mediaType: 'video',
    mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-liquid-motion-abstract-art-41584-large.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '9/16',
    toolsUsed: ['CapCut Pro', 'Adobe Photoshop', 'Beat Sync'],
    description: 'Vertical 9:16 short-form video edits optimized with animated captions, sound effects, trending transitions, and eye-catching overlays.',
    gallery: [
      { id: 'c1', mediaType: 'video', mediaUrl: 'https://www.instagram.com/reel/DbqS8rGMoc1/', caption: 'Vertical CapCut Short Reel' },
      { id: 'c2', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80', caption: 'High CTR Cover Thumbnail' }
    ],
    year: '2026',
    client: 'Viral Social Brand'
  },
  {
    id: 'des-6',
    title: 'Modern Mobile App UI/UX & Photoshop Mockups',
    category: 'UI/UX Design',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    aspectRatio: '16/9',
    toolsUsed: ['Figma', 'Photoshop', 'Tailwind'],
    description: 'High-fidelity UI screens and Photoshop device mockups showcasing clean layout hierarchy, dark/light theme tokens, and responsive web components.',
    gallery: [
      { id: 'u1', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', caption: 'Figma Dashboard Design System' },
      { id: 'u2', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80', caption: 'Mobile UI Screen Mockup' }
    ],
    year: '2026',
    client: 'Apex Tech'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'web-dev',
    title: 'Full-Stack Web Engineering',
    description: 'Building ultra-fast, SEO-optimized Web Applications and SPAs using React, Next.js, and TypeScript with pixel-perfect precision.',
    icon: '🚀',
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    metrics: '<100ms TBT',
    features: ['Server-Side Rendering', 'Interactive UI', 'Scalable Architecture', 'SEO & Performance']
  },
  {
    id: 'video-editing',
    title: 'Video Editing & CapCut Cutouts',
    description: 'Professional video post-production using CapCut Pro & Premiere Pro. Specializing in speed ramps, dynamic captions, color grading, and viral edits.',
    icon: '🎬',
    tags: ['CapCut Pro', 'Premiere Pro', 'Color Grade', 'Speed Ramps'],
    metrics: '4K High FPS Cuts',
    features: ['CapCut Speed Ramping', 'Social Media Reels', 'Color Grading', 'Viral Video Pacing']
  },
  {
    id: 'photoshop-design',
    title: 'Photoshop Design & Graphic Arts',
    description: 'High-impact photo manipulation, digital composites, social media poster design, brand flyers, and visual graphic collateral.',
    icon: '🖌️',
    tags: ['Photoshop', 'Lightroom', 'Illustrator', 'Graphics'],
    metrics: 'HD Print & Web',
    features: ['Photo Compositing', 'Flyer & Poster Design', 'Thumbnail Art', 'Retouching']
  },
  {
    id: 'sound-engineering',
    title: 'Video Audio & Sound Arrangement',
    description: 'Precise placement and arrangement of sound effects, background tracks, voiceovers, and beat syncs tailored for video edits in CapCut & Premiere Pro.',
    icon: '🎧',
    tags: ['Sound Placement', 'CapCut Audio', 'Audition', 'Beat Sync'],
    metrics: 'Seamless Beat Placement',
    features: ['Sound Effects Placement', 'Voiceover Alignment', 'Background Track Sync', 'Video Audio Layering']
  },
  {
    id: 'ui-ux',
    title: 'UI/UX & Design Systems',
    description: 'Crafting intuitive, accessible, and high-fidelity interfaces in Figma & Framer that elevate digital products.',
    icon: '🎨',
    tags: ['Tailwind CSS', 'Framer', 'Figma', 'A11y'],
    metrics: 'WCAG AAA Compliant',
    features: ['Atomic Design Tokens', 'Micro-Interactions', 'Prototyping', 'Design Specs']
  },
  {
    id: 'ai-integration',
    title: 'AI Solutions & Brand Management',
    description: 'Integrating Generative AI capabilities into web platforms alongside strategic content management to scale digital brand impact.',
    icon: '🤖',
    tags: ['Gemini API', 'Branding', 'Analytics', 'Growth'],
    metrics: '360° Digital Growth',
    features: ['Custom GenAI Apps', 'Brand Identity', 'Audience Growth', 'Content Strategy']
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'AI Analytics Dashboard',
    description: 'A cutting-edge data visualization platform that leverages Gemini AI to provide predictive insights and real-time behavioral analysis for enterprise users.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    tags: ['React', 'D3.js', 'Gemini AI'],
    link: '#',
    category: 'AI & Systems',
    year: '2024',
    readTime: '3 min read',
    featured: true,
    caseStudyDetails: {
      challenge: 'Enterprise teams needed actionable real-time telemetry analytics without spending hours parsing raw database logs.',
      solution: 'Engineered a streaming D3.js visual dashboard backed by Gemini AI, auto-generating natural language summaries and predictive risk trends.',
      impact: 'Reduced data analysis turnaround by 75% for enterprise product teams.'
    }
  },
  {
    id: '2',
    title: 'NDAJE Green E-commerce Platform',
    description: 'A high-performance commerce solution built with Next.js 15, featuring complex state management, instant search, and seamless Stripe payment workflows.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'Stripe', 'Zustand'],
    link: '#',
    category: 'Web App',
    year: '2025',
    readTime: '4 min read',
    featured: true,
    caseStudyDetails: {
      challenge: 'Legacy shopfront suffered high cart abandonment due to slow page transitions and delayed checkout steps.',
      solution: 'Architected a headless storefront using Next.js App Router, optimistic UI updates, and sub-second Stripe checkout session initialization.',
      impact: 'Boosted conversion rates by 38% and achieved a 99/100 Lighthouse performance score.'
    }
  },
  {
    id: '3',
    title: 'Creative Studio CMS',
    description: 'A bespoke drag-and-drop content management system designed for creative agencies to manage high-fidelity visual assets and team workflows.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
    tags: ['TypeScript', 'Firebase', 'Tailwind'],
    link: '#',
    category: 'UI/UX & Design',
    year: '2025',
    readTime: '2 min read',
    featured: true,
    caseStudyDetails: {
      challenge: 'Creative teams struggled with fragmented media storage, inconsistent metadata tagging, and missing role permissions.',
      solution: 'Created an intuitive canvas-style CMS with drag-and-drop asset organization, instant live previewing, and real-time collaboration.',
      impact: 'Streamlined agency content publishing pipelines across 12 active client brands.'
    }
  },
  {
    id: '4',
    title: 'Smart Order IoT Hub',
    description: 'A centralized control system for smart home devices, featuring real-time telemetry monitoring, automated routines, and voice command integration.',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
    tags: ['Next.js', 'MQTT', 'Tailwind'],
    link: '#',
    category: 'AI & Systems',
    year: '2025',
    readTime: '3 min read',
    caseStudyDetails: {
      challenge: 'Multi-device IoT setups required a unified mobile-friendly web dashboard with microsecond web-socket updates.',
      solution: 'Built a lightweight MQTT consumer dashboard with customizable automation widgets and status alerts.',
      impact: 'Connected 50+ smart node sensors with seamless latency under 20ms.'
    }
  },
  {
    id: '5',
    title: 'Decentralized Voting System',
    description: 'A secure and transparent voting platform built on blockchain technology, ensuring tamper-proof results and anonymous participation.',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
    tags: ['Solidity', 'React', 'Web3'],
    link: '#',
    category: 'Web App',
    year: '2024',
    readTime: '2 min read',
    caseStudyDetails: {
      challenge: 'Organizations lacked an open, verifiable digital voting mechanism that protected user anonymity.',
      solution: 'Designed smart contracts with zero-knowledge verification techniques and an approachable Web3 interface.',
      impact: 'Successfully conducted mock organizational elections with 100% audit accuracy.'
    }
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your core goals, user needs, market landscape, and technical constraints to outline a crisp, actionable project roadmap.',
    deliverables: ['Product Scope & Specs', 'User Flow Maps', 'Technical Architecture']
  },
  {
    number: '02',
    title: 'Wireframing & Prototype',
    description: 'Transforming strategy into high-fidelity visual design systems, interactive prototypes, and atomic component specifications in Figma.',
    deliverables: ['Design System Tokens', 'Interactive Figma Prototypes', 'Accessibility Audit']
  },
  {
    number: '03',
    title: 'Engineering & AI Build',
    description: 'Translating design into clean, scalable, type-safe code using React, Next.js, and modern AI services with fluid micro-interactions.',
    deliverables: ['Production-Ready Codebase', 'API Integration', 'Unit & E2E Verification']
  },
  {
    number: '04',
    title: 'Optimization & Launch',
    description: 'Thorough performance benchmarking, SEO optimization, security hardening, and seamless Cloud deployment.',
    deliverables: ['Lighthouse 95+ Guarantee', 'Live Cloud Deployment', 'Documentation & Handoff']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'Ken combines technical mastery in software development with incredible aesthetic precision. He delivered our platform ahead of schedule with flawless attention to detail.',
    name: 'Cesar NGENZI',
    role: 'Owner',
    company: 'Icyeza One Coffee Shop',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '2',
    quote: 'Working with Ken transformed our digital brand identity. His Framer-level design sense and full-stack execution elevated our conversion rate from day one.',
    name: 'Patrick SHEMA',
    role: 'Program Manager',
    company: 'BRIDGE Rwanda',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: '3',
    quote: 'His ability to integrate AI models smoothly into responsive web applications is unmatched. Highly recommended for any ambitious digital project.',
    name: 'Divine UMUTONI',
    role: 'Co-Founder & Creative Director',
    company: 'NDAJE Green',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
  }
];

// Localized getters
export function getServices(lang: Language): Service[] {
  if (lang === 'en') return SERVICES;
  return [
    {
      id: 'web-dev',
      title: 'Ingénierie Web Full-Stack',
      description: 'Création d’applications web et SPA ultra-rapides, optimisées pour le SEO avec React, Next.js et TypeScript avec une précision millimétrée.',
      icon: '🚀',
      tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
      metrics: '<100ms TBT',
      features: ['Rendu Côté Serveur', 'UI Interactive', 'Architecture Évolutive', 'SEO & Performance']
    },
    {
      id: 'video-editing',
      title: 'Montage Vidéo & Effets CapCut',
      description: 'Post-production vidéo professionnelle sur CapCut Pro & Premiere Pro. Spécialité en variations de vitesse, sous-titres dynamiques, étalonnage et vidéos virales.',
      icon: '🎬',
      tags: ['CapCut Pro', 'Premiere Pro', 'Étalonnage', 'Speed Ramps'],
      metrics: 'Montages 4K High FPS',
      features: ['Speed Ramping CapCut', 'Reels Réseaux Sociaux', 'Étalonnage Couleurs', 'Rythme Vidéo Viral']
    },
    {
      id: 'photoshop-design',
      title: 'Design Photoshop & Arts Graphiques',
      description: 'Retouche photo à fort impact, compositions numériques, affiches réseaux sociaux, flyers de marque et supports visuels.',
      icon: '🖌️',
      tags: ['Photoshop', 'Lightroom', 'Illustrator', 'Graphisme'],
      metrics: 'Impression & Web HD',
      features: ['Composition Photo', 'Design de Flyers & Affiches', 'Miniatures Attractives', 'Retouche Visuelle']
    },
    {
      id: 'sound-engineering',
      title: 'Arrangement Audio & Sonore Vidéo',
      description: 'Placement et arrangement précis d’effets sonores, pistes audio de fond, voix off et synchro de rythmes adaptés au montage vidéo.',
      icon: '🎧',
      tags: ['Placement Sonore', 'Audio CapCut', 'Audition', 'Synchro Rythme'],
      metrics: 'Pistes Audio Fluides',
      features: ['Placement d’Effets Sonores', 'Alignement Voix Off', 'Synchro Piste de Fond', 'Superposition Audio Vidéo']
    },
    {
      id: 'ui-ux',
      title: 'UI/UX & Systèmes de Design',
      description: 'Création d’interfaces intuitives, accessibles et haute fidélité dans Figma & Framer valorisant les produits numériques.',
      icon: '🎨',
      tags: ['Tailwind CSS', 'Framer', 'Figma', 'Accessibilité'],
      metrics: 'Conforme WCAG AAA',
      features: ['Design Tokens Atomiques', 'Micro-Interactions', 'Prototypage', 'Spécifications Design']
    },
    {
      id: 'ai-integration',
      title: 'Solutions IA & Gestion de Marque',
      description: 'Intégration d’IA générative dans les plateformes web combinée à une gestion stratégique de contenu pour maximiser l’impact de marque.',
      icon: '🤖',
      tags: ['API Gemini', 'Branding', 'Analytics', 'Croissance'],
      metrics: 'Croissance Digitale 360°',
      features: ['Apps GenAI Sur Mesure', 'Identité de Marque', 'Croissance de l’Audience', 'Stratégie de Contenu']
    }
  ];
}

export function getProjects(lang: Language): Project[] {
  if (lang === 'en') return PROJECTS;
  return [
    {
      id: '1',
      title: 'Tableau de Bord Analytique IA',
      description: 'Une plateforme de visualisation de données de pointe qui utilise Gemini AI pour fournir des prédictions et des analyses comportementales en temps réel.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      tags: ['React', 'D3.js', 'Gemini AI'],
      link: '#',
      category: 'AI & Systems',
      year: '2026',
      readTime: '3 min de lecture',
      featured: true,
      caseStudyDetails: {
        challenge: 'Les équipes d’entreprise avaient besoin d’analyses télémétriques en temps réel sans passer des heures à analyser des journaux de base de données bruts.',
        solution: 'Conception d’un tableau de bord visuel D3.js en temps réel propulsé par Gemini AI, générant automatiquement des synthèses en langage naturel et des tendances prédictives de risques.',
        impact: 'Réduction de 75 % du temps d’analyse des données pour les équipes produit.'
      }
    },
    {
      id: '2',
      title: 'Plateforme E-commerce Headless',
      description: 'Une solution e-commerce haute performance construite avec Next.js 15, avec gestion d’état complexe, recherche instantanée et paiement Stripe fluide.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      tags: ['Next.js', 'Stripe', 'Zustand'],
      link: 'https://ndaje-hotel-supply.vercel.app/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExbzZSaGZHbHgyQWROSFcxMHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR4RkCpBRjbuNc6S6ohGVll81Jlf1bbZjs4FuT7Df-LuooKS7pBmtr51aScU9Q_aem_fe_gRjf-3Pk8JCy_M6lNyw',
      category: 'Web App',
      year: '2025',
      readTime: '4 min de lecture',
      featured: true,
      caseStudyDetails: {
        challenge: 'La boutique précédente souffrait d’un taux d’abandon de panier élevé en raison de la lenteur des transitions de pages.',
        solution: 'Architecture d’une boutique headless utilisant Next.js App Router, mises à jour optimistes de l’UI et initialisation sub-seconde des sessions de paiement Stripe.',
        impact: 'Augmentation de 38 % du taux de conversion et score de performance Lighthouse de 99/100.'
      }
    },
    {
      id: '3',
      title: 'CMS pour Studio Créatif',
      description: 'Un système de gestion de contenu glisser-déposer sur mesure conçu pour les agences créatives afin de gérer leurs médias haute fidélité.',
      image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      tags: ['TypeScript', 'Firebase', 'Tailwind'],
      link: '#',
      category: 'UI/UX & Design',
      year: '2025',
      readTime: '2 min de lecture',
      featured: true,
      caseStudyDetails: {
        challenge: 'Les équipes créatives souffraient d’un stockage de médias fragmenté et d’un manque d’étiquetage métadonnées cohérent.',
        solution: 'Création d’un CMS de type canevas intuitif avec organisation des fichiers par glisser-déposer, prévisualisation en direct et collaboration en temps réel.',
        impact: 'Optimisation du flux de publication de contenu pour 12 marques clientes actives.'
      }
    },
    {
      id: '4',
      title: 'Hub IoT Maison Connectée',
      description: 'Un système de contrôle centralisé pour appareils domestiques intelligents, incluant surveillance en temps réel, automatisation et commandes vocales.',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1200&q=80',
      tags: ['Next.js', 'MQTT', 'Tailwind'],
      link: '#',
      category: 'AI & Systems',
      year: '2025',
      readTime: '3 min de lecture',
      caseStudyDetails: {
        challenge: 'Les installations IoT multi-appareils nécessitaient un tableau de bord web unifié avec mises à jour WebSocket à la microseconde.',
        solution: 'Création d’un tableau de bord consommateur MQTT léger avec widgets d’automatisation personnalisables et alertes de statut.',
        impact: 'Connexion de plus de 50 capteurs intelligents avec une latence fluide inférieure à 20 ms.'
      }
    },
    {
      id: '5',
      title: 'Système de Vote Décentralisé',
      description: 'Une plateforme de vote sécurisée et transparente construite sur la technologie blockchain, garantissant des résultats infalsifiables.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=1200&q=80',
      tags: ['Solidity', 'React', 'Web3'],
      link: '',
      category: 'Web App',
      year: '2024',
      readTime: '2 min de lecture',
      caseStudyDetails: {
        challenge: 'Les organisations manquaient d’un mécanisme de vote numérique ouvert et vérifiable protégeant l’anonymat des utilisateurs.',
        solution: 'Conception de contrats intelligents avec vérification à divulgation nulle de connaissance et interface Web3 accessible.',
        impact: 'Organisation réussie de simulations d’élections avec 100 % de précision d’audit.'
      }
    }
  ];
}

export function getProcessSteps(lang: Language): ProcessStep[] {
  if (lang === 'en') return PROCESS_STEPS;
  return [
    {
      number: '01',
      title: 'Découverte & Stratégie',
      description: 'Analyse approfondie de vos objectifs, besoins utilisateurs, paysage concurrentiel et contraintes techniques pour établir une feuille de route claire.',
      deliverables: ['Périmètre & Spécifications Produit', 'Cartographie des Parcours', 'Architecture Technique']
    },
    {
      number: '02',
      title: 'Maquettage & Prototypage',
      description: 'Transformation de la stratégie en système de design visuel haute fidélité, prototypes interactifs et composants atomiques dans Figma.',
      deliverables: ['Design System & Tokens', 'Prototypes Interactifs Figma', 'Audit d’Accessibilité']
    },
    {
      number: '03',
      title: 'Développement & Intégration IA',
      description: 'Conversion du design en code propre, évolutif et sécurisé avec React, Next.js et des services IA modernes aux micro-interactions fluides.',
      deliverables: ['Codebase Prêt pour Production', 'Intégration d’APIs', 'Tests Unitaires & E2E']
    },
    {
      number: '04',
      title: 'Optimisation & Lancement',
      description: 'Benchmarking poussé des performances, optimisation SEO, renforcement de la sécurité et déploiement Cloud fluide.',
      deliverables: ['Garantie Lighthouse 95+', 'Déploiement Cloud en Direct', 'Documentation & Passation']
    }
  ];
}

export function getTestimonials(lang: Language): Testimonial[] {
  if (lang === 'en') return TESTIMONIALS;
  return [
    {
      id: '1',
      quote: 'Ken allie maîtrise technique en développement logiciel et précision esthétique remarquable. Il a livré notre plateforme en avance avec une attention aux détails irréprochable.',
      name: 'Cesar NGENZI',
      role: 'Responsable Marque & Réseaux',
      company: 'Icyeza One Coffee Shop',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '2',
      quote: 'Travailler avec Ken a métamorphosé notre identité de marque numérique. Son sens du design au niveau de Framer et son exécution full-stack ont boosté notre conversion dès le premier jour.',
      name: 'Patrick SHEMA',
      role: 'Chef de Produit',
      company: 'BRIDGE Rwanda',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
    },
    {
      id: '3',
      quote: 'Sa capacité à intégrer des modèles d’IA de manière fluide dans des applications web réactives est inégalée. Recommandé sans hésitation pour tout projet numérique ambitieux.',
      name: 'Divine UMUTONI',
      role: 'Directrice Créative',
      company: 'NDAJE Green',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
    }
  ];
}

export function getDesignAssets(lang: Language): DesignAsset[] {
  if (lang === 'en') return DESIGN_ASSETS;
  return [
    {
      id: 'des-1',
      title: 'Bande Démo Vidéo CapCut & Premiere',
      category: 'Video Editing',
      mediaType: 'video',
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-grid-display-31780-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: '16/9',
      toolsUsed: ['CapCut Pro', 'Premiere Pro', 'Photoshop'],
      description: 'Montage promotionnel multi-séquences avec coupes rapides, effets sonores tendance, variations de vitesse fluides et étalonnage optimisé pour les réseaux sociaux.',
      gallery: [
        { id: 'm1', mediaType: 'video', mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-grid-display-31780-large.mp4', caption: 'Variations de vitesse dynamiques et transitions vidéo' },
        { id: 'm2', mediaType: 'video', mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-liquid-motion-abstract-art-41584-large.mp4', caption: 'Étalonnage des couleurs et ambiance visuelle' },
        { id: 'm3', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80', caption: 'Design de couverture vidéo sur Photoshop' },
        { id: 'm4', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&w=1200&q=80', caption: 'Timeline CapCut & synchronisation au rythme' }
      ],
      year: '2026',
      client: 'Urban Creative Studio',
      featured: true
    },
    {
      id: 'des-2',
      title: 'Collection d’Art Numérique & Collages Photoshop',
      category: 'Photoshop & Graphics',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: '1/1',
      toolsUsed: ['Adobe Photoshop', 'Lightroom', 'Illustrator'],
      description: 'Manipulations photo haute résolution et créations composite incluant doubles expositions, mises en page d’affiches et dégradés de couleurs vibrants.',
      gallery: [
        { id: 'p1', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', caption: 'Manipulation d’affiche abstraite #1' },
        { id: 'p2', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80', caption: 'Art composite numérique et masquage' },
        { id: 'p3', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1200&q=80', caption: 'Portrait Cyberpunk Néon' },
        { id: 'p4', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80', caption: 'Bannières pour réseaux sociaux' }
      ],
      year: '2025',
      client: 'Galerie Indépendante',
      featured: true
    },
    {
      id: 'des-3',
      title: 'Arrangement Audio Vidéo & Synchro de Rythme',
      category: 'Video Audio Arrangement',
      mediaType: 'video',
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41560-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: '16/9',
      toolsUsed: ['CapCut Pro', 'Premiere Pro', 'Adobe Audition', 'Placement de Rythmes'],
      description: 'Arrangement et placement précis d’effets sonores, pistes audio de fond, voix off et beats synchronisés sur les coupes vidéo.',
      gallery: [
        { id: 's1', mediaType: 'video', mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-41560-large.mp4', caption: 'Arrangement audio vidéo et chute de rythme' },
        { id: 's2', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80', caption: 'Superposition des couches audio et effets sonores' },
        { id: 's3', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80', caption: 'Alignement des pistes audio sur CapCut / Premiere' }
      ],
      year: '2025',
      client: 'Post-Production Vidéo',
      featured: true
    },
    {
      id: 'des-4',
      title: 'Icyeza One Coffee — Identité de Marque & Packaging',
      category: 'Brand Identity',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: '4/3',
      toolsUsed: ['Photoshop', 'Illustrator', 'Lightroom'],
      description: 'Identité visuelle complète pour Icyeza One Coffee Shop à Kigali, incluant logo typographique sur mesure, maquettes de sachets de café écologiques et charte réseaux sociaux.',
      gallery: [
        { id: 'b1', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1200&q=80', caption: 'Maquette de sachet écologique' },
        { id: 'b2', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80', caption: 'Typographie et logo de la marque' },
        { id: 'b3', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80', caption: 'Modèles de publications Instagram' }
      ],
      year: '2025',
      client: 'Icyeza One Coffee',
      featured: true
    },
    {
      id: 'des-5',
      title: 'Montages CapCut Format Court TikTok & Reels',
      category: 'Video Editing',
      mediaType: 'video',
      mediaUrl: 'https://assets.mixkit.co/videos/preview/mixkit-liquid-motion-abstract-art-41584-large.mp4',
      thumbnailUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: '9/16',
      toolsUsed: ['CapCut Pro', 'Adobe Photoshop', 'Beat Sync'],
      description: 'Vidéos au format vertical 9:16 dynamisées avec sous-titres animés, effets sonores, transitions tendance et incrustations visuelles captivantes.',
      gallery: [
        { id: 'c1', mediaType: 'video', mediaUrl: 'https://www.instagram.com/reel/DbqS8rGMoc1/', caption: 'Reel vertical CapCut' },
        { id: 'c2', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80', caption: 'Miniature à fort taux de clic' }
      ],
      year: '2026',
      client: 'Marque Sociale Virale'
    },
    {
      id: 'des-6',
      title: 'UI/UX d’Application Mobile & Maquettes Photoshop',
      category: 'UI/UX Design',
      mediaType: 'image',
      mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: '16/9',
      toolsUsed: ['Figma', 'Photoshop', 'Tailwind'],
      description: 'Écrans d’interface haute fidélité et maquettes Photoshop présentant une hiérarchie claire, des thèmes sombre/clair et des composants web réactifs.',
      gallery: [
        { id: 'u1', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80', caption: 'Design System de Tableau de bord Figma' },
        { id: 'u2', mediaType: 'image', mediaUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80', caption: 'Maquette d’écran mobile UI' }
      ],
      year: '2024',
      client: 'Apex Tech'
    }
  ];
}
