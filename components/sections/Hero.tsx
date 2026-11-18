'use client';

import { useEffect, useRef } from 'react';
import { Container } from '@/components/ui/Container';
import { SplitText } from '@/components/motion/SplitText';
import { Magnetic } from '@/components/motion/Magnetic';
import { getGsap, isTouch, prefersReducedMotion } from '@/lib/motion/gsap';
import type { SiteSettings } from '@/lib/types';

export function Hero({ settings }: { settings: SiteSettings }) {
  const field = useRef<HTMLDivElement>(null);

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

  return (
    <section className="hero" id="top">
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
          <p className="label">{settings.location}</p>
        </div>

        <SplitText
          className="hero__title"
          lines={[settings.heroHeadlinePrefix.trim(), settings.heroHeadlineAccent, `${settings.heroHeadlineSuffix.trim()}`.trim()]}
          accentLine={1}
          delay={0.5}
        />

        <div className="hero__bottom grid-12">
          <p className="hero__lede lede">{settings.heroSubtext}</p>
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
      <a className="hero__scroll label" href="#about">
        Scroll to explore <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}
