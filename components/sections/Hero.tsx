'use client';

import { useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SplitText } from '@/components/motion/SplitText';
import { Magnetic } from '@/components/motion/Magnetic';
import { LogoMark } from '@/components/ui/LogoMark';
import { getGsap, isTouch, prefersReducedMotion } from '@/lib/motion/gsap';
import type { SiteSettings } from '@/lib/types';

export function Hero({ settings }: { settings: SiteSettings }) {
  const root = useRef<HTMLElement>(null);
  const field = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState('--:--');

  useEffect(() => {
    const readClock = () => {
      setClock(
        new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'Africa/Kigali',
        }).format(new Date()),
      );
    };
    readClock();
    const timer = window.setInterval(readClock, 30_000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const host = field.current;
    if (!host || isTouch() || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const lines = Array.from(host.querySelectorAll<HTMLElement>('.cursor-field__line'));
    const setters = lines.map((line) => ({
      x: gsap.quickTo(line, 'x', { duration: 0.9, ease: 'power3.out' }),
      scale: gsap.quickTo(line, 'scaleY', { duration: 0.9, ease: 'power3.out' }),
    }));
    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      setters.forEach((setter, index) => {
        const distance = 1 - Math.min(1, Math.abs(px - index / (setters.length - 1)) * 2.4);
        setter.x((px - 0.5) * (index % 2 ? -26 : 26));
        setter.scale(0.55 + distance * 0.9 + py * 0.15);
      });
    };
    host.addEventListener('pointermove', onMove);
    return () => host.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    const host = root.current;
    if (!host || prefersReducedMotion()) return;
    const { gsap } = getGsap();

    const context = gsap.context(() => {
      gsap.from('.hero__topline > *', {
        y: 18,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        delay: 0.15,
        ease: 'power3.out',
      });
      gsap.from('.hero__badge', {
        scale: 0.7,
        rotate: -18,
        opacity: 0,
        duration: 1.1,
        delay: 0.55,
        ease: 'expo.out',
      });
      gsap.from('.hero__lede, .hero__actions', {
        y: 26,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        delay: 0.85,
        ease: 'power3.out',
      });
      gsap.to('.hero__backdrop-word', {
        xPercent: -9,
        yPercent: 9,
        ease: 'none',
        scrollTrigger: { trigger: host, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__title', {
        yPercent: -14,
        opacity: 0.22,
        ease: 'none',
        scrollTrigger: { trigger: host, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__badge', {
        yPercent: -22,
        ease: 'none',
        scrollTrigger: { trigger: host, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero__scroll', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: host, start: '55% top', end: 'bottom top', scrub: true },
      });
    }, host);

    if (!isTouch()) {
      const badge = host.querySelector<HTMLElement>('.hero__badge');
      const glow = host.querySelector<HTMLElement>('.hero__glow--sage');
      if (badge) {
        const x = gsap.quickTo(badge, 'x', { duration: 1.1, ease: 'power3.out' });
        const y = gsap.quickTo(badge, 'y', { duration: 1.1, ease: 'power3.out' });
        const onMove = (event: PointerEvent) => {
          x((event.clientX / window.innerWidth - 0.5) * 26);
          y((event.clientY / window.innerHeight - 0.5) * 26);
        };
        host.addEventListener('pointermove', onMove);
        context.add(() => {
          host.removeEventListener('pointermove', onMove);
          if (glow) gsap.killTweensOf(glow);
        });
      }
    }

    return () => context.revert();
  }, []);

  return (
    <section ref={root} className="hero" id="top">
      <div className="hero__backdrop" aria-hidden="true">
        <span className="hero__backdrop-word">KARASIRA</span>
        <span className="hero__glow hero__glow--sage" />
        <span className="hero__glow hero__glow--clay" />
      </div>
      <div ref={field} className="cursor-field" aria-hidden="true">
        {Array.from({ length: 12 }, (_, index) => (
          <span className="cursor-field__line" key={index} />
        ))}
      </div>
      <Container className="hero__inner">
        <div className="hero__topline">
          <p className="label hero__available">
            <span className="status-dot" aria-hidden="true" />
            {settings.availabilityStatus}
          </p>
          <p className="label hero__locale">
            {settings.location}
            <span className="hero__locale-sep" aria-hidden="true">/</span>
            <span className="hero__clock">{clock}</span> CAT
          </p>
        </div>

        <SplitText
          className="hero__title"
          lines={[settings.heroHeadlinePrefix.trim(), settings.heroHeadlineAccent, `${settings.heroHeadlineSuffix.trim()}`.trim()]}
          accentLine={1}
          delay={0.5}
        />

        <div className="hero__bottom grid-12">
          <p className="hero__lede lede">{settings.heroSubtext}</p>
          <div className="hero__badge">
            <svg className="hero__badge-ring" viewBox="0 0 200 200" aria-hidden="true">
              <defs>
                <path id="hero-badge-circle" d="M100,100 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0" />
              </defs>
              <text>
                <textPath href="#hero-badge-circle" startOffset="0">
                  {settings.content.heroBadgeText}
                </textPath>
              </text>
            </svg>
            <LogoMark className="hero__logo" priority />
          </div>
          <div className="hero__actions">
            <Magnetic>
              <a className="button" href="#work" data-cursor="Work">
                View selected work <span className="button__arrow" aria-hidden="true">↗</span>
              </a>
            </Magnetic>
            <Magnetic>
              <a className="button button--ghost" href="#contact" data-cursor="Talk">
                Start a project <span className="button__arrow" aria-hidden="true">↗</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </Container>
      <div className="hero__palette" aria-hidden="true">
        <span className="tone-sage" />
        <span className="tone-clay" />
        <span className="tone-slate" />
      </div>
      <a className="hero__scroll label" href="#about">
        {settings.content.heroScrollLabel}
        <span className="hero__scroll-line" aria-hidden="true">
          <i />
        </span>
      </a>
    </section>
  );
}
