'use client';

import { useEffect, useRef, useState } from 'react';
import { getGsap, prefersReducedMotion } from '@/lib/motion/gsap';

type AnimatedNumberProps = {
  value: number;
  suffix?: string;
  className?: string;
  trigger?: 'mount' | 'scroll';
};

export function AnimatedNumber({ value, suffix = '', className, trigger = 'scroll' }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (prefersReducedMotion()) {
      setShown(value);
      return;
    }
    const { gsap } = getGsap();
    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value,
      duration: 1.2,
      ease: 'power2.out',
      onUpdate: () => setShown(Math.round(counter.value)),
      ...(trigger === 'scroll' ? { scrollTrigger: { trigger: element, start: 'top 90%', once: true } } : {}),
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [value, trigger]);

  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  );
}
