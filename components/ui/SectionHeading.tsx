import { Container } from './Container';

type SectionHeadingProps = {
  index: string;
  label: string;
  title: React.ReactNode;
  aside?: string;
};

export function SectionHeading({ index, label, title, aside }: SectionHeadingProps) {
  return (
    <Container>
      <header className="section-head">
        <p className="label section-head__label">
          {index} / {label}
        </p>
        <h2 className="section-head__title">{title}</h2>
        {aside ? <p className="section-head__aside">{aside}</p> : null}
      </header>
    </Container>
  );
}
