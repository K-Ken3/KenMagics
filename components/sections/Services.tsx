'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import type { Service } from '@/lib/types';

export function Services({ services }: { services: Service[] }) {
  const [expanded, setExpanded] = useState<string | null>(services[0]?.id ?? null);

  return (
    <section className="section services" id="services">
      <SectionHeading
        index="03"
        label="Services"
        title={
          <>
            What I do, <span className="serif">precisely</span>.
          </>
        }
        aside="Design · Digital · Motion"
      />
      <Container>
        <div className="services__list">
          {services.map((service, index) => {
            const open = expanded === service.id;
            return (
              <Reveal key={service.id} delay={index * 0.03}>
                <div className={`services__row${open ? ' services__row--open' : ''}`}>
                  <button
                    type="button"
                    className="services__head"
                    onClick={() => setExpanded(open ? null : service.id)}
                    aria-expanded={open}
                    aria-controls={`service-${service.id}`}
                  >
                    <span className="label">{String(index + 1).padStart(2, '0')}</span>
                    <span className="services__title">{service.title}</span>
                    <span className="services__metric label">{service.metric}</span>
                    <span className="services__toggle" aria-hidden="true">{open ? '−' : '+'}</span>
                  </button>
                  <div id={`service-${service.id}`} className="services__body" hidden={!open}>
                    <p>{service.description}</p>
                    <ul className="services__bullets">
                      {service.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                    <ul className="services__tags">
                      {service.tags.map((tag) => (
                        <li className="label" key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
