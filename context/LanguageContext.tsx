import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr';

export interface Translations {
  nav: {
    projects: string;
    studio: string;
    services: string;
    process: string;
    testimonials: string;
    contact: string;
    getInTouch: string;
  };
  hero: {
    availableTag: string;
    location: string;
    specializingIn: string;
    roles: string[];
    headlinePrefix: string;
    headlineGradient: string;
    headlineSuffix: string;
    subtitle: string;
    exploreCode: string;
    videoStudio: string;
    copyEmail: string;
    emailCopied: string;
    yearsExp: string;
    fullStackMedia: string;
    qualityDelivery: string;
  };
  projects: {
    sectionTag: string;
    title: string;
    categories: {
      all: string;
      webApp: string;
      uiux: string;
      aiSystems: string;
      mobile: string;
    };
    readTimeFormat: (timeStr: string) => string;
    liveDemo: string;
    caseDetails: string;
    modal: {
      challenge: string;
      solution: string;
      impact: string;
      techStack: string;
      close: string;
      launchApp: string;
    };
  };
  designStudio: {
    sectionTag: string;
    title: string;
    subtitle: string;
    importBtn: string;
    categories: {
      all: string;
      videoEditing: string;
      photoshop: string;
      graphics: string;
      audioArrangement: string;
      soundPlacement: string;
      brandIdentity: string;
      uiux: string;
      uiuxDesign: string;
    };
    watchVideo: string;
    playAudio: string;
    viewDesign: string;
    audioTrack: string;
    modal: {
      toolsUsed: string;
      descriptionSpecs: string;
      keyTechniques: string;
      watchProjectVideo: string;
      closePreview: string;
    };
    authModal: {
      title: string;
      subtitle: string;
      label: string;
      placeholder: string;
      authorizeBtn: string;
      notice: string;
      errorMsg: string;
    };
    uploadDrawer: {
      title: string;
      subtitle: string;
      projectTitleLabel: string;
      categoryLabel: string;
      uploadPhotosLabel: string;
      uploadVideoLabel: string;
      descLabel: string;
      publishBtn: string;
    };
  };
  services: {
    sectionTag: string;
    title: string;
    subtitle: string;
    coreCount: string;
    coreDisciplines: string;
    popupDetails: string;
    viewBtn: string;
    modal: {
      deliverables: string;
      deliverablesHeader: string;
      techHeader: string;
      techTools: string;
      close: string;
      discuss: string;
      discussProject: string;
    };
  };
  process: {
    sectionTag: string;
    title: string;
    subtitle: string;
    structuredWorkflow: string;
    popupDetails: string;
    phasePrefix: string;
    deliverablesHeader: string;
    prevPhase: string;
    nextPhase: string;
    of: string;
    modal: {
      deliverables: string;
      prevPhase: string;
      nextPhase: string;
    };
  };
  testimonials: {
    sectionTag: string;
    title: string;
    subtitle: string;
    openAllBtn: string;
    popupReview: string;
    closeBtn: string;
    allHeader: string;
    closeGallery: string;
    modal: {
      close: string;
      allTitle: string;
      closeGallery: string;
    };
  };
  contact: {
    sectionTag: string;
    title: string;
    subtitle: string;
    directEmail: string;
    whatsappDirect: string;
    locationLabel: string;
    basedInLabel: string;
    basedInValue: string;
    nameLabel: string;
    namePlaceholder: string;
    fullNameLabel: string;
    fullNamePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailInputLabel: string;
    emailInputPlaceholder: string;
    serviceLabel: string;
    selectService: string;
    selectNeed: string;
    serviceOptions: string[];
    serviceDev: string;
    serviceVideo: string;
    servicePhotoshop: string;
    serviceAudio: string;
    serviceUIUX: string;
    budgetLabel: string;
    selectBudget: string;
    detailsLabel: string;
    detailsPlaceholder: string;
    sendBtn: string;
    sendingBtn: string;
    sentSuccess: string;
  };
  aiAssistant: {
    title: string;
    subtitle: string;
    status: string;
    placeholder: string;
    initialMessage: string;
  };
  footer: {
    builtWith: string;
    backToTop: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      projects: 'Software & Web Apps',
      studio: 'Video & Photo Studio',
      services: 'Services & Capabilities',
      process: 'Workflow & Process',
      testimonials: 'Client Endorsements',
      contact: 'Contact',
      getInTouch: 'Get in Touch',
    },
    hero: {
      availableTag: 'AVAILABLE FOR FREELANCE & FULL-TIME',
      location: 'Kigali, Rwanda',
      specializingIn: 'Specializing in:',
      roles: [
        'Full-Stack Web Engineering',
        'CapCut & Premiere Editing',
        'Photoshop Poster Design',
        'Video Audio Arrangement',
        'UI/UX & Brand Design'
      ],
      headlinePrefix: 'Crafting ',
      headlineGradient: 'Software, Video & Audio',
      headlineSuffix: ' Systems.',
      subtitle: "Hi, I'm KARASIRA Ken — bridging full-stack web engineering with CapCut/Premiere video editing, Photoshop poster design, and video sound arrangement.",
      exploreCode: 'Explore Code Works',
      videoStudio: 'Video & Photo Studio',
      copyEmail: 'Copy Email',
      emailCopied: 'Email Copied!',
      yearsExp: '3+ YRS EXPERIENCE',
      fullStackMedia: 'FULL-STACK & MEDIA',
      qualityDelivery: '100% QUALITY DELIVERY'
    },
    projects: {
      sectionTag: 'SOFTWARE & WEB APPS',
      title: 'Featured Case Studies & Software',
      categories: {
        all: 'All',
        webApp: 'Web App',
        uiux: 'UI/UX & Design',
        aiSystems: 'AI & Systems',
        mobile: 'Mobile'
      },
      readTimeFormat: (timeStr: string) => timeStr,
      liveDemo: 'Live Demo',
      caseDetails: 'Case Details',
      modal: {
        challenge: 'Challenge & Objectives',
        solution: 'Engineering Solution',
        impact: 'Impact & Metrics',
        techStack: 'Tech Stack Used',
        close: 'Close Case Study',
        launchApp: 'Launch Live Application'
      }
    },
    designStudio: {
      sectionTag: 'DESIGN, VIDEO & SOUND STUDIO',
      title: 'Video Editing, Photoshop & Video Sound Placement',
      subtitle: 'Showcasing professional CapCut and Premiere Pro video cuts, Photoshop digital poster collages, video audio arrangements, and brand identity projects.',
      importBtn: 'Import Photos & Videos Project',
      categories: {
        all: 'All Works',
        videoEditing: 'Video Editing',
        photoshop: 'Photoshop & Graphics',
        graphics: 'Photoshop & Graphics',
        audioArrangement: 'Video Audio Arrangement',
        soundPlacement: 'Video Audio Arrangement',
        brandIdentity: 'Brand Identity',
        uiux: 'UI/UX Design',
        uiuxDesign: 'UI/UX Design'
      },
      watchVideo: 'Watch Video Project',
      playAudio: 'Play Audio Demo',
      viewDesign: 'View Design',
      audioTrack: 'Audio Track',
      modal: {
        toolsUsed: 'Software / Tools',
        descriptionSpecs: 'Project Description & Specs',
        keyTechniques: 'Key Techniques Used',
        watchProjectVideo: 'Watch Project Video',
        closePreview: 'Close Preview'
      },
      authModal: {
        title: 'Import Access Protection',
        subtitle: 'Secret Password Required',
        label: 'Enter Access Key',
        placeholder: 'Enter secret password...',
        authorizeBtn: 'Authorize Access',
        notice: 'Restricted access. Enter the administrator secret key to unlock the multi-media import feature.',
        errorMsg: 'Incorrect administrator password. Access denied.'
      },
      uploadDrawer: {
        title: 'Project Multi-Media Importer',
        subtitle: 'Add New Portfolio Project',
        projectTitleLabel: 'Project Title',
        categoryLabel: 'Primary Category',
        uploadPhotosLabel: 'Upload Photos & Artwork',
        uploadVideoLabel: 'Upload Video Cuts / Edits',
        descLabel: 'Project Description',
        publishBtn: 'Save & Publish Project'
      }
    },
    services: {
      sectionTag: 'EXPERT CAPABILITIES',
      title: 'High-Impact Engineering & Creative Solutions',
      subtitle: 'Click any capability card below to expand full service deliverables, metrics, and tools.',
      coreCount: '6 Core Disciplines',
      coreDisciplines: '6 Core Disciplines',
      popupDetails: 'Pop-up Details',
      viewBtn: 'View →',
      modal: {
        deliverables: 'Key Deliverables & Workflow',
        deliverablesHeader: 'Key Deliverables & Workflow',
        techHeader: 'Technologies & Tools:',
        techTools: 'Technologies & Tools:',
        close: 'Close',
        discuss: 'Discuss Project',
        discussProject: 'Discuss Project'
      }
    },
    process: {
      sectionTag: 'HOW I WORK',
      title: 'A Proven 4-Step Engineering & Design Process',
      subtitle: 'Click any phase below to trigger the interactive pop-up breakdown of deliverables and methodology.',
      structuredWorkflow: 'Structured Workflow',
      popupDetails: 'Pop-up Phase Details',
      phasePrefix: 'Phase',
      deliverablesHeader: 'Phase Deliverables',
      prevPhase: '← Previous Phase',
      nextPhase: 'Next Phase →',
      of: 'of',
      modal: {
        deliverables: 'Phase Deliverables',
        prevPhase: '← Previous Phase',
        nextPhase: 'Next Phase →'
      }
    },
    testimonials: {
      sectionTag: 'ENDORSEMENTS & FEEDBACK',
      title: 'Trusted by Leaders & Innovators',
      subtitle: 'Click any endorsement card or avatar below to open the pop-up testimonial review.',
      openAllBtn: 'Open All Endorsements Popup',
      popupReview: 'Pop-up Review',
      closeBtn: 'Close Endorsement',
      allHeader: 'All Client Endorsements',
      closeGallery: 'Close Gallery',
      modal: {
        close: 'Close Endorsement',
        allTitle: 'All Client Endorsements',
        closeGallery: 'Close Gallery'
      }
    },
    contact: {
      sectionTag: 'START A CONVERSATION',
      title: "Let's Build Something Exceptional Together",
      subtitle: 'Whether you need a web app, video editing, Photoshop posters, or video audio arrangement, drop a message below or connect directly.',
      directEmail: 'Direct Email',
      whatsappDirect: 'WhatsApp Direct',
      locationLabel: 'Location',
      basedInLabel: 'Location',
      basedInValue: 'Kigali, Rwanda',
      nameLabel: 'Your Name',
      namePlaceholder: 'e.g. John Doe',
      fullNameLabel: 'Your Name',
      fullNamePlaceholder: 'e.g. John Doe',
      emailLabel: 'Your Email',
      emailPlaceholder: 'john@example.com',
      emailInputLabel: 'Your Email',
      emailInputPlaceholder: 'john@example.com',
      serviceLabel: 'Service Needed',
      selectService: 'Select a service...',
      selectNeed: 'Select Service Needed',
      serviceOptions: [
        'Full-Stack Web Development',
        'CapCut & Premiere Video Editing',
        'Photoshop Graphic Design',
        'Video Sound Placement',
        'UI/UX & Brand Identity'
      ],
      serviceDev: 'Full-Stack Web Development',
      serviceVideo: 'CapCut & Premiere Video Editing',
      servicePhotoshop: 'Photoshop Graphic Design',
      serviceAudio: 'Video Sound Arrangement',
      serviceUIUX: 'UI/UX & Brand Identity',
      budgetLabel: 'Project Budget',
      selectBudget: 'Select budget range...',
      detailsLabel: 'Project Details',
      detailsPlaceholder: 'Describe your goals, timeline, and deliverables...',
      sendBtn: 'Send Message',
      sendingBtn: 'Sending...',
      sentSuccess: 'Message Sent Successfully!'
    },
    aiAssistant: {
      title: "Ken's Personal AI",
      subtitle: "Ask anything about Ken's work",
      status: 'Online • Instant Answers',
      placeholder: "Ask about Ken's skills or works...",
      initialMessage: "Hi there! I'm Ken's AI assistant. How can I help you explore Ken's software development, video editing, or design portfolio today?"
    },
    footer: {
      builtWith: 'KARASIRA Ken. Built with React & Framer UI.',
      backToTop: 'Back to top'
    }
  },
  fr: {
    nav: {
      projects: 'Logiciels & Apps Web',
      studio: 'Studio Vidéo & Photo',
      services: 'Services & Compétences',
      process: 'Processus & Workflow',
      testimonials: 'Témoignages Clients',
      contact: 'Contact',
      getInTouch: 'Me Contacter',
    },
    hero: {
      availableTag: 'DISPONIBLE EN FREELANCE & TEMPS PLEIN',
      location: 'Kigali, Rwanda',
      specializingIn: 'Spécialisé en :',
      roles: [
        'Ingénierie Web Full-Stack',
        'Montage CapCut & Premiere',
        'Design Graphique Photoshop',
        'Arrangement Audio Vidéo',
        'Design UI/UX & Marque'
      ],
      headlinePrefix: 'Création de ',
      headlineGradient: 'Systèmes Logiciels, Vidéo & Audio',
      headlineSuffix: '.',
      subtitle: "Bonjour, je suis KARASIRA Ken — alliant ingénierie web full-stack, montage vidéo CapCut/Premiere, création graphique Photoshop et arrangement sonore vidéo.",
      exploreCode: 'Découvrir les Projets Code',
      videoStudio: 'Studio Vidéo & Photo',
      copyEmail: "Copier l'Email",
      emailCopied: 'Email Copié !',
      yearsExp: "3+ ANS D'EXPÉRIENCE",
      fullStackMedia: 'FULL-STACK & MÉDIA',
      qualityDelivery: 'LIVRAISON 100% QUALITÉ'
    },
    projects: {
      sectionTag: 'LOGICIELS & APPS WEB',
      title: 'Études de Cas & Logiciels Phares',
      categories: {
        all: 'Tous',
        webApp: 'Apps Web',
        uiux: 'UI/UX & Design',
        aiSystems: 'IA & Systèmes',
        mobile: 'Mobile'
      },
      readTimeFormat: (timeStr: string) => {
        return timeStr.replace('read', 'de lecture');
      },
      liveDemo: 'Démo en direct',
      caseDetails: 'Détails du Cas',
      modal: {
        challenge: 'Défis & Objectifs',
        solution: "Solution d'Ingénierie",
        impact: 'Impact & Résultats',
        techStack: 'Technologies Utilisées',
        close: "Fermer l'Étude de Cas",
        launchApp: "Lancer l'Application"
      }
    },
    designStudio: {
      sectionTag: 'STUDIO DESIGN, VIDÉO & SON',
      title: 'Montage Vidéo, Photoshop & Arrangement Sonore',
      subtitle: 'Présentation de montages vidéo CapCut et Premiere Pro, affiches digitales Photoshop, arrangements audio vidéo et identités de marque.',
      importBtn: 'Importer Projet Photos & Vidéos',
      categories: {
        all: 'Tous les Travaux',
        videoEditing: 'Montage Vidéo',
        photoshop: 'Photoshop & Graphisme',
        graphics: 'Photoshop & Graphisme',
        audioArrangement: 'Arrangement Audio Vidéo',
        soundPlacement: 'Arrangement Audio Vidéo',
        brandIdentity: 'Identité de Marque',
        uiux: 'Design UI/UX',
        uiuxDesign: 'Design UI/UX'
      },
      watchVideo: 'Regarder la Vidéo du Projet',
      playAudio: "Écouter la Démo Audio",
      viewDesign: 'Voir le Design',
      audioTrack: 'Piste Audio',
      modal: {
        toolsUsed: 'Logiciels / Outils',
        descriptionSpecs: 'Description & Spécifications du Projet',
        keyTechniques: 'Techniques Clés Utilisées',
        watchProjectVideo: 'Regarder la Vidéo du Projet',
        closePreview: 'Fermer la Prévisualisation'
      },
      authModal: {
        title: "Protection d'Accès Importation",
        subtitle: 'Mot de Passe Secret Requis',
        label: "Entrer la Clé d'Accès",
        placeholder: 'Entrez le mot de passe secret...',
        authorizeBtn: "Autoriser l'Accès",
        notice: "Accès restreint. Entrez la clé secrète administrateur pour déverrouiller la fonctionnalité d'importation.",
        errorMsg: 'Mot de passe administrateur incorrect. Accès refusé.'
      },
      uploadDrawer: {
        title: 'Importateur Multi-Média de Projet',
        subtitle: 'Ajouter un Nouveau Projet au Portfolio',
        projectTitleLabel: 'Titre du Projet',
        categoryLabel: 'Catégorie Principale',
        uploadPhotosLabel: 'Téléverser Photos & Visuels',
        uploadVideoLabel: 'Téléverser Séquences Vidéo',
        descLabel: 'Description du Projet',
        publishBtn: 'Enregistrer & Publier le Projet'
      }
    },
    services: {
      sectionTag: 'COMPÉTENCES CLÉS',
      title: "Solutions d'Ingénierie & de Création à Fort Impact",
      subtitle: 'Cliquez sur une carte ci-dessous pour afficher les livrables, métriques et outils complets.',
      coreCount: '6 Disciplines Clés',
      coreDisciplines: '6 Disciplines Clés',
      popupDetails: 'Détails Pop-up',
      viewBtn: 'Voir →',
      modal: {
        deliverables: 'Livrables Clés & Workflow',
        deliverablesHeader: 'Livrables Clés & Workflow',
        techHeader: 'Technologies & Outils :',
        techTools: 'Technologies & Outils :',
        close: 'Fermer',
        discuss: 'Discuter du Projet',
        discussProject: 'Discuter du Projet'
      }
    },
    process: {
      sectionTag: 'MON PROCESSUS',
      title: 'Un Processus en 4 Étapes Éprouvé',
      subtitle: 'Cliquez sur une phase ci-dessous pour afficher le détail des livrables et de la méthodologie.',
      structuredWorkflow: 'Workflow Structuré',
      popupDetails: 'Détails de la Phase',
      phasePrefix: 'Phase',
      deliverablesHeader: 'Livrables de la Phase',
      prevPhase: '← Phase Précédente',
      nextPhase: 'Phase Suivante →',
      of: 'sur',
      modal: {
        deliverables: 'Livrables de la Phase',
        prevPhase: '← Phase Précédente',
        nextPhase: 'Phase Suivante →'
      }
    },
    testimonials: {
      sectionTag: 'RECOMMANDATIONS & AVIS',
      title: 'Approuvé par des Leaders & Innovateurs',
      subtitle: "Cliquez sur un témoignage ou un avatar ci-dessous pour l'ouvrir en pop-up.",
      openAllBtn: 'Ouvrir Tous les Témoignages',
      popupReview: 'Avis Pop-up',
      closeBtn: 'Fermer le Témoignage',
      allHeader: 'Tous les Témoignages Clients',
      closeGallery: 'Fermer la Galerie',
      modal: {
        close: 'Fermer le Témoignage',
        allTitle: 'Tous les Témoignages Clients',
        closeGallery: 'Fermer la Galerie'
      }
    },
    contact: {
      sectionTag: 'DÉMARRER UNE CONVERSATION',
      title: "Créons Quelque Chose d'Exceptionnel Ensemble",
      subtitle: "Que vous ayez besoin d'une application web, de montage vidéo, d'affiches Photoshop ou d'arrangement sonore, envoyez un message ci-dessous ou contactez-moi directement.",
      directEmail: 'Email Direct',
      whatsappDirect: 'WhatsApp Direct',
      locationLabel: 'Localisation',
      basedInLabel: 'Localisation',
      basedInValue: 'Kigali, Rwanda',
      nameLabel: 'Votre Nom',
      namePlaceholder: 'ex. Jean Dupont',
      fullNameLabel: 'Votre Nom',
      fullNamePlaceholder: 'ex. Jean Dupont',
      emailLabel: 'Votre Email',
      emailPlaceholder: 'jean@exemple.com',
      emailInputLabel: 'Votre Email',
      emailInputPlaceholder: 'jean@exemple.com',
      serviceLabel: 'Service Souhaité',
      selectService: 'Sélectionner un service...',
      selectNeed: 'Sélectionner le service requis',
      serviceOptions: [
        'Développement Web Full-Stack',
        'Montage Vidéo CapCut & Premiere',
        'Design Graphique Photoshop',
        'Arrangement Audio Vidéo',
        'UI/UX & Identité de Marque'
      ],
      serviceDev: 'Développement Web Full-Stack',
      serviceVideo: 'Montage Vidéo CapCut & Premiere',
      servicePhotoshop: 'Design Graphique Photoshop',
      serviceAudio: 'Arrangement Audio Vidéo',
      serviceUIUX: 'UI/UX & Identité de Marque',
      budgetLabel: 'Budget du Projet',
      selectBudget: 'Sélectionner une tranche...',
      detailsLabel: 'Détails du Projet',
      detailsPlaceholder: 'Décrivez vos objectifs, calendrier et livrables...',
      sendBtn: 'Envoyer le Message',
      sendingBtn: 'Envoi en cours...',
      sentSuccess: 'Message Envoyé avec Succès !'
    },
    aiAssistant: {
      title: 'IA Personnelle de Ken',
      subtitle: 'Posez vos questions sur le travail de Ken',
      status: 'En ligne • Réponses Instantanées',
      placeholder: 'Posez une question sur les compétences de Ken...',
      initialMessage: "Bonjour ! Je suis l'assistant virtuel de Ken. Comment puis-je vous aider à découvrir son portfolio en développement web, montage vidéo ou design aujourd'hui ?"
    },
    footer: {
      builtWith: 'KARASIRA Ken. Conçu avec React & UI Framer.',
      backToTop: 'Haut de page'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    if (saved === 'fr' || saved === 'en') return saved;
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_language', lang);
  };

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
