import { Container } from '@/components/ui/Container';
import { LogoMark } from '@/components/ui/LogoMark';
import type { SiteSettings } from '@/lib/types';

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="footer">
      <span className="footer__ghost" aria-hidden="true">
        {settings.content.footerGhost}
      </span>
      <Container>
        <hr className="hairline" />
        <div className="footer__main">
          <div className="footer__brand">
            <LogoMark className="footer__logo" />
            <div>
              <p className="footer__mark">
                Ken<span>Designs</span>
              </p>
              <p className="label">{settings.content.footerTagline}</p>
            </div>
          </div>
          <nav className="footer__socials" aria-label="Social links">
            {settings.socials.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="link-sweep" data-cursor="Open">
                {social.label}
              </a>
            ))}
          </nav>
          <a href="#top" className="footer__top label" data-cursor="Top">
            {settings.content.footerBackToTop} ↑
          </a>
        </div>
        <div className="footer__bottom label">
          <span>{settings.content.copyright}</span>
          <span>{settings.content.tagline}</span>
          <span>{settings.location}</span>
        </div>
      </Container>
    </footer>
  );
}
