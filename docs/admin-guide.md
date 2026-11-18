# Admin guide — adding a project

1. Open `/admin` and sign in with the magic link sent to your authorised email.
2. In the sidebar choose **Projects → New project**.
3. Fill in the fields below. Only **Title**, **URL slug** and **Cover image URL** are required.
4. Use **Status: Draft** while writing; switch to **Published** when ready. Published projects appear on the home carousel and get their own `/work/<slug>` page immediately.
5. Press **Save project**. The site is revalidated automatically — open **Live site ↗** to check it.

## Field quick reference

| Field | What to put there |
| --- | --- |
| Title | Public project name, e.g. `NDAJE Green E-commerce Platform` |
| URL slug | Lowercase hyphenated URL, e.g. `ndaje-green-e-commerce-platform` |
| Kind | `Software` for apps/systems, `Design / video` for studio work |
| Category / Year | Short metadata shown under the carousel title |
| Summary | One or two sentences used on cards and in search results |
| Long description | Full project overview on the case-study page |
| Cover image URL | Paste from **Media → Copy URL**, or use an existing inherited URL |
| Tags / Tools | Comma-separated lists |
| Challenge / Solution / Impact | Optional case-study copy, one paragraph each |
| Featured | Tick to flag the project as a highlight |
| Needs real media | Tick for inherited stock imagery that still needs a real asset |

## Media

- **Media → Upload** accepts images and video. Images are resized to 1920px and converted to WebP automatically.
- After upload, press **Copy URL** and paste that URL into a cover image or gallery field.
- Delete only removes the file from storage and the media library; projects referencing it must be edited separately.

## Other content

- **Services / Clients / Testimonials / Process** — drag rows to reorder, use the arrows for keyboard-friendly reordering, publish/unpublish services, and use **Add new** at the bottom.
- **Site & About** — edit hero copy, email/WhatsApp, socials, stats, disciplines, SEO title/description, bio and photo. Use `Label | URL` per line for socials and `Value | Label` per line for stats.
- **Messages** — contact form submissions appear here. Mark as read, archive or delete. Honeypot hits are labelled `spam`.
- Every save triggers on-demand revalidation; no manual deploy is needed for content changes.

## Access control

Only emails listed in `public.admin_allowed_emails` can sign in. That table is also enforced by RLS, so an unlisted Supabase user cannot read or write CMS data even if they authenticate.
