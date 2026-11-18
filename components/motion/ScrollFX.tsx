'use client';

import { useEffect } from 'react';
import { getGsap, prefersReducedMotion } from '@/lib/motion/gsap';

export function ScrollFX() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.section-head__title').forEach((title) => {
        gsap.from(title, {
          yPercent: 22,
          opacity: 0,
          clipPath: 'inset(0 0 100% 0)',
          duration: 1.05,
          ease: 'expo.out',
          scrollTrigger: { trigger: title, start: 'top 90%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('.section-head__label, .section-head__aside').forEach((label) => {
        gsap.from(label, {
          y: 14,
          opacity: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: label, start: 'top 94%', once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-scroll-rise]').forEach((element) => {
        gsap.from(element, {
          y: 34,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 90%', once: true },
        });
      });
    });

    return () => context.revert();
  }, []);

  return null;
}
