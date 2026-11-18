import { unstable_cache } from 'next/cache';
import { createClient } from '@supabase/supabase-js';
import { legacyPortfolio } from './portfolio';
import { mapPortfolio, type PortfolioRows } from './mappers';
import { getAnonKey, getSupabaseUrl, hasPublicSupabaseEnv } from '@/lib/supabase/env';
import type { PortfolioData } from '@/lib/types';

/**
 * Public content is read with the anon key (RLS allows published rows only).
 * Falls back to the complete legacy dataset when Supabase is not configured,
 * so the site still builds and renders before the database is connected.
 */
async function readPortfolio(): Promise<PortfolioData> {
  if (!hasPublicSupabaseEnv) return legacyPortfolio;

  const supabase = createClient(getSupabaseUrl(), getAnonKey(), {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const [settings, about, projects, projectMedia, services, clients, testimonials, process] = await Promise.all([
    supabase.from('site_settings').select('*').eq('id', 'default').maybeSingle(),
    supabase.from('about').select('*').eq('id', 'default').maybeSingle(),
    supabase.from('projects').select('*').eq('status', 'published').order('sort_order'),
    supabase.from('project_media').select('*').order('sort_order'),
    supabase.from('services').select('*').eq('status', 'published').order('sort_order'),
    supabase.from('clients').select('*').order('sort_order'),
    supabase.from('testimonials').select('*').order('sort_order'),
    supabase.from('process_steps').select('*').order('sort_order'),
  ]);

  const failed = [settings, about, projects, projectMedia, services, clients, testimonials, process].find(
    (result) => result.error,
  );
  if (failed?.error) {
    console.error('[portfolio] Supabase read failed, using legacy fallback:', failed.error.message);
    return legacyPortfolio;
  }
  if (!settings.data || !about.data) return legacyPortfolio;

  const rows: PortfolioRows = {
    settings: settings.data,
    about: about.data,
    projects: projects.data,
    projectMedia: projectMedia.data,
    services: services.data,
    clients: clients.data,
    testimonials: testimonials.data,
    process: process.data,
  };
  return mapPortfolio(rows);
}

export const getPortfolio = unstable_cache(readPortfolio, ['portfolio-content'], {
  revalidate: 3600,
  tags: ['portfolio'],
});
