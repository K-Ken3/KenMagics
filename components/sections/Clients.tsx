import { Container } from '@/components/ui/Container';
import { Marquee } from '@/components/motion/Marquee';
import type { Client, SiteSettings } from '@/lib/types';

/* TODO: replace typographic client names with supplied real logo files once available. */
export function Clients({ clients, settings }: { clients: Client[]; settings: SiteSettings }) {
  return (
    <section className="section section--tight clients" id="clients" aria-label="Clients and disciplines">
      <Container>
        <p className="label">04 / Clients</p>
        <p className="clients__intro">Brands and collaborators I have worked with.</p>
      </Container>
      <Marquee items={clients.map((client) => client.name)} separator="·" />
      <Marquee items={settings.disciplines} reverse separator="✦" className="marquee--soft" />
    </section>
  );
}
