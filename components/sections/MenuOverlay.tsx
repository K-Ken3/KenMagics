'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { navigation } from '@/lib/navigation';

type MenuOverlayProps = { open: boolean; onClose: () => void };

export function MenuOverlay({ open, onClose }: MenuOverlayProps) {
  const firstLink = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstLink.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const focusable = document.querySelectorAll<HTMLElement>('#site-menu a, #site-menu button');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          id="site-menu"
          className="menu"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          initial={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          animate={reduced ? { opacity: 1 } : { clipPath: 'inset(0 0 0% 0)' }}
          exit={reduced ? { opacity: 0 } : { clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: reduced ? 0.2 : 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="menu__top shell">
            <span className="label">KARASIRA Ken / Creative Studio</span>
            <button type="button" className="menu__close" onClick={onClose} aria-label="Close menu">
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav className="menu__nav shell" aria-label="Primary">
            {navigation.map((item, index) => (
              <motion.div
                key={item.href}
                initial={reduced ? { opacity: 0 } : { y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: reduced ? 0 : 0.18 + index * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link ref={index === 0 ? firstLink : undefined} href={item.href} className="menu__link" onClick={onClose}>
                  <span className="menu__index">{item.index}</span>
                  <span className="menu__label serif">{item.label}</span>
                  <span className="menu__arrow" aria-hidden="true">↗</span>
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="menu__foot shell label">
            <span>Kigali, Rwanda</span>
            <span>© 2026 Ken Karasira</span>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
