'use client';

import { useEffect, useRef, useState } from 'react';
import { getGsap, isTouch, prefersReducedMotion } from '@/lib/motion/gsap';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouch() || prefersReducedMotion()) return;
    setEnabled(true);
    document.body.classList.add('data-cursor-hidden');

    const { gsap } = getGsap();
    const moveX = gsap.quickTo(cursor.current, 'x', { duration: 0.28, ease: 'power3.out' });
    const moveY = gsap.quickTo(cursor.current, 'y', { duration: 0.28, ease: 'power3.out' });
    const onMove = (event: PointerEvent) => {
      moveX(event.clientX);
      moveY(event.clientY);
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-cursor]');
      setLabel(target?.dataset.cursor ?? '');
    };
    const onLeave = () => setLabel('');
    window.addEventListener('pointermove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.body.classList.remove('data-cursor-hidden');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={cursor} className={`cursor${label ? ' cursor--active' : ''}`} aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__label">{label}</span>
    </div>
  );
}
