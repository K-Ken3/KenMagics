import Image from 'next/image';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { Parallax } from '@/components/motion/Parallax';
import { AnimatedNumber } from '@/components/motion/AnimatedNumber';
import { AccentText } from '@/components/ui/AccentText';
import type { About as AboutData, SiteSettings } from '@/lib/types';

export function About({ about, settings }: { about: AboutData; settings: SiteSettings }) {
  const content = settings.content;
  return (
    <section className="section about" id="about">
      <Container>
        <p className="label about__label">{content.aboutEyebrow}</p>
        <div className="grid-12 about__grid">
          <Reveal className="about__media" clip>
            <div className="about__frame">
              <Parallax amount={8}>
                <Image
                  src={about.photo}
                  alt={about.photoAlt}
                  width={900}
                  height={1125}
                  sizes="(max-width: 860px) 100vw, 40vw"
                  className="about__photo"
                  priority
                />
              </Parallax>
            </div>
            <p className="label about__caption">{content.aboutCaption} — {about.currentRole}</p>
          </Reveal>

          <div className="about__copy">
            <Reveal>
              <h2 className="about__headline">
                <AccentText text={content.aboutHeadline} />
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="about__bio">{about.bio}</p>
            </Reveal>
            <div className="about__details">
              <Reveal delay={0.12}>
                <p className="label">{content.disciplinesLabel}</p>
                <ul className="about__skills">
                  {about.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="label">{content.toolsLabel}</p>
                <p className="about__tools">{about.tools.join(' / ')}</p>
                {about.timeline.map((entry) => (
                  <div className="about__timeline" key={entry.period}>
                    <span className="label">{entry.period}</span>
                    <span>{entry.role}</span>
                    <span className="muted">{entry.detail}</span>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </div>

        <div className="stats">
          {settings.stats.map((stat, index) => {
            const numeric = Number.parseInt(stat.value, 10);
            const suffix = stat.value.replace(/[\d]/g, '');
            return (
              <Reveal className="stats__item" key={stat.label} delay={index * 0.05}>
                <AnimatedNumber value={Number.isNaN(numeric) ? 0 : numeric} suffix={suffix} className="stats__value" />
                <p className="label">{stat.label}</p>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
