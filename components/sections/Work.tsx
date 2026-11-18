'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { AccentText } from '@/components/ui/AccentText';
import { getGsap, isTouch, prefersReducedMotion } from '@/lib/motion/gsap';
import type { Project, SiteContent } from '@/lib/types';

export function Work({ projects, content }: { projects: Project[]; content: SiteContent }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const drag = useRef({ x: 0, left: 0 });

  const scrollToIndex = useCallback((index: number) => {
    const element = track.current;
    if (!element) return;
    const child = element.children[index] as HTMLElement | undefined;
    if (!child) return;
    element.scrollTo({ left: child.offsetLeft - element.offsetLeft, behavior: 'smooth' });
    setActive(index);
  }, []);

  const onScroll = () => {
    const element = track.current;
    if (!element) return;
    const children = Array.from(element.children) as HTMLElement[];
    const nearest = children.reduce(
      (best, child, index) =>
        Math.abs(child.offsetLeft - element.offsetLeft - element.scrollLeft) < best.distance
          ? { index, distance: Math.abs(child.offsetLeft - element.offsetLeft - element.scrollLeft) }
          : best,
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );
    setActive(nearest.index);
    const max = element.scrollWidth - element.clientWidth;
    setProgress(max > 0 ? Math.min(1, Math.max(0, element.scrollLeft / max)) : 0);
  };

  useEffect(() => {
    const element = track.current;
    if (!element || isTouch() || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const cleanups: Array<() => void> = [];

    Array.from(element.querySelectorAll<HTMLElement>('.work__card')).forEach((card) => {
      const image = card.querySelector<HTMLElement>('.work__image');
      if (!image) return;
      const rotateX = gsap.quickTo(image, 'rotationX', { duration: 0.7, ease: 'power3.out' });
      const rotateY = gsap.quickTo(image, 'rotationY', { duration: 0.7, ease: 'power3.out' });

      const onMove = (event: PointerEvent) => {
        if (event.buttons !== 0) return;
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        rotateY((px - 0.5) * 7);
        rotateX((0.5 - py) * 7);
      };
      const onLeave = () => {
        rotateX(0);
        rotateY(0);
      };

      card.addEventListener('pointermove', onMove);
      card.addEventListener('pointerleave', onLeave);
      cleanups.push(() => {
        card.removeEventListener('pointermove', onMove);
        card.removeEventListener('pointerleave', onLeave);
        gsap.killTweensOf(image);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [projects.length]);

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') scrollToIndex(Math.min(active + 1, projects.length - 1));
      if (event.key === 'ArrowLeft') scrollToIndex(Math.max(active - 1, 0));
    };
    element.addEventListener('keydown', onKey);
    return () => element.removeEventListener('keydown', onKey);
  }, [active, projects.length, scrollToIndex]);

  return (
    <section className="section work" id="work">
      <SectionHeading
        eyebrow={content.workEyebrow}
        title={<AccentText text={content.workHeadline} />}
        aside={`${String(projects.length).padStart(2, '0')} ${content.workAsideSuffix}`}
      />
      <Reveal>
        <div
          ref={track}
          className={`work__track${dragging ? ' work__track--dragging' : ''}`}
          onScroll={onScroll}
          tabIndex={0}
          role="region"
          aria-label="Selected projects, use arrow keys to browse"
          onPointerDown={(event) => {
            if (event.pointerType === 'touch') return;
            setDragging(true);
            drag.current = { x: event.clientX, left: track.current?.scrollLeft ?? 0 };
            track.current?.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!dragging || !track.current) return;
            track.current.scrollLeft = drag.current.left - (event.clientX - drag.current.x);
          }}
          onPointerUp={(event) => {
            setDragging(false);
            track.current?.releasePointerCapture(event.pointerId);
          }}
          onPointerCancel={() => setDragging(false)}
        >
          {projects.map((project, index) => (
            <article className="work__card" key={project.id}>
              <TransitionLink href={`/work/${project.slug}`} className="work__link" data-cursor="View" draggable={false}>
                <div className="work__image">
                  <Image
                    src={project.coverImage}
                    alt={project.coverAlt}
                    fill
                    sizes="(max-width: 700px) 86vw, (max-width: 1200px) 58vw, 44vw"
                    className="work__img"
                    draggable={false}
                  />
                  <span className="work__index label">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="work__meta">
                  <h3>{project.title}</h3>
                  <p className="label">
                    {project.category} — {project.year}
                  </p>
                </div>
              </TransitionLink>
            </article>
          ))}
        </div>
      </Reveal>

      <div className="work__progress" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress})` }} />
      </div>

      <Container className="work__controls">
        <p className="label work__counter" aria-live="polite">
          {String(active + 1).padStart(2, '0')} <span>/</span> {String(projects.length).padStart(2, '0')}
        </p>
        <div className="work__buttons">
          <button type="button" onClick={() => scrollToIndex(Math.max(active - 1, 0))} aria-label="Previous project">
            ←
          </button>
          <button type="button" onClick={() => scrollToIndex(Math.min(active + 1, projects.length - 1))} aria-label="Next project">
            →
          </button>
        </div>
      </Container>
    </section>
  );
}
