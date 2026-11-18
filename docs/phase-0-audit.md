# Phase 0 — Audit (KenDesigns portfolio)

**Scope inspected:** every file in `C:\Users\Karasira\Documents\Modern AI-Powered Portfolio`, the deployed bundle at `https://ken-portfolio-sable.vercel.app/`, and git history (`main`, 3 commits). The three attached PNG screenshots could not be machine-read by this model; instead the deployed JavaScript bundle was extracted in full, so no site copy was guessed.

## 1. Stack & code structure

| Item | Finding |
| --- | --- |
| Framework | **Not Next.js.** Vite 6 + React 19 + TypeScript 5.8, single-page app. Migrate to **Next.js App Router + TypeScript**. |
| Routing | None. One `App.tsx`; all navigation is in-page hash links (`#services`, `#projects`, `#contact`). No case-study routes. |
| Styling | Tailwind CDN runtime (`cdn.tailwindcss.com`) plus a large `<style>` block in `index.html`. No design tokens, no CSS modules. |
| Fonts | Google Fonts loaded at runtime: Inter 300–800, Plus Jakarta Sans 400–800, and Syne 700–800 on the live site. |
| Animation | Live site uses `motion` (Framer Motion 12) for hover/reveal and CSS keyframes for loader, float, blink, marquee. No GSAP, no ScrollTrigger, no Lenis, no page transitions. |
| Other deps | `@google/genai` (Gemini 3 flash preview) powers a floating AI assistant; `lucide-react` icons on live site. `GEMINI_API_KEY` placeholder only. |
| Data | **100% hard-coded** in `constants.tsx` (local) and in minified live bundle (`BM` services, `HM`/`qM` projects, `OM` process, `zM` testimonials, `qA` EN/FR copy, `GM` marquee). No database, no admin, no API, no form backend. |
| Assets | Local `public/`: `Icyeza.png`, `my-photo.JPEG`, `mylogo.png`, `ndaje poster.jpg`, `news-repo.png`, `stock-man.png`, `vid-sum.png`. Live also serves `keke.jpeg` (downloaded to `public/legacy/keke.jpeg`); favicon `logo.png` is 404. Live work imagery is remote Unsplash/Mixkit/Instagram. |
| SEO/a11y | Only `<title>` on live (`KEN KARASIRA | Digital Product Engineer & Designer`); local title is `Ken | Technology & Design`. No meta descriptions, OG, sitemap, robots, JSON-LD, skip link, focus states or keyboard menu/carousel. |

## 2. Complete content inventory — must be preserved in the seed

**Pages/sections (live):** loader ("KARASIRA KEN • CREATIVE STUDIO"), sticky nav + full-screen overlay (Software & Web Apps, Video & Photo Studio, Services & Capabilities, Workflow & Process, Client Endorsements, Contact, Get in Touch), hero (availability tag, location, 5 roles, headline "Crafting Software, Video & Audio Systems.", subtitle, Explore Code Works, Video & Photo Studio, Copy Email, 3 stats lines), stats row (3+ years, 30+ web apps, 50+ video/photo projects, 50+ partners), 19-item tools marquee, Selected Work / software case studies, Design/Video/Sound studio gallery, Services (6), Process (4), Testimonials (3), Contact, Footer, AI assistant, language toggle EN/FR, password-gated "Import Photos & Videos Project" drawer.

**Local-only sections/copy:** stats bar (3+ / 30+ / 50+ / 15 Open Source), 6 local services (Modern Web Apps, UI/UX Design Systems, AI Solutions, Graphic Design, Video Editing, Social Management — all copy + tags preserved), 5 local projects (Ndaje App, Video Summarizer AI, Stock & Expense Management System, Responsive News Reporter Platform, Icyeza One Coffee Shop Website — descriptions, images, tags, links preserved), local testimonial by "KARASIRA Ken — Social manager at Icyeza One Coffee Shop", footer `KEN.DEV`, social links, "© 2026 Ken. Motivated by Code & Design.", AI assistant greeting and Gemini system facts (3+ years, current role, location, email).

