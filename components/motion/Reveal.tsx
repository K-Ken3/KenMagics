'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { getGsap, prefersReducedMotion } from '@/lib/motion/gsap';

type RevealProps = React.HTMLAttributes<HTMLDivElement> & {
  y?: number;
  delay?: number;
  clip?: boolean;
};

export function Reveal({ children, className, y = 36, delay = 0, clip = false, ...props }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (prefersReducedMotion()) {
      element.style.opacity = '1';
      return;
    }
    const { gsap } = getGsap();
    const tween = gsap.fromTo(
      element,
      { opacity: 0, y, clipPath: clip ? 'inset(0 0 100% 0)' : 'none' },
      {
        opacity: 1,
        y: 0,
        clipPath: clip ? 'inset(0 0 0% 0)' : 'none',
        duration: 0.85,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: element, start: 'top 88%', once: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [y, delay, clip]);

  return (
    <div ref={ref} data-reveal className={clsx('reveal', className)} {...props}>
      {children}
    </div>
  );
}
