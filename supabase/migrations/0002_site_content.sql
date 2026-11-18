-- Editorial copy edited from the admin "Site copy" form.
-- Stored as JSON so new fields can be added without schema changes.

alter table public.site_settings
  add column if not exists content jsonb not null default '{}'::jsonb;

comment on column public.site_settings.content is
  'Site-wide editorial copy (headlines, labels, tickers, footer, case-study labels). Missing keys fall back to app defaults.';
