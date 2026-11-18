import { Preloader } from '@/components/motion/Preloader';
import { SmoothScroll } from '@/components/motion/SmoothScroll';
import { CustomCursor } from '@/components/motion/CustomCursor';
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
      <Preloader />
      <CustomCursor />
      <Header email={settings.email} />
      <PageTransition>
        <main id="main">
          <Hero settings={settings} />
          <About about={about} settings={settings} />
          <Work projects={visibleProjects} />
          <Services services={visibleServices} />
          <Clients clients={clients} settings={settings} />
          <Process steps={process} />
          <Testimonials testimonials={testimonials} />
          <Contact settings={settings} translations={translations} />
        </main>
        <Footer settings={settings} />
      </PageTransition>
    </>
  );
}
