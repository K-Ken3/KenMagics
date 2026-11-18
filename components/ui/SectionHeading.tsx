import { Container } from './Container';

type SectionHeadingProps = {
  index: string;
  label: string;
  title: React.ReactNode;
  aside?: string;
};

const tones = ['sage', 'clay', 'slate'] as const;

export function SectionHeading({ index, label, title, aside }: SectionHeadingProps) {
  const numericIndex = Number.parseInt(index, 10);
  const toneIndex = Number.isNaN(numericIndex) ? 0 : (((numericIndex - 1) % tones.length) + tones.length) % tones.length;
  const tone = tones[toneIndex];

  return (
    <Container>
      <header className={`section-head section-head--${tone}`}>
        <p className="label section-head__label">
          <span className="section-head__index">{index}</span> / {label}
        </p>
        <h2 className="section-head__title">{title}</h2>
        {aside ? <p className="section-head__aside">{aside}</p> : null}
      </header>
    </Container>
  );
}
