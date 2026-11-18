'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { getGsap, prefersReducedMotion } from '@/lib/motion/gsap';

export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const { gsap, ScrollTrigger } = getGsap();
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, touchMultiplier: 1.2 });
    const update = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on('scroll', update);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Anchor links are routed through Lenis so the header never causes a jump.
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]');
      if (!link) return;
      const id = link.getAttribute('href')?.replace(/^\//, '');
      if (!id || id === '#') return;
      const element = document.querySelector(id);
      if (!element) return;
      event.preventDefault();
      lenis.scrollTo(element as HTMLElement, { offset: -12 });
    };
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
      lenis.off('scroll', update);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
