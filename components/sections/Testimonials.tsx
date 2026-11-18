'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { Testimonial } from '@/lib/types';

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = testimonials[active];
  if (!current) return null;

  const move = (direction: number) => setActive((index) => (index + direction + testimonials.length) % testimonials.length);

  return (
    <section className="section testimonials" id="testimonials">
      <SectionHeading
        index="06"
        label="Feedback"
        title={
          <>
            In their <span className="serif">words</span>.
          </>
        }
        aside={`${String(active + 1).padStart(2, '0')} / ${String(testimonials.length).padStart(2, '0')}`}
      />
      <Container>
        <div className="testimonials__stage" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current.id}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -18 }}
              transition={{ duration: reduced ? 0.18 : 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="testimonials__quote serif">“{current.quote}”</p>
              <footer className="testimonials__author">
                <span>{current.name}</span>
                <span className="muted">{[current.role, current.company].filter(Boolean).join(' · ')}</span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>
        <div className="testimonials__controls">
          <button type="button" onClick={() => move(-1)} aria-label="Previous testimonial">←</button>
          <button type="button" onClick={() => move(1)} aria-label="Next testimonial">→</button>
        </div>
      </Container>
    </section>
  );
}
