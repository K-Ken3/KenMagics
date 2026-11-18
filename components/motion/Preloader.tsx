'use client';

import { useEffect, useRef, useState } from 'react';
import { getGsap, prefersReducedMotion } from '@/lib/motion/gsap';

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem('kd-intro-seen') || prefersReducedMotion()) {
      setVisible(false);
      return;
    }
    const { gsap } = getGsap();
    const counter = { value: 0 };
    // Safety net: if the animation frame loop is paused (background tab,
    // reduced battery mode, automation), never leave the intro over the page.
    const fallback = window.setTimeout(() => setVisible(false), 2600);
    const tween = gsap.to(counter, {
      value: 100,
      duration: 1.1,
      ease: 'power3.inOut',
      onUpdate: () => setCount(Math.round(counter.value)),
      onComplete: () => {
        setLeaving(true);
        sessionStorage.setItem('kd-intro-seen', '1');
        if (!root.current) {
          setVisible(false);
          return;
        }
        gsap.to(root.current, {
          yPercent: -100,
          duration: 0.8,
          ease: 'expo.inOut',
          delay: 0.15,
          onComplete: () => setVisible(false),
        });
      },
    });
    return () => {
      window.clearTimeout(fallback);
      tween.kill();
    };
  }, []);

  if (!visible) return null;

  return (
    <div ref={root} className={`preloader${leaving ? ' preloader--leaving' : ''}`} aria-hidden="true">
      <div className="preloader__inner shell">
        <p className="label">KenDesigns / Design · Digital · Motion</p>
        <p className="preloader__mark serif">Ken.</p>
        <div className="preloader__foot">
          <span className="label">Loading portfolio</span>
          <span className="preloader__count">{String(count).padStart(3, '0')}</span>
        </div>
      </div>
    </div>
  );
}
