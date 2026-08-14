
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  tags: string[];
  metrics?: string;
  features?: string[];
}

export interface CaseStudyDetails {
  challenge: string;
  solution: string;
  impact: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  category?: 'Web App' | 'UI/UX & Design' | 'AI & Systems' | 'Mobile';
  year?: string;
  readTime?: string;
  featured?: boolean;
  caseStudyDetails?: CaseStudyDetails;
}

export interface MediaItem {
  id: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  caption?: string;
}

export interface DesignAsset {
  id: string;
  title: string;
  category: 'Video Editing' | 'Photoshop & Graphics' | 'Video Audio Arrangement' | 'Brand Identity' | 'UI/UX Design';
  mediaType: 'image' | 'video';
  mediaUrl: string;
  gallery?: MediaItem[]; // Supports importing multiple photos and videos into a single project
  thumbnailUrl?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | '9/16';
  toolsUsed: string[];
  description: string;
  year?: string;
  client?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  deliverables: string[];
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}


