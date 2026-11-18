# KenDesigns — portfolio + CMS

A minimal, editorial, motion-rich portfolio for Ken Karasira, built with Next.js App Router, TypeScript, GSAP/ScrollTrigger, Lenis and Framer Motion. Content is managed in Supabase through a private `/admin` panel.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

With no Supabase keys the site renders the complete inherited legacy dataset, so it always builds. To enable the CMS, follow the setup below.

## Supabase setup

1. Create a Supabase project.
2. In **SQL Editor**, run `supabase/migrations/0001_initial.sql`. This creates the tables, RLS policies, storage bucket and helper functions.
3. In **Authentication → Providers**, enable Email and turn off email confirmation if you want instant local sign-in (magic link is used by default).
4. Fill in `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only; used by `npm run seed`)
   - `ADMIN_EMAIL` — the account allowed to sign in
   - `NEXT_PUBLIC_SITE_URL` — your deployment URL
5. Create the auth user for `ADMIN_EMAIL` in Supabase (Authentication → Add user).
6. Import all inherited content:

   ```bash
   npm run seed
   ```

   The seed is idempotent and adds `ADMIN_EMAIL` to `public.admin_allowed_emails`. If you create the user without setting `ADMIN_EMAIL`, run manually:

   ```sql
   insert into public.admin_allowed_emails (email) values ('you@example.com');
   ```

7. Restart `npm run dev`, then open `/admin`. The magic link redirects back to the dashboard.

## Optional email notifications

Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `CONTACT_FROM_EMAIL` in `.env.local`. Messages are always stored in the `messages` table; Resend only adds an email notification. The contact form validates with Zod, hides a honeypot field, and rate-limits to three messages per IP per ten minutes.

## On-demand revalidation

Admin saves call `revalidatePortfolio()` automatically. For external writes (for example a Supabase webhook), set `REVALIDATE_SECRET` and send:

```bash
curl -X POST https://your-site/api/revalidate -H "x-revalidate-secret: $REVALIDATE_SECRET"
```

## Deploy

Deploy to Vercel with the same environment variables. Set `NEXT_PUBLIC_SITE_URL` to the production origin before building so sitemap, robots and canonical metadata are correct. `sitemap.xml`, `robots.txt` and `opengraph-image` are generated automatically.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run typecheck` | TypeScript check |
| `npm run seed` | Import all legacy content into Supabase |
| `npm run extract:legacy` | Re-extract copy from the deployed Vite bundle |

## Design decisions (one line each)

- **Ink/paper base with sage, clay and slate accents** — keeps the page calm while giving design, craft and structure a matching colour cue.
- **Instrument Serif + Geist** — editorial headline voice with a clean grotesk for interface copy.
- **12-column hairline grid** — gives large type and imagery a consistent, premium rhythm.
- **GSAP + ScrollTrigger for scroll, Framer Motion for transitions** — each library handles what it does best.
- **Anon-key reads with RLS** — public visitors can only ever fetch published records.
- **Service-role only in server scripts** — seeding and webhook helpers never ship to the browser.
- **Legacy fallback in `getPortfolio()`** — the site never breaks while credentials are being configured.
- **All inherited copy seeded verbatim** — nothing from the old site was silently dropped.

## TODO / unverified

- Replace inherited Unsplash/Mixkit stock URLs with real project imagery (`needsRealMedia = true` in the database).
- Replace typographic client names with real logo files when supplied.
- Confirm the real WhatsApp number; `250780000000` is the inherited placeholder.
- Restore the AI assistant only if a Gemini key is wanted; it is intentionally archived/disabled.
- The three screenshots supplied in chat could not be machine-read; no visual details were invented from them.
- Run Lighthouse performance in a real device lab; the local automated browser pauses `requestAnimationFrame`, so motion timing and LCP could not be measured reliably here.

See `docs/phase-0-audit.md` for the full content inventory and `docs/admin-guide.md` for the one-page CMS guide.
