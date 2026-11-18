'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Magnetic } from '@/components/motion/Magnetic';
import { AccentText } from '@/components/ui/AccentText';
import type { SiteSettings, Translations } from '@/lib/types';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export function Contact({ settings, translations }: { settings: SiteSettings; translations: Translations }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const content = settings.content;
  const en = translations.en as { contact?: Record<string, string> };
  const sentLabel = en.contact?.sentSuccess ?? 'Message sent.';

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setError('');
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error((await response.json()).error ?? 'Something went wrong.');
      setStatus('sent');
      form.reset();
    } catch (caught) {
      setStatus('error');
      setError(caught instanceof Error ? caught.message : 'Something went wrong.');
    }
  }

  return (
    <section className="section contact" id="contact">
      <SectionHeading
        eyebrow={content.contactEyebrow}
        title={<AccentText text={content.contactHeadline} />}
        aside={content.contactAside}
      />
      <Container className="contact__grid">
        <div className="contact__details">
          <div>
            <p className="label">{content.contactEmailLabel}</p>
            <a className="contact__big link-sweep" href={`mailto:${settings.email}`}>{settings.email}</a>
          </div>
          <div>
            <p className="label">{content.contactWhatsappLabel}</p>
            <a
              className="link-sweep"
              href={`https://wa.me/${settings.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              +{settings.whatsapp}
            </a>
          </div>
          <div>
            <p className="label">{content.contactLocationLabel}</p>
            <p>{settings.location}</p>
          </div>
          <p className="contact__note">{content.contactNote || en.contact?.subtitle}</p>
        </div>

        <form className="contact__form" onSubmit={onSubmit}>
          <div className="contact__row">
            <label>
              <span className="label">Your name</span>
              <input name="name" type="text" required autoComplete="name" placeholder="e.g. John Doe" />
            </label>
            <label>
              <span className="label">Your email</span>
              <input name="email" type="email" required autoComplete="email" placeholder="john@example.com" />
            </label>
          </div>
          <div className="contact__row">
            <label>
              <span className="label">Service needed</span>
              <select name="service" required defaultValue="">
                <option value="" disabled>Select a service...</option>
                {content.contactServices.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="label">Project budget</span>
              <select name="budget">
                <option value="">Select budget range...</option>
                {content.contactBudgets.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
          </div>
          <label>
            <span className="label">Project details</span>
            <textarea name="message" rows={5} required placeholder="Describe your goals, timeline, and deliverables..." />
          </label>
          <div className="contact__honeypot" aria-hidden="true">
            <label>
              Leave this field empty
              <input name="company" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <div className="contact__submit">
            <Magnetic>
              <button type="submit" className="button" disabled={status === 'sending'} data-cursor="Send">
                {status === 'sending' ? 'Sending…' : content.contactSubmitLabel}
                <span className="button__arrow" aria-hidden="true">↗</span>
              </button>
            </Magnetic>
            <p className="label" role="status">
              {status === 'sent' ? sentLabel : status === 'error' ? error : content.contactResponse}
            </p>
          </div>
        </form>
      </Container>
    </section>
  );
}
