'use client';

import { useEffect, useRef } from 'react';
import { getGsap, isTouch, prefersReducedMotion } from '@/lib/motion/gsap';

type MagneticProps = {
  children: React.ReactElement;
  strength?: number;
};

export function Magnetic({ children, strength = 0.28 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host || isTouch() || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const child = host.firstElementChild as HTMLElement;
    if (!child) return;
    const moveX = gsap.quickTo(child, 'x', { duration: 0.5, ease: 'power3.out' });
    const moveY = gsap.quickTo(child, 'y', { duration: 0.5, ease: 'power3.out' });
    const onMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      moveX((event.clientX - rect.left - rect.width / 2) * strength);
      moveY((event.clientY - rect.top - rect.height / 2) * strength);
    };
    const onLeave = () => {
      moveX(0);
      moveY(0);
    };
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    return () => {
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [strength]);

  return (
    <span ref={ref} className="magnetic">
      {children}
    </span>
  );
}
