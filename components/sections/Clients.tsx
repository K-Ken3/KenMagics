import { Container } from '@/components/ui/Container';
import { Marquee } from '@/components/motion/Marquee';
import type { Client, SiteSettings } from '@/lib/types';

/* TODO: replace typographic client names with supplied real logo files once available. */
export function Clients({ clients, settings }: { clients: Client[]; settings: SiteSettings }) {
  const content = settings.content;
  return (
    <section className="section section--tight clients" id="clients" aria-label="Clients and disciplines">
      <Container>
        <p className="label">{content.clientsEyebrow}</p>
        <p className="clients__intro">{content.clientsIntro}</p>
      </Container>
      <Marquee items={clients.map((client) => client.name)} separator={content.clientsSeparator} />
      <Marquee items={settings.disciplines} reverse separator={content.disciplinesSeparator} className="marquee--soft" />
    </section>
  );
}
