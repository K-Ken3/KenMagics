import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/motion/Reveal';
import { PageTransition } from '@/components/motion/PageTransition';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { Header } from '@/components/sections/Header';
import { Footer } from '@/components/sections/Footer';
import { VideoBlock } from '@/components/sections/VideoBlock';
import { TransitionLink } from '@/components/motion/TransitionLink';
import { getPortfolio } from '@/lib/data/get-portfolio';
import { legacyPortfolio } from '@/lib/data/portfolio';

type PageProps = { params: Promise<{ slug: string }> };

// Build-time slugs from the inherited dataset; new admin projects are
// generated on demand because dynamicParams is enabled by default.
const publishedSlugs = legacyPortfolio.projects
  .filter((project) => project.status === 'published')
  .map((project) => project.slug);

export function generateStaticParams() {
  return publishedSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { projects } = await getPortfolio();
  const project = projects.find((item) => item.slug === slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary, images: [project.coverImage] },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const { projects, settings } = await getPortfolio();
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();
  const index = projects.findIndex((item) => item.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <SmoothScroll />
      <Header email={settings.email} />
      <PageTransition>
        <main id="main">
          <Container className="case-hero">
            <p className="label">
              {String(index + 1).padStart(2, '0')} / Case study — {project.category}
            </p>
            <h1 className="case-hero__title">{project.title}</h1>
            <p className="lede">{project.summary}</p>
            <div className="case-meta">
              <div><p className="label">Client</p><p>{project.client ?? 'Self-directed'}</p></div>
              <div><p className="label">Year</p><p>{project.year}</p></div>
              <div><p className="label">Role</p><p>{project.role ?? 'Design & build'}</p></div>
              <div><p className="label">Tags</p><p>{project.tags.slice(0, 3).join(' / ')}</p></div>
            </div>
          </Container>

          <Container className="section section--tight">
            <Reveal clip>
              <div className="case-cover">
                <Image src={project.coverImage} alt={project.coverAlt} fill sizes="100vw" priority />
              </div>
            </Reveal>
          </Container>

          <Container className="section section--tight">
            <div className="case-body">
              <p className="label case-body__heading">Project notes</p>
              <div className="case-body__copy">
                {project.longDescription ? (
                  <section>
                    <h2>Overview</h2>
                    <p>{project.longDescription}</p>
                  </section>
                ) : null}
                {project.challenge ? (
                  <section><h2>Challenge</h2><p>{project.challenge}</p></section>
                ) : null}
                {project.solution ? (
                  <section><h2>Approach</h2><p>{project.solution}</p></section>
                ) : null}
                {project.impact ? (
                  <section><h2>Outcome</h2><p>{project.impact}</p></section>
                ) : null}
                {project.externalLink && project.externalLink !== '#' ? (
                  <a className="button" href={project.externalLink} target="_blank" rel="noopener noreferrer">
                    Launch live application <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
              </div>
            </div>
          </Container>

          {project.gallery.length ? (
            <Container className="section section--tight">
              <p className="label" style={{ marginBottom: 32 }}>Gallery</p>
              <div className="case-gallery">
                {project.gallery.map((item) =>
                  item.type === 'video' && item.url.endsWith('.mp4') ? (
                    <VideoBlock key={item.id} src={item.url} poster={item.poster} caption={item.caption} />
                  ) : (
                    <figure key={item.id}>
                      <div className="case-cover" style={{ aspectRatio: project.aspectRatio ?? '16 / 9' }}>
                        <Image src={item.url} alt={item.alt ?? item.caption ?? project.title} fill sizes="(max-width: 700px) 100vw, 50vw" />
                      </div>
                      {item.caption ? <figcaption className="label" style={{ marginTop: 12 }}>{item.caption}</figcaption> : null}
                    </figure>
                  ),
                )}
              </div>
            </Container>
          ) : null}

          <Container className="section section--tight">
            <hr className="hairline" />
            <div className="work__meta" style={{ marginTop: 36 }}>
              <p className="label">Next project</p>
              {next ? (
                <TransitionLink href={`/work/${next.slug}`} className="link-sweep" data-cursor="Next">
                  {next.title} ↗
                </TransitionLink>
              ) : null}
            </div>
          </Container>
        </main>
        <Footer settings={settings} />
      </PageTransition>
    </>
  );
}
