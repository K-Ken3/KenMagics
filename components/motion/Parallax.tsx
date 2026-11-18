'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { getGsap, prefersReducedMotion } from '@/lib/motion/gsap';

type ParallaxProps = React.HTMLAttributes<HTMLDivElement> & { amount?: number };

export function Parallax({ children, className, amount = 12, ...props }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const tween = gsap.fromTo(
      element,
      { yPercent: -amount },
      {
        yPercent: amount,
        ease: 'none',
        scrollTrigger: { trigger: element.parentElement ?? element, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [amount]);

  return (
    <div ref={ref} className={clsx('parallax', className)} {...props}>
      {children}
    </div>
  );
}
