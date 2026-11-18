'use client';

import { useEffect, useRef } from 'react';
import clsx from 'clsx';
import { getGsap, prefersReducedMotion } from '@/lib/motion/gsap';

type SplitTextProps = {
  lines: string[];
  accentLine?: number;
  className?: string;
  delay?: number;
  trigger?: 'mount' | 'scroll';
};

export function SplitText({ lines, accentLine, className, delay = 0, trigger = 'mount' }: SplitTextProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (prefersReducedMotion()) {
      element.querySelectorAll<HTMLElement>('.split-word').forEach((word) => {
        word.style.transform = 'none';
      });
      return;
    }
    const { gsap } = getGsap();
    const words = element.querySelectorAll<HTMLElement>('.split-word');
    const tween = gsap.to(words, {
      yPercent: 0,
      duration: 1.05,
      delay,
      stagger: 0.035,
      ease: 'expo.out',
      ...(trigger === 'scroll' ? { scrollTrigger: { trigger: element, start: 'top 85%', once: true } } : {}),
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [delay, trigger]);

  return (
    <h1 ref={ref} className={clsx('split-text', className)}>
      {lines.map((line, lineIndex) => (
        <span className="split-line" key={`${line}-${lineIndex}`}>
          {line.split(' ').map((word, wordIndex, all) => (
            <span
              className={clsx('split-word', lineIndex === accentLine && 'serif')}
              key={`${word}-${wordIndex}`}
              style={{ marginRight: wordIndex === all.length - 1 ? 0 : '0.24em' }}
            >
              {word}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}
