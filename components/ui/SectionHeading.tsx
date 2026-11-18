import { Container } from './Container';

type SectionHeadingProps = {
  eyebrow: string;
  title: React.ReactNode;
  aside?: string;
};

const tones = ['sage', 'clay', 'slate'] as const;

export function SectionHeading({ eyebrow, title, aside }: SectionHeadingProps) {
  const numericIndex = Number.parseInt(eyebrow, 10);
  const toneIndex = Number.isNaN(numericIndex) ? 0 : (((numericIndex - 1) % tones.length) + tones.length) % tones.length;
  const tone = tones[toneIndex];

  return (
    <Container>
      <header className={`section-head section-head--${tone}`}>
        <p className="label section-head__label">{eyebrow}</p>
        <h2 className="section-head__title">{title}</h2>
        {aside ? <p className="section-head__aside">{aside}</p> : null}
      </header>
    </Container>
  );
}
