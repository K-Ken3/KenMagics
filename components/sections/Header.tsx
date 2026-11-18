'use client';

import { useEffect, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { LogoMark } from '@/components/ui/LogoMark';
import type { SiteSettings } from '@/lib/types';
import { MenuOverlay } from './MenuOverlay';

export function Header({ settings }: { settings: SiteSettings }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
        <Container className="header__inner">
          <a href="/" className="header__mark" aria-label="KenDesigns home" data-cursor="Home">
            <LogoMark className="header__logo" priority />
            <span className="header__wordmark" aria-hidden="true">
              {settings.content.headerWordmark}
              <span>{settings.content.headerWordmarkAccent}</span>
            </span>
          </a>
          <p className="header__meta label">{settings.content.tagline}</p>
          <div className="header__actions">
            <a className="header__email link-sweep" href={`mailto:${settings.email}`}>
              {settings.email}
            </a>
            <button
              type="button"
              className="header__menu"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="site-menu"
            >
              <span />
              <span />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </Container>
      </header>
      <MenuOverlay open={open} onClose={() => setOpen(false)} settings={settings} />
    </>
  );
}
