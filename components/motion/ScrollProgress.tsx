'use client';

import { useEffect, useRef } from 'react';
import { getGsap, prefersReducedMotion } from '@/lib/motion/gsap';

export function ScrollProgress() {
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = bar.current;
    if (!element || prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => gsap.set(element, { scaleX: self.progress }),
    });
    return () => trigger.kill();
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={bar} />
    </div>
  );
}
