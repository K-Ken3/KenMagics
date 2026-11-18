import { Preloader } from '@/components/motion/Preloader';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { CustomCursor } from '@/components/motion/CustomCursor';
import { ScrollProgress } from '@/components/motion/ScrollProgress';
import { ScrollFX } from '@/components/motion/ScrollFX';
import { Grain } from '@/components/motion/Grain';
import { KineticTicker } from '@/components/motion/KineticTicker';
import { PageTransition } from '@/components/motion/PageTransition';
import { Header } from '@/components/sections/Header';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Work } from '@/components/sections/Work';
import { Services } from '@/components/sections/Services';
import { Clients } from '@/components/sections/Clients';
import { Process } from '@/components/sections/Process';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';
import { getPortfolio } from '@/lib/data/get-portfolio';

export default async function Home() {
  const { projects, services, clients, about, testimonials, process, settings, translations } = await getPortfolio();
  const visibleProjects = projects.filter((project) => project.status === 'published');
  const visibleServices = services.filter((service) => service.status === 'published' && service.locale === 'en');

  return (
    <>
      <SmoothScroll />
      <Preloader settings={settings} />
      <CustomCursor />
      <ScrollProgress />
      <ScrollFX />
      <Grain />
      <Header settings={settings} />
      <PageTransition>
        <main id="main">
          <Hero settings={settings} />
          <KineticTicker
            className="k-ticker--band"
            items={settings.content.tickerTop}
            speed={26}
          />
          <About about={about} settings={settings} />
          <Work projects={visibleProjects} content={settings.content} />
          <Services services={visibleServices} content={settings.content} />
          <Clients clients={clients} settings={settings} />
          <Process steps={process} content={settings.content} />
          <Testimonials testimonials={testimonials} content={settings.content} />
          <KineticTicker
            className="k-ticker--accent"
            items={settings.content.tickerBottom}
            speed={32}
            reverse
          />
          <Contact settings={settings} translations={translations} />
        </main>
        <Footer settings={settings} />
      </PageTransition>
    </>
  );
}
