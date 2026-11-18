import type { ContentStatus } from '@/lib/types';

export type CollectionKey = 'services' | 'clients' | 'testimonials' | 'process_steps';

export type FieldConfig = {
  name: string;
  label: string;
  type?: 'text' | 'textarea' | 'email' | 'url' | 'select';
  options?: { value: string; label: string }[];
  list?: boolean;
};

export const collections: Record<
  CollectionKey,
  { title: string; table: string; fields: FieldConfig[]; supportsStatus: boolean }
> = {
  services: {
    title: 'Services',
    table: 'services',
    supportsStatus: true,
    fields: [
      { name: 'title', label: 'Title' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'bullets', label: 'Bullets (one per line)', type: 'textarea', list: true },
      { name: 'tags', label: 'Tags (comma separated)', list: true },
      { name: 'metric', label: 'Metric' },
      { name: 'locale', label: 'Language', type: 'select', options: [
        { value: 'en', label: 'English' },
        { value: 'fr', label: 'Français' },
      ] },
      { name: 'status', label: 'Status', type: 'select', options: [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
      ] },
    ],
  },
  clients: {
    title: 'Clients',
    table: 'clients',
    supportsStatus: false,
    fields: [
      { name: 'name', label: 'Name' },
      { name: 'logo', label: 'Logo URL' },
    ],
  },
  testimonials: {
    title: 'Testimonials',
    table: 'testimonials',
    supportsStatus: false,
    fields: [
      { name: 'quote', label: 'Quote', type: 'textarea' },
      { name: 'name', label: 'Name' },
      { name: 'role', label: 'Role' },
      { name: 'company', label: 'Company' },
      { name: 'avatar', label: 'Avatar URL' },
    ],
  },
  process_steps: {
    title: 'Process steps',
    table: 'process_steps',
    supportsStatus: false,
    fields: [
      { name: 'number', label: 'Number' },
      { name: 'title', label: 'Title' },
      { name: 'description', label: 'Description', type: 'textarea' },
      { name: 'deliverables', label: 'Deliverables (one per line)', type: 'textarea', list: true },
    ],
  },
};

export const statusLabel = (status: ContentStatus) => (status === 'published' ? 'Published' : 'Draft');