**Live software projects (5):** AI Analytics Dashboard (2024, React/D3.js/Gemini AI, challenge/solution/impact); NDAJE Green E-commerce Platform (2025, Next.js/Stripe/Zustand); Creative Studio CMS (2025, TypeScript/Firebase/Tailwind); Smart Order IoT Hub (2025, Next.js/MQTT/Tailwind); Decentralized Voting System (2024, Solidity/React/Web3). All descriptions, case-study text, images and read-times captured.

**Live design projects (6):** CapCut & Premiere Video Edit Reel; Photoshop Digital Art & Photo Collage Collection; Video Audio Arrangement & Beat Sync; Icyeza One Coffee — Brand Identity & Packaging; Short-Form TikTok & Reels CapCut Edits; Modern Mobile App UI/UX & Photoshop Mockups. All categories, tools, years, clients, gallery captions and media URLs captured.

**Live services (6, EN+FR):** Full-Stack Web Engineering, Video Editing & CapCut Cutouts, Photoshop Design & Graphic Arts, Video Audio & Sound Arrangement, UI/UX & Design Systems, AI Solutions & Brand Management. Each has description, tags, metric and 4 features. All French translations stored.

**Process (4):** Discovery & Strategy, Wireframing & Prototype, Engineering & AI Build, Optimization & Launch — with descriptions and 3 deliverables each.

**Testimonials (3):** Cesar NGENZI (Owner, Icyeza One Coffee Shop), Patrick SHEMA (Program Manager, BRIDGE Rwanda), Divine UMUTONI (Co-Founder & Creative Director, NDAJE Green) — full quotes and avatar URLs.

**Disciplines/contact:** 19 marquee disciplines; Kigali, Rwanda; karasiraken5@gmail.com; WhatsApp 250780000000; GitHub `K-Ken3`, LinkedIn `ken-karasira-442452292`, Instagram `k.k3n.__`; full EN+FR UI copy (nav, hero, projects, studio, services, process, testimonials, contact, AI assistant, footer) captured.

## 3. What feels cluttered / generic

Emerald + cyan + pink + violet + amber accents, text and border gradients, glass blur panels, blurred colour blobs, glowing shadows, emoji service icons, 36px radii, floating pulsing AI orb, repeated "pop-up details" affordances on every card, duplicated category labels, stock Unsplash/Mixkit imagery with captions that describe stock rather than the owner's work, unsupported claims ("Lighthouse 95+ Guarantee", "100% quality delivery"), a 250780000000 WhatsApp placeholder, two competing brand marks (`KEN.DEV` vs `KARASIRA KEN • CREATIVE STUDIO`), no real About photo section, and no editorial grid.

## 4. Decisions made (no design input requested)

1. Migrate to Next.js App Router + TypeScript, keep the single-page feel and all existing URLs/anchors, add `/work/[slug]` and `/admin`.
2. Monochrome editorial system: #0b0b0b, #f3f1ec, three greys, one off-white accent dot; Instrument Serif + Geist; 12-column grid; hairlines.
3. Preserve **all** legacy copy/media in the seed (including EN/FR and stock URLs) but present local real work first; remote stock items flagged `TODO_REPLACE_WITH_REAL_WORK` in the database rather than invented or deleted.
4. Replace emoji icons with numbers/typography; drop gradients, glows, blur and blobs; keep the AI assistant as an optional legacy feature disabled by default (needs Gemini key), since the brief prioritises motion and admin over chat.
5. Keep the legacy admin-ish import password copy as archived copy only; real access control moves to Supabase Auth + RLS.
6. Screenshots could not be read by this model; nothing was invented from them — see TODO list in the README.

## Proposed plan

Phase 1 design tokens and primitives → Phase 2 sections and motion → Phase 3 Supabase schema, RLS, seed and migrations → Phase 4 admin panel → Phase 5 live-data wiring, QA and fixes. Commit after each phase.
