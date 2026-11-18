'use client';

import { useEffect, useRef, useState } from 'react';
import { LogoMark } from '@/components/ui/LogoMark';
import { getGsap, prefersReducedMotion } from '@/lib/motion/gsap';
import type { SiteSettings } from '@/lib/types';

export function Preloader({ settings }: { settings: SiteSettings }) {
  const content = settings.content;
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

    if (root.current) {
      gsap.from(root.current.querySelector('.preloader__logo'), {
        scale: 0.72,
        rotate: -14,
        opacity: 0,
        duration: 1.1,
        ease: 'expo.out',
      });
      gsap.from(root.current.querySelectorAll('.preloader__word span'), {
        yPercent: 120,
        opacity: 0,
        duration: 0.9,
        delay: 0.12,
        stagger: 0.035,
        ease: 'expo.out',
      });
    }

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
        <p className="label">{content.preloaderTagline}</p>
        <div className="preloader__stage">
          <LogoMark className="preloader__logo" priority />
          <p className="preloader__word">
            {content.preloaderWordmark.split('').map((letter, index) => (
              <span key={`${letter}-${index}`}>{letter}</span>
            ))}
          </p>
        </div>
        <div className="preloader__foot">
          <span className="label">{content.preloaderStatus}</span>
          <span className="preloader__count">{String(count).padStart(3, '0')}</span>
        </div>
        <div className="preloader__bar">
          <span style={{ transform: `scaleX(${count / 100})` }} />
        </div>
      </div>
    </div>
  );
}
