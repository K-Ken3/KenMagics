import type { Metadata } from 'next';
import { getPortfolio } from '@/lib/data/get-portfolio';

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getPortfolio();
  const title = settings.seoTitle || 'KEN KARASIRA | Digital Product Engineer & Designer';
  const description =
    settings.seoDescription ||
    'KenDesigns — design, digital and motion. Web engineering, video editing, graphic design and social content from Kigali, Rwanda.';

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ken-portfolio-sable.vercel.app'),
    title: { default: title, template: '%s | Ken Karasira' },
    description,
    keywords: ['Ken Karasira', 'KenDesigns', 'design', 'digital', 'motion', 'Kigali', 'Rwanda'],
    openGraph: {
      type: 'website',
      locale: 'en_RW',
      url: '/',
      siteName: 'KenDesigns',
      title,
      description,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'KenDesigns — Design, Digital, Motion' }],
    },
    twitter: { card: 'summary_large_image', title, description },
    robots: { index: true, follow: true },
  };
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const { settings } = await getPortfolio();
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ken Karasira',
    alternateName: 'KenDesigns',
    jobTitle: 'Digital Product Engineer & Designer',
    email: settings.email,
    address: { '@type': 'PostalAddress', addressLocality: 'Kigali', addressCountry: 'RW' },
    sameAs: settings.socials.map((social) => social.url),
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://ken-portfolio-sable.vercel.app',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
