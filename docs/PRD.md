# PRD — Web Admin Portofolio

**Version:** 1.0
**Owner:** Gybran Nauval Yuhandika (solo)
**Status:** Approved, in build
**Last updated:** 2026-06-15

---

## 1. Problem

Three portfolio sites live as separate Next.js apps under `the portfolio workspace`:

| App | Path | Content lives in |
|---|---|---|
| portfolio-v3 | `portfolio-v3/` | `app/data/projects.ts`, `app/data/project-descriptions.ts` |
| MYportfolio | `MYportfolio/` | `src/lib/constants/sections/*.ts` |
| minimal-dev-portfolio | `minimal-dev-portfolio/` | `src/features/portfolio/data/*.ts` |

Their content (projects, experience, skills, hero, about, contact, testimonials, awards) is **hardcoded** and duplicated across three codebases with different data shapes. Updating a project means editing three repos and redeploying three sites. Adding a project means touching TypeScript source.

## 2. Goal

One private admin web app that:

1. Stores all portfolio content in a single database.
2. Lets the single owner create, update, delete, and reorder content through a UI, without touching code.
3. Serves the content to the three portfolio sites as JSON, so a change in the admin appears on every site.
4. Runs entirely server-side (no public write API), only readable by the owner.

## 3. Non-goals

- Multiple admins, roles, or permissions. One owner only.
- Public signup. The admin user is created once, manually.
- A REST/GraphQL write API. All writes are Server Actions.
- Draft/publish workflow, revision history, scheduling. v1 is edit-in-place.
- Localization (EN/ID toggle). Content is written in whatever language the owner types.
- Making the portfolios fully dynamic in real time. Static regeneration on revalidate is enough.
- Reworking the designs of the three portfolio sites. This project only changes where their content comes from.

## 4. Users

**One user: the owner (Gybran).** Technically fluent. Wants to add a project or fix a typo in seconds, from a laptop, without opening VS Code.

## 5. Scope

### 5.1 In scope (v1)

Content domains managed by the admin, covering everything the three sites render:

| Domain | Fields (union across sites) |
|---|---|
| Profile (singleton) | name, role, location, email, website, avatar, intro, socials (jsonb) |
| Section headers | per site+section: left/middle/right kicker + title triples |
| Projects | slug, title, role, subtitle, description, impact, highlights[], tech[], github, live, image, featured, year, category, status, sort |
| Experiences | external id, company, position, period, location, type, duration, mode, role, summary, outcomes[], stack[], sort |
| Capabilities | site, title, description, tags[], sort |
| Skills | site, category, name, iconKey, sort |
| Terminal lines | site, text, delay, colorClass, bold, isCursor, sort |
| Testimonials | site, name, role, quote, avatar, sort |
| Awards | site, kind, title, org, year, description, sort |

Cross-cutting features:

- Email/password login, restricted to one email address.
- Image upload to Supabase Storage (bucket `portfolio`).
- Array fields (highlights, tech, outcomes, tags) editable as reorderable lists.
- Reordering. Pairs with drag or up/down controls.
- Neobrutalism-themed UI.

### 5.2 Out of scope (v1, named for later)

- Rewiring the three portfolios to read the DB. Separated into a second execution pass.
- Multi-admin, roles, audit log.
- Contact-form submissions stored in DB.
- Analytics dashboard.

## 6. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-1 | Owner signs in with email + password. Any other email is rejected. | Must |
| FR-2 | Owner can CRUD every domain in §5.1. | Must |
| FR-3 | Owner can upload a project image; UI shows the resulting public URL. | Must |
| FR-4 | Owner can reorder projects, experiences, skills rows, and array fields. | Should |
| FR-5 | Changes persist to Supabase and survive a server restart. | Must |
| FR-6 | After a change, the affected admin list reflects it without a manual refresh. | Must |
| FR-7 | Portfolios can fetch the same content as read-only JSON. | Must |
| FR-8 | Empty list, loading, and error states appear wherever data is displayed. | Must |
| FR-9 | Owner can sign out. | Should |

## 7. Non-functional requirements

| ID | Requirement |
|---|---|
| NFR-1 | Server-side rendering + Server Actions. No `/api` route in the admin app. |
| NFR-2 | Anon database access is SELECT-only. Writes happen with the service-role key inside Server Actions. |
| NFR-3 | Every interactive control works; no dead buttons. |
| NFR-4 | Keyboard navigable; visible focus; WCAG AA contrast. |
| NFR-5 | No horizontal overflow at any breakpoint; usable on a phone. |
| NFR-6 | TypeScript strict; Zod validates every write at the trust boundary. |
| NFR-7 | Data-layer logic (schemas, mappers, reorder math, auth predicate) is test-covered with Vitest. |
| NFR-8 | Neobrutalism theme: thick borders, hard offset shadows, zero radius, high-contrast palette. |

## 8. Success criteria

1. Adding a new project takes under 60 seconds and no code.
2. A single fact (e.g. an experience entry) is stored once in the DB and consumed by all three portfolios.
3. Zero hardcoded content files remain after the portfolio-rewire pass.
4. The admin runs locally with `bun dev` and builds with `bun run build`, clean.

## 9. Constraints

- Package manager: **bun**.
- Stack: Next.js (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, Supabase (`@supabase/supabase-js` + `@supabase/ssr`), Zod, Vitest.
- Single Supabase project shared by all four apps.
- The admin app must not expose an API surface.

## 10. Open questions

- Exact Next.js version to pin (matches the installed `create-next-app`).
- Whether awards/testimonials are needed in v1 or can wait (currently: included).

## 11. Glossary

- **Admin** — this app, `web-admin/`.
- **Portfolio** — one of the three public sites.
- **Contract** — the JSON shape a portfolio receives from the admin's content.
- **Brut** — the local neobrutalist component set.
