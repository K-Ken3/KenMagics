import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { AccentText } from '@/components/ui/AccentText';
import type { ProcessStep, SiteContent } from '@/lib/types';

export function Process({ steps, content }: { steps: ProcessStep[]; content: SiteContent }) {
  return (
    <section className="section process" id="process">
      <SectionHeading
        eyebrow={content.processEyebrow}
        title={<AccentText text={content.processHeadline} />}
        aside={content.processAside}
      />
      <Container>
        <div className="process__grid">
          {steps.map((step, index) => (
            <Reveal className="process__step" key={step.id} delay={index * 0.06}>
              <span className="process__number serif">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <ul className="process__deliverables">
                {step.deliverables.map((item) => (
                  <li className="label" key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
