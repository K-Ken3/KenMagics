import type { MetadataRoute } from 'next';
import { getPortfolio } from '@/lib/data/get-portfolio';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { projects } = await getPortfolio();
  const base = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ken-portfolio-sable.vercel.app').replace(/\/$/, '');
  const anchors = ['', '#about', '#work', '#services', '#clients', '#process', '#contact'];

  return [
    ...anchors.map((anchor) => ({ url: `${base}/${anchor}`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: anchor ? 0.6 : 1 })),
    ...projects.map((project) => ({
      url: `${base}/work/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
