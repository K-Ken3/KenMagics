'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { LogoMark } from '@/components/ui/LogoMark';

export const NAVIGATE_EVENT = 'kd:navigate';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const reduced = useReducedMotion();
  const [covered, setCovered] = useState(false);

  useEffect(() => {
    const onNavigate = (event: Event) => {
      const href = (event as CustomEvent<string>).detail;
      if (!href || href === pathname) return;
      if (reduced) {
        router.push(href);
        return;
      }
      setCovered(true);
      window.setTimeout(() => router.push(href), 420);
    };
    window.addEventListener(NAVIGATE_EVENT, onNavigate);
    return () => window.removeEventListener(NAVIGATE_EVENT, onNavigate);
  }, [pathname, reduced, router]);

  useEffect(() => {
    const timer = window.setTimeout(() => setCovered(false), 80);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence>
        {covered ? (
          <motion.div
            className="transition-wipe"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            aria-hidden="true"
          >
            <LogoMark className="transition-wipe__logo" />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        key={pathname}
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0.2 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
