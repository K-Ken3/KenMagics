-- ============================================================
-- KenDesigns portfolio — initial schema, RLS and storage
-- Run with: supabase db push  (or paste into the Supabase SQL editor)
-- ============================================================

create extension if not exists pgcrypto;

do $$ begin
  create type public.content_status as enum ('draft', 'published');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.media_type as enum ('image', 'video');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.message_status as enum ('new', 'read', 'archived');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.project_kind as enum ('software', 'design');
exception when duplicate_object then null; end $$;

-- ------------------------------------------------------------
-- Admin access
-- Add each authorised email here. Supabase Auth must also have
-- the same account enabled (magic link or email/password).
-- ------------------------------------------------------------
create table if not exists public.admin_allowed_emails (
  email text primary key,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_allowed_emails
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- ------------------------------------------------------------
-- Singleton editorial content
-- ------------------------------------------------------------
create table if not exists public.site_settings (
  id text primary key default 'default' check (id = 'default'),
  hero_headline_prefix text not null default '',
  hero_headline_accent text not null default '',
  hero_headline_suffix text not null default '',
  hero_subtext text not null default '',
  availability_status text not null default '',
  email text not null default '',
  whatsapp text not null default '',
  location text not null default '',
  socials jsonb not null default '[]'::jsonb,
  stats jsonb not null default '[]'::jsonb,
  disciplines jsonb not null default '[]'::jsonb,
  seo_title text not null default '',
  seo_description text not null default '',
  og_image text not null default '/og.png',
  translations jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table if not exists public.about (
  id text primary key default 'default' check (id = 'default'),
  bio text not null default '',
  photo text not null default '',
  photo_alt text not null default '',
  "current_role" text not null default '',
  tools jsonb not null default '[]'::jsonb,
  skills jsonb not null default '[]'::jsonb,
  timeline jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- Collections
-- ------------------------------------------------------------
create table if not exists public.projects (
  id text primary key,
  slug text not null unique,
  title text not null,
  kind public.project_kind not null default 'software',
  category text not null default '',
  year text not null default '',
  client text,
  role text,
  summary text not null default '',
  long_description text,
  cover_image text not null default '',
  cover_alt text not null default '',
  tags text[] not null default '{}',
  tools text[] not null default '{}',
  external_link text,
  featured boolean not null default false,
  status public.content_status not null default 'draft',
  sort_order integer not null default 0,
  read_time text,
  aspect_ratio text,
  challenge text,
  solution text,
  impact text,
  needs_real_media boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_public_order_idx
  on public.projects (status, sort_order);

create table if not exists public.project_media (
  id text primary key,
  project_id text not null references public.projects(id) on delete cascade,
  type public.media_type not null default 'image',
  url text not null,
  poster text,
  caption text,
  alt text,
  sort_order integer not null default 0
);

create index if not exists project_media_order_idx
  on public.project_media (project_id, sort_order);

create table if not exists public.services (
  id text primary key,
  title text not null,
  description text not null default '',
  bullets jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  metric text,
  sort_order integer not null default 0,
  status public.content_status not null default 'draft',
  locale text not null default 'en' check (locale in ('en', 'fr')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists services_public_order_idx
  on public.services (status, locale, sort_order);

create table if not exists public.clients (
  id text primary key,
  name text not null,
  logo text,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id text primary key,
  quote text not null,
  name text not null,
  role text,
  company text,
  avatar text,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.process_steps (
  id text primary key,
  number text not null,
  title text not null,
  description text not null default '',
  deliverables jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);

create table if not exists public.media_library (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  path text not null unique,
  url text not null,
  type public.media_type not null default 'image',
  mime text,
  size_bytes bigint not null default 0,
  width integer,
  height integer,
  alt text,
  created_at timestamptz not null default now()
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  service text,
  budget text,
  message text not null,
  is_spam boolean not null default false,
  status public.message_status not null default 'new',
  ip_hash text,
  created_at timestamptz not null default now()
);

create index if not exists messages_created_idx
  on public.messages (created_at desc);

-- ------------------------------------------------------------
-- updated_at trigger
-- ------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists touch_site_settings on public.site_settings;
create trigger touch_site_settings before update on public.site_settings
  for each row execute function public.touch_updated_at();

drop trigger if exists touch_about on public.about;
create trigger touch_about before update on public.about
  for each row execute function public.touch_updated_at();

drop trigger if exists touch_projects on public.projects;
create trigger touch_projects before update on public.projects
  for each row execute function public.touch_updated_at();

drop trigger if exists touch_services on public.services;
create trigger touch_services before update on public.services
  for each row execute function public.touch_updated_at();

drop trigger if exists touch_clients on public.clients;
create trigger touch_clients before update on public.clients
  for each row execute function public.touch_updated_at();

drop trigger if exists touch_testimonials on public.testimonials;
create trigger touch_testimonials before update on public.testimonials
  for each row execute function public.touch_updated_at();

drop trigger if exists touch_process_steps on public.process_steps;
create trigger touch_process_steps before update on public.process_steps
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
-- Public visitors see published content only. Admin writes are
-- limited to emails in admin_allowed_emails. Messages are never
-- readable by the public; inserts happen through a security
-- definer function so anon cannot flood with arbitrary columns.
-- ------------------------------------------------------------
alter table public.admin_allowed_emails enable row level security;
alter table public.site_settings enable row level security;
alter table public.about enable row level security;
alter table public.projects enable row level security;
alter table public.project_media enable row level security;
alter table public.services enable row level security;
alter table public.clients enable row level security;
alter table public.testimonials enable row level security;
alter table public.process_steps enable row level security;
alter table public.media_library enable row level security;
alter table public.messages enable row level security;

drop policy if exists "admin all admin_allowed_emails" on public.admin_allowed_emails;
create policy "admin all admin_allowed_emails" on public.admin_allowed_emails
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings
  for select to anon, authenticated using (true);

drop policy if exists "admin write settings" on public.site_settings;
create policy "admin write settings" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read about" on public.about;
create policy "public read about" on public.about
  for select to anon, authenticated using (true);

drop policy if exists "admin write about" on public.about;
create policy "admin write about" on public.about
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read projects" on public.projects;
create policy "public read projects" on public.projects
  for select to anon, authenticated using (status = 'published');

drop policy if exists "admin write projects" on public.projects;
create policy "admin write projects" on public.projects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read project media" on public.project_media;
create policy "public read project media" on public.project_media
  for select to anon, authenticated using (
    exists (select 1 from public.projects p where p.id = project_id and p.status = 'published')
  );

drop policy if exists "admin write project media" on public.project_media;
create policy "admin write project media" on public.project_media
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read services" on public.services;
create policy "public read services" on public.services
  for select to anon, authenticated using (status = 'published');

drop policy if exists "admin write services" on public.services;
create policy "admin write services" on public.services
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read clients" on public.clients;
create policy "public read clients" on public.clients
  for select to anon, authenticated using (true);

drop policy if exists "admin write clients" on public.clients;
create policy "admin write clients" on public.clients
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read testimonials" on public.testimonials;
create policy "public read testimonials" on public.testimonials
  for select to anon, authenticated using (true);

drop policy if exists "admin write testimonials" on public.testimonials;
create policy "admin write testimonials" on public.testimonials
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read process" on public.process_steps;
create policy "public read process" on public.process_steps
  for select to anon, authenticated using (true);

drop policy if exists "admin write process" on public.process_steps;
create policy "admin write process" on public.process_steps
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all media_library" on public.media_library;
create policy "admin all media_library" on public.media_library
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "admin all messages" on public.messages;
create policy "admin all messages" on public.messages
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Contact form writes through a narrow security definer function.
create or replace function public.submit_message(
  p_name text,
  p_email text,
  p_service text,
  p_budget text,
  p_message text,
  p_company text default '',
  p_ip_hash text default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
begin
  if length(trim(p_name)) < 2 or length(trim(p_message)) < 10 then
    raise exception 'invalid_message';
  end if;
  insert into public.messages (name, email, service, budget, message, is_spam, ip_hash)
  values (
    left(trim(p_name), 120),
    left(trim(p_email), 200),
    left(nullif(trim(p_service), ''), 160),
    left(nullif(trim(p_budget), ''), 80),
    left(trim(p_message), 5000),
    coalesce(length(trim(coalesce(p_company, ''))) > 0, false),
    p_ip_hash
  )
  returning id into new_id;
  return new_id;
end;
$$;

revoke all on function public.submit_message(text, text, text, text, text, text, text) from public;
grant execute on function public.submit_message(text, text, text, text, text, text, text) to anon, authenticated;

-- Narrow count used by the contact form's coarse rate limit.
create or replace function public.recent_message_count(p_ip_hash text)
returns integer
language sql
security definer
set search_path = public
as $$
  select count(*)::integer from public.messages
  where ip_hash = p_ip_hash and created_at > now() - interval '10 minutes';
$$;

revoke all on function public.recent_message_count(text) from public;
grant execute on function public.recent_message_count(text) to anon, authenticated;

-- ------------------------------------------------------------
-- Storage — one public bucket for site media
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit)
values ('media', 'media', true, 10485760)
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select to anon, authenticated using (bucket_id = 'media');

drop policy if exists "admin upload media" on storage.objects;
create policy "admin upload media" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "admin update media" on storage.objects;
create policy "admin update media" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "admin delete media" on storage.objects;
create policy "admin delete media" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());
