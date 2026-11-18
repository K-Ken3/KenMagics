import { Container } from '@/components/ui/Container';
import type { SiteSettings } from '@/lib/types';

export function Footer({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="footer">
      <Container>
        <hr className="hairline" />
        <div className="footer__main">
          <p className="footer__mark serif">Ken.</p>
          <nav className="footer__socials" aria-label="Social links">
            {settings.socials.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="link-sweep">
                {social.label}
              </a>
            ))}
          </nav>
          <a href="#top" className="footer__top label">
            Back to top ↑
          </a>
        </div>
        <div className="footer__bottom label">
          <span>© 2026 Ken Karasira</span>
          <span>Design · Digital · Motion</span>
          <span>Kigali, Rwanda</span>
        </div>
      </Container>
    </footer>
  );
}
