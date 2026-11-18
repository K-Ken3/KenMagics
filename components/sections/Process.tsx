import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import type { ProcessStep } from '@/lib/types';

export function Process({ steps }: { steps: ProcessStep[] }) {
  return (
    <section className="section process" id="process">
      <SectionHeading
        index="05"
        label="Process"
        title={
          <>
            A clear way <span className="serif">through</span>.
          </>
        }
        aside="Four steps, no theatre"
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
