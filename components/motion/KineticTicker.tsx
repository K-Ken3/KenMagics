'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { getGsap, prefersReducedMotion } from '@/lib/motion/gsap';

type KineticTickerProps = {
  items: string[];
  speed?: number;
  reverse?: boolean;
  className?: string;
};

export function KineticTicker({ items, speed = 28, reverse = false, className }: KineticTickerProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = root.current;
    if (!host || prefersReducedMotion()) return;
    const { gsap, ScrollTrigger } = getGsap();
    const track = host.querySelector<HTMLElement>('.k-ticker__track');
    if (!track) return;

    gsap.set(track, { xPercent: reverse ? -50 : 0 });
    const tween = gsap.to(track, {
      xPercent: reverse ? 0 : -50,
      duration: speed,
      ease: 'none',
      repeat: -1,
    });

    const trigger = ScrollTrigger.create({
      trigger: host,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        const velocity = self.getVelocity();
        tween.timeScale(gsap.utils.clamp(0.4, 3.4, 1 + Math.abs(velocity) / 3200));
        gsap.to(track, {
          skewX: gsap.utils.clamp(-7, 7, velocity / 360),
          duration: 0.45,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      },
    });

    let settleTimer = 0;
    const settle = () => {
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        tween.timeScale(1);
        gsap.to(track, { skewX: 0, duration: 0.65, ease: 'power2.out', overwrite: 'auto' });
      }, 160);
    };
    ScrollTrigger.addEventListener('scrollEnd', settle);

    return () => {
      window.clearTimeout(settleTimer);
      ScrollTrigger.removeEventListener('scrollEnd', settle);
      trigger.kill();
      tween.kill();
    };
  }, [reverse, speed]);

  return (
    <div ref={root} className={clsx('k-ticker', className)} aria-hidden="true">
      <div className="k-ticker__track">
        {[0, 1].map((copy) => (
          <div className="k-ticker__group" key={copy}>
            {items.map((item, index) => (
              <span className="k-ticker__item" key={`${copy}-${item}-${index}`}>
                {item}
                <span className="k-ticker__star">✺</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
