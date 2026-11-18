'use client';

import { useEffect, useRef, useState } from 'react';
import { getGsap, isTouch, prefersReducedMotion } from '@/lib/motion/gsap';
import { LogoMark } from '@/components/ui/LogoMark';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState('');
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouch() || prefersReducedMotion()) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const host = cursor.current;
    if (!host) return;

    const { gsap } = getGsap();
    const mark = host.querySelector<HTMLElement>('.cursor__mark');
    const ring = host.querySelector<HTMLElement>('.cursor__ring');
    if (!mark || !ring) return;

    document.body.classList.add('data-cursor-hidden');

    const markX = gsap.quickTo(mark, 'x', { duration: 0.16, ease: 'power3.out' });
    const markY = gsap.quickTo(mark, 'y', { duration: 0.16, ease: 'power3.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.6, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.6, ease: 'power3.out' });

    let raf = 0;
    let nextLabel = '';
    const applyLabel = () => {
      setLabel(nextLabel);
      raf = 0;
    };

    const onMove = (event: PointerEvent) => {
      markX(event.clientX);
      markY(event.clientY);
      ringX(event.clientX);
      ringY(event.clientY);
      setVisible(true);
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-cursor]');
      const value = target?.dataset.cursor ?? '';
      if (value !== nextLabel) {
        nextLabel = value;
        if (!raf) raf = requestAnimationFrame(applyLabel);
      }
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      setVisible(false);
      setPressed(false);
      nextLabel = '';
      if (!raf) raf = requestAnimationFrame(applyLabel);
    };
    const onEnter = () => setVisible(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);

    return () => {
      document.body.classList.remove('data-cursor-hidden');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursor}
      className={`cursor${visible ? ' cursor--visible' : ''}${pressed ? ' cursor--press' : ''}${
        label ? ' cursor--active' : ''
      }`}
      aria-hidden="true"
    >
      <span className="cursor__ring">
        <span className="cursor__orbit" />
        <span className="cursor__label">{label}</span>
      </span>
      <span className="cursor__mark">
        <span className="cursor__mark-tilt">
          <LogoMark className="cursor__logo" sizes="24px" />
        </span>
      </span>
    </div>
  );
}
