# QA record — Phase 5

Automated checks run locally against `http://localhost:3000` in the in-app browser.

| Check | Result |
| --- | --- |
| `npm run typecheck` | Passed |
| `npm run build` | Passed, 32 routes generated |
| Home console errors | None |
| `/work/[slug]` console errors | None |
| Lighthouse Accessibility | 100 / 100 |
| Lighthouse Best Practices | 100 / 100 |
| Lighthouse SEO | 100 / 100 |
| `/admin` without Supabase env | Redirects to home |
| `/admin/login` without Supabase env | Shows setup instructions |
| `POST /api/contact` without Supabase env | 503 with clear message |
| `sitemap.xml` | Generated with home anchors and 11 case-study URLs |

## Colour refinement QA

- Palette: sage `#b7d36f`, clay `#d8a27b` and slate `#8fa6b8` on the existing ink/paper base.
- Computed-style check confirmed the three colours on the hero, section heading accents, stats, work indices, service numbers and process numbers.
- Home console errors after refresh: none.
- Production Lighthouse at `http://localhost:3001`: Accessibility 100, Best Practices 100, SEO 100, no failures.
- Dev-mode Lighthouse reported SEO 83 because App Router metadata is streamed by `next dev`; production metadata is server-rendered and passes.

## Not verifiable in this environment

- Lighthouse Performance (the tool does not emulate a mobile device or run a performance benchmark).
- LCP/CLS numbers under real network conditions.
- Touch behaviour on a real device. The custom cursor and magnetic effects are gated by `(hover: none), (pointer: coarse)`, and the carousel uses native touch scrolling.
- Real reduced-motion emulation. Guards exist in every motion component plus a global CSS override.
- Exact viewport rendering at 360px and 2560px. The stylesheet has breakpoints at 600/860/1100px and a 1680px max-width shell.
- Supabase CRUD, storage, auth and Resend delivery — credentials are not available locally.
