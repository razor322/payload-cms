# Architecture — Web Admin Portofolio

---

## 1. System context

```text
                  ┌──────────────────────────────────────────┐
                  │                Supabase                   │
                  │  Postgres  ·  Storage (S3 API)           │
                  └───────┬───────────────────────┬──────────┘
                          │ session pooler        │ S3 protocol
                          │ (schema `payload`)     │
         ┌────────────────▼──────────────────────────────┐
         │                 web-admin                       │
         │  Next.js App Router  ·  Payload 3 admin panel  │
         │  /admin  ·  /api/*  ·  /api/content?site=      │
         └────────────────┬───────────────────────────────┘
                          │ GET /api/content?site=<v3|my|minimal>
         ┌────────────────▼───────────────────────────────┐
         │  3 portfolio sites (static export, build time)  │
         └────────────────────────────────────────────────┘
```

One Supabase project is the single source of truth. The admin is a Payload 3
app that runs inside Next.js: the same process serves the admin panel
(`/admin`), the REST and GraphQL API (`/api/*`), and the read-only content
contract (`/api/content?site=`) that the three portfolios fetch at build time.

## 2. Key architectural decisions

| Decision | Choice | Reason |
|---|---|---|
| CMS | Payload 3 (in-process, not a separate service) | One deploy, one repo, admin + API in the same app. |
| Write surface | Payload admin panel only | The custom CRUD UI was replaced by Payload, which owns both UI and API. |
| Read surface for portfolios | `GET /api/content?site=<site>` | One stable JSON shape, so a portfolio rewire touches one file. |
| Auth | Payload auth (own `users` table) | Supabase Auth had zero users and a second, dead login screen. One gate now: `/admin/login`. |
| Authorization | Payload collection access rules | `read: () => true` for content, write requires a signed-in user. |
| Data access | Payload Local API server-side, REST for the outside | One ORM path, no second client library. |
| Content model | Canonical superset rows + a `site` column | Content is 90% shared; one row per fact avoids 3x editing. |
| Database schema | Dedicated Postgres schema `payload` | Keeps Payload's Drizzle push away from the legacy `public` tables, so it never mistakes them for renames. |
| Theming | Neubrutalism through Payload theme tokens in `(payload)/custom.css` | Payload 3.91 reads `--theme-bg`, `--style-radius-*`, `--bg-color`; the panel is paper, ink and one orange accent, with 3px black borders and 5px hard shadows. The direction lives in `DESIGN.md`. |
| Theme mode | Light by default, set with `admin.theme: "light"` | Payload resolves the theme before it reads a cookie or the `prefers-color-scheme` header, so a dark desktop does not flip the panel. |
| CSS isolation | Tailwind loader skips `node_modules` | Tailwind's preflight lands after Payload's layer and would strip the admin's styles. |
| Testing | Vitest on the pure mapper | The only pure module left is the contract mapper. UI is verified by click-through. |

## 3. Layers

```text
app/(payload)            ← the only root: admin panel, REST api, content route
collections/, globals/   ← Payload collection and global configs
lib/                     ← payload client, contract mapper, fonts
contract/types           ← JSON shape the portfolios consume
scripts/                 ← dev launcher
```

Dependency direction is one-way: `app → lib → payload`. The `(payload)` group
owns the document (`<html>`, `<body>`), so no other root layout may exist.

## 4. Request flows

### 4.1 Read (admin panel)

```text
Browser → /admin/[[...segments]]
        → Payload RootLayout (session cookie)
        → collection read → render
```

### 4.2 Write (admin panel)

```text
Admin form → server function → Payload access rule
           → Postgres (schema `payload`) → revalidate
```

### 4.3 Read (portfolio)

```text
Portfolio build → GET https://<admin>/api/content?site=<v3|my|minimal>
                → Payload Local API → toContractPayload → JSON
                → baked into the static export
```

## 5. Authentication & authorization

- **Session:** Payload's own cookie, issued by `POST /api/users/login`.
- **Single gate:** `/admin/login`. The root `/` redirects to `/admin`.
- **User:** one row in `payload.users` (the owner). Password hashing is
  Payload's, not ours.
- **API access:** content collections are `read: () => true` so portfolios can
  fetch them unauthenticated; every write requires a signed-in user
  (anonymous `POST` returns 403).

## 6. Data model

See `PROJECT_STRUCTURE.md` for the collection list. Two domains are shared
facts, everything else is site-scoped:

```text
shared facts
  projects          one list, composed per site through site-projects
  experiences       one row per position, for v3 and MY
  companies         one employer with a nested positions array, for minimal

site-scoped (all | v3 | my | minimal)
  capabilities  skills  terminal_lines  section_headers
  testimonials  awards  education  certifications  organizations  languages

per-site, no shared row
  site-projects     which projects a site shows, and their order
  site-content      hero, SEO, about and contact copy

global
  profile           name, role, email, website, avatar, intro, socials,
                    languages, documents
```

A `site='all'` row is shared. A site row with the same key replaces it, applied
by `resolveForSite` in `src/lib/mappers/payload-contract.ts`. The comparison key
differs per domain (see `CONTRACT.md`).

Locales: `en` (default) and `id`, handled by Payload's localization. The
contract route takes `?locale=` and passes it to every query.

## 7. Security

| Concern | Mitigation |
|---|---|
| Write access | Payload access rules; anonymous writes return 403. |
| Read access | Content is intentionally public (the portfolios read it). |
| Secrets | `DATABASE_URI` and `PAYLOAD_SECRET` are server-only, `.env.local` is git-ignored. |
| Passwords | Hashed by Payload, never stored in code. |
| Uploads | Supabase Storage S3 keys bypass RLS, server side only. |
| CSRF | Payload server functions and the REST API are POST guarded. |

## 8. Deployment

- Admin: Vercel (or any Node host). Needs `DATABASE_URI`, `PAYLOAD_SECRET`, and
  the `S3_*` block when uploads are enabled.
- Database/Storage: Supabase.
- Portfolios: static export; the build must reach the admin's
  `/api/content`, so the admin has to be publicly reachable at build time.

## 9. Trade-offs (recorded)

- **Superset rows** keep one project row instead of three, at the cost of some
  columns being null for some sites. Accepted: mapping lives in pure functions.
- **No draft/publish** means a save is live. Accepted for a solo owner.
- **Static export** means content changes need a rebuild. Accepted: the
  portfolios are static sites.
- **Payload in-process** means the admin and the content API share a deploy.
  Accepted: one owner, one app.
