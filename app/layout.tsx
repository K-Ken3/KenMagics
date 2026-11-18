import type { Metadata, Viewport } from 'next';
import { Geist, Instrument_Serif } from 'next/font/google';
import './globals.css';

const sans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const title = 'KEN KARASIRA | Digital Product Engineer & Designer';
const description =
  'KenDesigns — design, digital and motion. Graphic design and branding, web design and development, video editing, motion graphics and social content, from Kigali, Rwanda.';

export const metadata: Metadata = {
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
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'KenDesigns — Design, Digital, Motion' }],
  },
  twitter: { card: 'summary_large_image', title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
