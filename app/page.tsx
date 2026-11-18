import { Container } from '@/components/ui/Container';

export default function Home() {
  return (
    <main id="main">
      <section className="section" style={{ minHeight: '100svh', display: 'grid', alignItems: 'center' }}>
        <Container>
          <p className="label">KenDesigns / Design · Digital · Motion</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-hero)', letterSpacing: '-0.06em', lineHeight: 0.86, marginBlock: '0.4em' }}>
            Design, digital and <span className="serif">motion</span>.
          </h1>
          <p className="lede">Design system foundation in place.</p>
        </Container>
      </section>
    </main>
  );
}
