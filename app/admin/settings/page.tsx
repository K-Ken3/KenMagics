import { saveAbout, saveSettings, saveSiteCopy } from '../actions';
import { createClient } from '@/lib/supabase/server';
import { resolveSiteContent } from '@/lib/content/defaults';
import type { SiteContent } from '@/lib/types';

export const metadata = { title: 'Site & About — Admin' };

const str = (value: unknown) => String(value ?? '');

export default async function AdminSettings({ searchParams }: { searchParams: Promise<{ saved?: string }> }) {
  const { saved } = await searchParams;
  const supabase = await createClient();
  const [settingsResult, aboutResult] = supabase
    ? await Promise.all([
        supabase.from('site_settings').select('*').eq('id', 'default').maybeSingle(),
        supabase.from('about').select('*').eq('id', 'default').maybeSingle(),
      ])
    : [{ data: null }, { data: null }];
  const s = (settingsResult.data ?? {}) as Record<string, unknown>;
  const a = (aboutResult.data ?? {}) as Record<string, unknown>;
  const c = resolveSiteContent(s.content);

  const text = (name: keyof SiteContent, label: string) => (
    <label>
      <span className="label">{label}</span>
      <input name={name} defaultValue={c[name] as string} />
    </label>
  );
  const area = (name: keyof SiteContent, label: string, rows = 2) => (
    <label className="admin-span">
      <span className="label">{label}</span>
      <textarea name={name} rows={rows} defaultValue={c[name] as string} />
    </label>
  );
  const list = (name: keyof SiteContent, label: string, rows = 3) => (
    <label className="admin-span">
      <span className="label">{label}</span>
      <textarea name={name} rows={rows} defaultValue={(c[name] as string[]).join('\n')} />
    </label>
  );
  const group = (label: string) => (
    <p className="label admin-span admin-form__section">{label}</p>
  );

  return (
    <section className="admin-page">
      <header className="admin-head">
        <p className="label">Editorial</p>
        <h1 className="serif">Site &amp; About</h1>
      </header>
      {saved ? <p className="admin-success">Saved. The live site has been revalidated.</p> : null}

      <details className="admin-add" open>
        <summary>Hero, contact &amp; SEO</summary>
        <form className="admin-form" action={saveSettings}>
          <div className="admin-form__grid">
            <label><span className="label">Headline prefix</span><input name="heroHeadlinePrefix" defaultValue={str(s.hero_headline_prefix)} /></label>
            <label><span className="label">Headline accent</span><input name="heroHeadlineAccent" defaultValue={str(s.hero_headline_accent)} /></label>
            <label><span className="label">Headline suffix</span><input name="heroHeadlineSuffix" defaultValue={str(s.hero_headline_suffix)} /></label>
            <label><span className="label">Availability</span><input name="availabilityStatus" defaultValue={str(s.availability_status)} /></label>
            <label className="admin-span"><span className="label">Hero subtext</span><textarea name="heroSubtext" rows={3} defaultValue={str(s.hero_subtext)} /></label>
            <label><span className="label">Email</span><input type="email" name="email" defaultValue={str(s.email)} required /></label>
            <label><span className="label">WhatsApp</span><input name="whatsapp" defaultValue={str(s.whatsapp)} /></label>
            <label><span className="label">Location</span><input name="location" defaultValue={str(s.location)} /></label>
            <label className="admin-span"><span className="label">Socials (Label | URL per line)</span><textarea name="socials" rows={3} defaultValue={(s.socials as {label:string;url:string}[] ?? []).map((item) => `${item.label} | ${item.url}`).join('\n')} /></label>
            <label className="admin-span"><span className="label">Stats (Value | Label per line)</span><textarea name="stats" rows={4} defaultValue={(s.stats as {value:string;label:string}[] ?? []).map((item) => `${item.value} | ${item.label}`).join('\n')} /></label>
            <label className="admin-span"><span className="label">Disciplines (comma separated)</span><textarea name="disciplines" rows={3} defaultValue={(s.disciplines as string[] ?? []).join(', ')} /></label>
            <label><span className="label">SEO title</span><input name="seoTitle" defaultValue={str(s.seo_title)} /></label>
            <label><span className="label">OG image</span><input name="ogImage" defaultValue={str(s.og_image)} /></label>
            <label className="admin-span"><span className="label">SEO description</span><textarea name="seoDescription" rows={3} defaultValue={str(s.seo_description)} /></label>
          </div>
          <button className="button" type="submit">Save site settings</button>
        </form>
      </details>

      <details className="admin-add">
        <summary>About</summary>
        <form className="admin-form" action={saveAbout}>
          <div className="admin-form__grid">
            <label className="admin-span"><span className="label">Bio</span><textarea name="bio" rows={6} defaultValue={str(a.bio)} /></label>
            <label><span className="label">Photo URL</span><input name="photo" defaultValue={str(a.photo)} /></label>
            <label><span className="label">Photo alt</span><input name="photoAlt" defaultValue={str(a.photo_alt)} /></label>
            <label><span className="label">Current role</span><input name="currentRole" defaultValue={str(a.current_role)} /></label>
            <label><span className="label">Tools (comma separated)</span><input name="tools" defaultValue={(a.tools as string[] ?? []).join(', ')} /></label>
            <label><span className="label">Skills (one per line)</span><textarea name="skills" rows={4} defaultValue={(a.skills as string[] ?? []).join('\n')} /></label>
            <label className="admin-span"><span className="label">Timeline (Period | Role | Detail per line)</span><textarea name="timeline" rows={3} defaultValue={(a.timeline as {period:string;role:string;detail:string}[] ?? []).map((item) => `${item.period} | ${item.role} | ${item.detail}`).join('\n')} /></label>
          </div>
          <button className="button" type="submit">Save about</button>
        </form>
      </details>

      <details className="admin-add">
        <summary>Site copy — headlines, labels &amp; footer</summary>
        <form className="admin-form" action={saveSiteCopy}>
          <p className="admin-note">
            Wrap words in [brackets] to render them in the serif accent style. List fields use one entry per line.
          </p>
          <div className="admin-form__grid">
            {group('Navigation, header & footer')}
            {list('navLabels', 'Menu labels (one per line)', 4)}
            {text('tagline', 'Tagline')}
            {text('copyright', 'Copyright line')}
            {text('menuBrand', 'Menu brand line')}
            {text('headerWordmark', 'Header wordmark')}
            {text('headerWordmarkAccent', 'Header wordmark accent')}
            {text('preloaderWordmark', 'Preloader wordmark')}
            {text('preloaderTagline', 'Preloader tagline')}
            {text('preloaderStatus', 'Preloader status')}
            {text('footerGhost', 'Footer ghost word')}
            {text('footerTagline', 'Footer tagline')}
            {text('footerBackToTop', 'Back-to-top label')}

            {group('Hero & tickers')}
            {text('heroBadgeText', 'Rotating badge text')}
            {text('heroScrollLabel', 'Scroll label')}
            {list('tickerTop', 'Top ticker items (one per line)', 4)}
            {list('tickerBottom', 'Accent ticker items (one per line)', 3)}

            {group('Section copy')}
            {text('aboutEyebrow', 'About eyebrow')}
            {text('aboutCaption', 'About caption name')}
            {area('aboutHeadline', 'About headline')}
            {text('disciplinesLabel', 'Disciplines label')}
            {text('toolsLabel', 'Tools label')}
            {text('workEyebrow', 'Work eyebrow')}
            {area('workHeadline', 'Work headline')}
            {text('workAsideSuffix', 'Work aside suffix (e.g. projects)')}
            {text('servicesEyebrow', 'Services eyebrow')}
            {area('servicesHeadline', 'Services headline')}
            {text('servicesAside', 'Services aside')}
            {text('clientsEyebrow', 'Clients eyebrow')}
            {area('clientsIntro', 'Clients intro')}
            {text('clientsSeparator', 'Client separator')}
            {text('disciplinesSeparator', 'Disciplines separator')}
            {text('processEyebrow', 'Process eyebrow')}
            {area('processHeadline', 'Process headline')}
            {text('processAside', 'Process aside')}
            {text('testimonialsEyebrow', 'Testimonials eyebrow')}
            {area('testimonialsHeadline', 'Testimonials headline')}
            {text('contactEyebrow', 'Contact eyebrow')}
            {area('contactHeadline', 'Contact headline')}
            {text('contactAside', 'Contact aside')}

            {group('Contact form')}
            {text('contactEmailLabel', 'Email label')}
            {text('contactWhatsappLabel', 'WhatsApp label')}
            {text('contactLocationLabel', 'Location label')}
            {text('contactSubmitLabel', 'Submit button label')}
            {text('contactResponse', 'Response note')}
            {area('contactNote', 'Intro note')}
            {list('contactServices', 'Service options (one per line)', 5)}
            {list('contactBudgets', 'Budget options (one per line)', 3)}

            {group('Case study page')}
            {text('caseStudyLabel', 'Case-study eyebrow label')}
            {text('caseStudyNotesLabel', 'Notes heading')}
            {text('caseStudyNextLabel', 'Next-project label')}
            {text('caseStudyLiveLabel', 'Live-link label')}
            {text('caseStudyClientLabel', 'Client label')}
            {text('caseStudyYearLabel', 'Year label')}
            {text('caseStudyRoleLabel', 'Role label')}
            {text('caseStudyTagsLabel', 'Tags label')}
            {text('caseStudyGalleryLabel', 'Gallery label')}
            {text('caseStudyOverviewLabel', 'Overview heading')}
            {text('caseStudyChallengeLabel', 'Challenge heading')}
            {text('caseStudyApproachLabel', 'Approach heading')}
            {text('caseStudyOutcomeLabel', 'Outcome heading')}
          </div>
          <button className="button" type="submit">Save site copy</button>
        </form>
      </details>
    </section>
  );
}
