# Roadmap - Web Admin Portofolio

Phases are sequential. Each phase ends with a working, testable increment.
Checkbox marks completion; a phase is done only when its Verification line passes.

Legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Phase 0 - Documentation

- [x] PRD, Roadmap, Architecture, Project Structure, Configuration, README
- [x] Per-phase plans under `docs/plans/`

**Verification:** every doc file exists and cross-links resolve.

---

## Phase 1 - Scaffold

- [x] `create-next-app` in `web-admin/` (bun, TS, App Router, `src/`, Tailwind v4)
- [x] shadcn/ui init
- [x] Neobrutalism tokens in `globals.css`
- [x] `.env.example` + `.env.local`
- [x] Vitest wired, one smoke test green
- [x] `bun run build` and `bun dev` clean

**Verification:** build passes, dev server starts, smoke test passes.
**Plan:** [`plans/phase-1-scaffold.md`](plans/phase-1-scaffold.md)

---

## Phase 2 - Data layer (TDD)

- [x] Zod schemas per domain
- [x] Reorder helper + tests
- [x] Mappers row ↔ form and row → contract + tests
- [x] Auth predicate (`isAdminEmail`) + tests

**Verification:** `bun test` green; each module written test-first.
**Plan:** [`plans/phase-2-data-layer.md`](plans/phase-2-data-layer.md)

---

## Phase 3 - Supabase wiring + auth

- [x] `supabase/server.ts` (cookie client via `@supabase/ssr`)
- [x] `supabase/admin.ts` (service-role client)
- [x] `middleware.ts` session refresh + admin-email gate
- [x] Login page + login/logout Server Actions
- [x] `(admin)/layout.tsx` guarded shell

**Verification:** unauthenticated visit redirects to login; wrong email rejected; correct login reaches dashboard; sign out works.
**Plan:** [`plans/phase-3-supabase-auth.md`](plans/phase-3-supabase-auth.md)

---

## Phase 4 - Database

- [x] `0001_schema.sql` - tables + enums
- [x] `0002_rls.sql` - anon SELECT-only, storage policies
- [x] `seed.sql` - content from the three sites
- [x] Apply migrations to the Supabase project
- [x] Storage bucket `portfolio` created

**Verification:** anon key can read and cannot write; tables populated; bucket public-read.
**Plan:** [`plans/phase-4-database.md`](plans/phase-4-database.md)

---

## Phase 5 - Brut component set

- [x] Button, Input, Textarea, Select, Checkbox
- [x] Card, Table, Tag, Badge
- [x] Toast / feedback, Confirm dialog
- [x] Empty / Loading / Error states

**Verification:** each component renders in light theme; focus visible; keyboard operable.
**Plan:** [`plans/phase-5-components.md`](plans/phase-5-components.md)

---

## Phase 6 - Projects CRUD

- [x] Projects list (table)
- [x] Project form (arrays: highlights, tech; image upload)
- [x] create/update/delete/reorder Server Actions
- [x] `revalidatePath` after each write
- [x] Dashboard counts

**Verification:** create a project, see it in the list and in the DB; edit; reorder; delete.
**Plan:** [`plans/phase-6-projects-crud.md`](plans/phase-6-projects-crud.md)

---

## Phase 7 - Remaining domains

- [x] Experiences CRUD
- [x] Skills CRUD
- [x] Capabilities CRUD
- [x] Section headers editor
- [x] Profile (singleton) editor
- [x] Testimonials CRUD
- [x] Awards CRUD

**Verification:** every domain in PRD §5.1 is editable; each has empty/loading/error states.
**Plan:** [`plans/phase-7-domains.md`](plans/phase-7-domains.md)

---

## Phase 8 - Content contract

- [x] `contract/types.ts` - the JSON each portfolio consumes
- [x] Mapping documented per site
- [x] Handoff notes for the rewire pass

**Verification:** contract types compile; a sample row maps to the expected JSON.
**Plan:** [`plans/phase-8-contract.md`](plans/phase-8-contract.md)

---

## Phase 9 - Polish + delivery gate

- [x] Antislop Delivery Gate report (R-35 click-through included)
- [x] Accessibility pass (contrast, focus, keyboard)
- [x] Mobile pass (no overflow, tap targets)
- [x] README finalized

**Verification:** Delivery Gate all PASS; build clean; click-through recorded.
**Plan:** [`plans/phase-9-polish.md`](plans/phase-9-polish.md)

---

## Deferred (after v1)

- Portfolio rewire (pass 2): each site gets a GET-only route reading Supabase.
- Draft/publish, revision history.
- Contact submissions stored in DB.
- Multi-site per-language variants.

---

## Phase 10 - Payload CMS migration

- [x] Payload 3.91.0 installed (deps pinned, versions matched)
- [x] `payload.config.ts` (postgres adapter) + Payload-owned `users` collection
- [x] `(payload)` route group: admin UI, REST API, importMap
- [x] `withPayload` in `next.config.ts`, `@payload-config` path alias
- [x] `/admin` + `/api` bypass the legacy Supabase auth gate
- [x] `DATABASE_URI` (session pooler, region `ap-northeast-2`) + `PAYLOAD_SECRET`
- [x] Boot `/admin` (HTTP 200, schema pushed into dedicated `payload` schema)
- [x] Theme fonts: Archivo (display) + Inter (body) + JetBrains Mono (mono),
      applied to both the app and the Payload admin via `(payload)/layout`
      `htmlProps` and `(payload)/custom.css` token overrides
- [x] `bun run build`, `bun test` (19 pass), `bun run lint` all clean
- [x] Create first owner user + verify `/api/users` is 403 (owner: `owner@example.com`)
- [x] Phase 2: content collections (projects, experiences, capabilities, skills,
      terminal-lines, testimonials, awards, section-headers, media) + global
      `profile` + `users`
- [x] Phase 3: migrated legacy data into the `payload` schema (7 projects,
      28 highlights, 31 tech, 3 experiences, 9 outcomes, 3 capabilities,
      30 skills, 10 terminal lines, 5 section headers, 1 profile)
- [x] Phase 4: `/api/content?site=<v3|my|minimal>` contract route (Payload Local
      API -> ContractPayload, site precedence `all` + site-specific)
- [x] Phase 5a: `portfolio-v3` pilot rewired to the CMS (branch
      `feature/cms-rewire`): `scripts/sync-content.mjs` fetches
      `/api/content?site=v3` at build time and writes
      `app/data/content.generated.ts`; no component changes
- [x] Phase 5c: legacy admin removed. The custom Supabase-backed CRUD app,
      its `/login` route, the `proxy.ts` auth gate, the `actions/`,
      `components/`, `lib/repositories/`, `lib/supabase/` trees and the
      Supabase-only dependencies are gone. The Payload admin is the only
      admin and `/admin/login` is the only login.
- [x] Admin CSS fixed: Tailwind's preflight no longer overrides Payload
      (the turbopack loader skips `node_modules`, the admin tree does not
      import Tailwind), and the theme overrides use Payload 3.91's token
      names (`--theme-bg`, `--style-radius-*`, `--bg-color`, `--btn-border`).
- [x] Single route group: `(payload)` is the only root layout, `/` redirects
      to `/admin`.
- [x] Stage A: admin theme fixed. Light and dark each define their own
      `--theme-bg`/`--theme-text`; the button override only targets
      `.btn--style-primary`. Verified in both modes with 0 console errors.
- [x] Stage B: `projects` gained period fields; `experiences` gained a period
      range and a separate `companies` collection holds one employer with a
      nested `positions` array; `site-projects` composes the project list per
      site with optional overrides and a fallback to every project
- [x] Stage C: `profile` stays the shared global and a new site-scoped
      `site-content` collection holds hero, SEO, about and contact copy;
      terminal lines gained a kind and an output link; `education`,
      `certifications`, `organizations` and `languages` added
- [x] Stage D: en/id localization, served through `/api/content?locale=`
- [x] Stage F: the admin is neobrutalist end to end. `DESIGN.md` records the
      direction, `custom.css` carries the tokens and the per surface rules.
      Light by default through `admin.theme: "light"`.
- [x] Stage G: the admin is the kyos admin, ported from the kyos photobooth
      app. The frame, the cards, the controls and the type come from it, and so
      do the dashboard, the list and the form. `DESIGN.md` records the
      direction and every place this admin differs; `custom.css` carries the
      tokens and the component classes; `src/components/admin/ui/` holds the ported
      components.
- [x] Backfill per-site content, seeded from the three portfolio repos by
      `scripts/seed-content.ts`
- [x] Phase 5b: all three portfolios read the CMS. Each repo has a
      `scripts/sync-content.mjs` that fetches `/api/content?site=<site>` at
      build time and writes a generated file, with the old file kept when the
      CMS is unreachable. The branch is `feature/cms-rewire` in each repo.
- [ ] Drop the legacy `public` Postgres tables once the new admin is signed off
- [ ] Drop the 49 template testimonials from `minimal-dev-portfolio`
- [ ] Deploy `web-admin` so the portfolio build can reach the CMS (the site is
      a static export, so the CMS must be publicly reachable at build time)

**Known state after the backfill (recorded):** every site now has its rows.
`v3` has `skills` 29, `capabilities` 4, `site_content` 1 and 7 composed
projects. `my` keeps its 30 skills, 3 capabilities and 29 terminal lines (the
10 lines plus the 2 commands and their 17 output lines, which the CMS had
missed). `minimal` has `skills` 20, `companies` 3, `education` 1,
`certifications` 6, `organizations` 2, `languages` 2, `awards` 4, `site_content`
1 and 7 composed projects, with the catering project labelled
"SEA Catering Management". The shared project and experience rows now carry the
period the minimal portfolio shows, and the profile carries the socials, the
languages and the three documents. `scripts/seed-content.ts` replaces the site
scoped rows, so the backfill can be re-run after a content change in a
portfolio repo.

**Two gaps the backfill left, stated rather than hidden.** The v3 focus list
(Performance, Accessibility, Clean UI, Great UX) has no site wide slot in the
model, so it is repeated as the tags of the four v3 capabilities. The project
image path is per site, so the composition carries an `image_override` beside
the `title_override` and the `description_override`. A portfolio that keeps its
own assets and its own wording now sets those, and the shared project row
stays the fallback.

The final verification ran all three sites crossed with both locales. `projects`
(7) and `experiences` (3) come back for every combination. `v3` carries 29
skills and 4 capabilities, `my` carries 30 skills, 3 capabilities and 29
terminal lines, and `minimal` carries 20 skills, 3 companies, 1 education row,
6 certifications, 2 organizations, 2 languages and 4 awards. A bad site
returns 400. All the new collections appear in the admin nav, and the browser
reports 0 console errors.

### Delivery Gate: neobrutalist admin

Measured on the running admin with Playwright, at 1440px and 390px.

| Rule | Result | Evidence |
|---|---|---|
| R-02 | PASS | Zero em dashes in `custom.css`, `DESIGN.md` and the four docs I touched. Scanned. |
| R-03 | PASS | At 390px, `scrollWidth` equals `innerWidth` (390) on login, dashboard, list and create. No overflow. |
| R-11 | PASS | Zero elements with a radius above 0 across eight pages, except the account photo (50%) and the icon glyphs (100%). Both are a photograph and a glyph, not a shape choice. |
| R-12 | PASS | Shadows land only on the primary button, the card hover, the upload dropzone, the popup and the modal. Everything else reads flat. |
| R-01 | PASS | No gradient value anywhere. The seven matches for the word in `custom.css` are all comments stating the rule. |
| R-21 / R-34 | PASS | One theme. `data-theme` reads `light` with a dark OS preference and a dark `Sec-CH-Prefers-Color-Scheme` header, and the canvas stays paper. |
| R-25 | PASS | Body text on the canvas is 19.47:1. The primary button, black on `#ffeb3b`, is 17.2:1. |
| R-26 | PASS | No dead control. Payload renders no theme control when the theme is fixed, so nothing had to be hidden. |
| R-31 | PASS | `DESIGN.md` gives a one line reason for the palette, the typefaces, the radius, the border and the shadow. |
| R-32 | PASS | 12 of 12 tab stops on the create form show an outline or a shadow. |
| R-35 | PASS | Click through, 10 of 10 steps: login, create, list shows the row, sort controls, edit and save, delete with confirmation, the row is gone, account control, media dropzone, bulk upload control. 0 console errors throughout. |
| R-37 | PASS | `DESIGN.md` exists, states the identity and the dial ENERGY 2 / RHYTHM 1 / MOTION 1. |

The five colour palette is a deliberate override of R-29, approved by the owner.
`DESIGN.md` records the three rules that keep it readable: black carries the
structure, yellow appears once per screen, red only marks a destructive action.

**Structure note:** the Payload `(payload)` group renders its own
`<html>`/`<body>`, so it is the only root layout in the app. Payload tables
live in a dedicated Postgres schema `payload`, created via migration
`payload_schema_create`; this avoids Drizzle mis-reading the legacy `public`
tables as renames and blocking with an interactive prompt. The legacy tables
still exist in `public` and can be dropped later.

**Known environment issue (recorded):** the `payload` CLI (`generate:types`,
`generate:importmap`, `migrate`) crashes on this machine. Two independent
causes found:

1. `~/.npmrc` set `registry=https://registry.npmmirror.com`, whose tarballs
   shipped a **tampered `undici`** (`if` statements stripped from
   `lib/web/cache/cachestorage.js` and `lib/api/api-pipeline.js`). Fixed by a
   project `.npmrc` forcing `registry.npmjs.org` plus a clean reinstall; the
   on-disk copy is now correct.
2. The `payload` bin loads the config through `tsx` (`tsx/esm/api`
   `tsImport`), and tsx 4.23.15 on Node 22.22 double-instantiates undici's
   `symbols.js`, so `kConstruct` identity breaks and `new CacheStorage()`
   throws `Illegal constructor`. `--use-swc` escapes the undici crash but
   fails on the config's extensionless TS import (swc ESM named-export
   interop). Workaround for now: `importMap.js` is hand-written
   (`export const importMap = {}`) and Payload generates it at Next dev/build
   startup. The CLI-only commands stay blocked until tsx is upgraded or Node
   is pinned to a version without this interop regression.

### Delivery Gate: the kyos admin

Measured on the running admin with a real browser at 1440px and 390px. The
reference is the admin of the kyos photobooth app: its `AdminLayout`, its
`StatCard`, `SectionCard`, `Button`, `Input` and `Badge`, and the tailwind
tokens behind them.

| Rule | Result | Evidence |
|---|---|---|
| R-02 | PASS | No em dash in `custom.css`, `DESIGN.md`, the four admin components or the docs. |
| R-03 | PASS | At 390px, `scrollWidth` is 375 against `innerWidth` 390 on the dashboard. The page does not scroll sideways. |
| R-11 | PASS | The measured radii are 8px for a badge, 12px for a control, 16px for a card and 999px for the accent bar. The 6px that Payload rounds the odd table rows with is cleared, so the rows are flat. |
| R-12 | PASS | The shadows are the kyos three steps: 2px on the small controls, 4px on the cards and the primary button, 6px on hover. The inputs carry none, because the kyos elevation is the hairline border. |
| R-21 / R-34 | PASS | One theme. `data-theme` reads `light`, the canvas is `#f4f4f5`. |
| R-25 | PASS | Body text `#18181b` on the canvas. The nav label `#71717a` on white, the kyos fog. The yellow `#FFEAA7` carries ink text, and the yellow marks the current nav item only. |
| R-26 | PASS | No dead control. The toggle moves the sidebar between 256px and 72px and the content follows it, because the grid column is set from the same state. The rail icon still navigates. |
| R-31 | PASS | `DESIGN.md` records the palette, the type scale, the shape, the two interaction laws, and the four places this admin differs from the kyos app, each with the reason. |
| R-32 | PASS | The focus ring is a 3px ink outline, the kyos ring in ink. The kyos yellow ring measures about 1.2:1 on cream, so it is not a ring. The nav links keep `aria-label` and `title`, so the collapsed rail still announces its name. |
| R-35 | PASS | Click through: the 18 nav links navigate, a project is created, edited and deleted, the account page opens, the locale popup opens and closes, the media page and its dropzone render, the pink logout ends the session and the login comes back. `scripts/verify-admin.mjs` runs 17 checks and passes them. |
| R-37 | PASS | `DESIGN.md` exists and states the dials ENERGY 2 / RHYTHM 2 / MOTION 1. |

**The frame is the kyos one.** The sidebar is a white column with a 2px cloud
rule, the wordmark block on top, flat list items and the pink logout at the
bottom. The top bar is white with a cloud rule, the page title on the left and
the locale switcher and the account chip on the right. The content column
starts where the sidebar ends, the way the kyos admin offsets its content by
the width of its sidebar.

**The band is filled and the table is flat.** The account chip was stranded
next to the title with 730 pixels of empty band to its right, because Payload
leaves the controls where the wrapper puts them; the controls wrapper now
spaces them apart, so the chip sits beside the locale switcher. The table rows
carried Payload's grey fill and a 6px radius on the odd rows; the fill is now
the snow and cloud alternation the reference uses and no row carries a radius.
The cells are vertically centred. The content gutter is the reference 40px, so
the cards reach the edge of the screen, and the fields are capped at a 720px
measure, which is the one thing that made a form read as Payload.

**Class names carry `pa-`, for the portfolio admin.** The reference app name
belongs in the docs, not in the code, so no class or token names it.

**One band, one brand, one account.** The earlier build stacked a title band
above Payload's own header, repeated the brand in both, and offered the
account twice. The custom title band is gone, the brand in the header is
hidden, and the account control is the only one. The page no longer scrolls
64 pixels for nothing.

**The sidebar owns its state.** Payload closes its drawer on every desktop
load, so the panel would always be a rail. The panel keeps its own open state,
takes the first state from the saved preference, and the grid column follows
it. Below 1024px it becomes a 72px rail that opens over the content.

**The cards are the kyos cards.** Cream, a 2px ink border, a 16px radius and a
4px hard shadow, lifting to 6px on hover and sinking on press. The dashboard
collection cards carry the kyos stat card accent bar, one of the four kyos
accents per card.

**The type is the kyos type.** One family, DM Sans. The wordmark, the page
title, the card titles and the small labels all come from it, with the mono
held back for the ids and the slugs, which the kyos app has no need of.

**The dashboard is the kyos dashboard.** Payload's widget grid is replaced by
`admin.components.views.dashboard`. Four stat cards read the CMS (the documents
across the collection tables, the number of tables, the media, the sites), two
chart cards draw the counts, and two list cards hold the recently edited
projects and the recently uploaded media. The charts are drawn with the
stylesheet, not a chart library, so the admin gained no dependency. The trade
is recorded in `DESIGN.md`: Payload's drag and drop widget layout and its
preference are gone.

**The list is one card.** Payload draws the head, the toolbar and the table as
three framed blocks. The stylesheet joins them into the one card the kyos admin
draws, with an ink rule under the head and another under the toolbar, and the
head comes from a `beforeList` slot on all 17 collections, carrying the name
and the count.

**The form is the kyos form.** Labels at 12px in caps, fields at 14px in medium
weight with a 2px ink border and no shadow, the select at the 12px control
radius, the boolean at the 8px badge radius, and the row of actions over a
cloud rule.

**The admin routes carry no Tailwind.** They load Payload's stylesheet and
`custom.css` only, so every kyos component is written as structure plus a
class, and the class lives in `custom.css`. A Tailwind utility in a component
would render as plain markup, which is why the first build of the dashboard
came out unshaped and was rewritten.

**Environment note.** The `payload` CLI still crashes on this machine (tsx and
undici), so `importMap.js` is written by hand with the same hashes the
generator produces; Payload rewrites it on the next dev or build run and the
output matched. `scripts/verify-admin.mjs` starts the admin, probes it and
stops it, with a hard deadline so it can never hang.

### Delivery Gate: the kyos admin parity

Measured on the running admin with a real browser at 1536px and 390px, and
with `scripts/verify-admin.mjs`. The reference is the admin of the kyos
photobooth app. This pass covered what was still off: the form page, the
account page, the profile global, the phone layout and the console.

| Rule | Result | Evidence |
|---|---|---|
| R-02 | PASS | No em dash in `custom.css`, `DESIGN.md`, the admin components or the docs. Scanned. |
| R-03 | PASS | At 390px, `scrollWidth` equals `clientWidth` (375) on the login, the dashboard, the list, the create form, the edit form, the profile global, the account page and the media create. No page scrolls sideways. |
| R-25 | PASS | Ink on card 19.56:1, ink on canvas 18.10:1, fog on white 4.83:1, ink on yellow 16.65:1, ink on pink 9.86:1, white on ink 19.90:1. The placeholders, the select placeholder, the search icon, the empty state title and the dropzone rule moved off the light ash onto the fog, so every one of them clears 4.5:1. |
| R-26 | PASS | No dead control. The sidebar toggle moves the panel and the column with it, the head search filters the list and resets the page, the per-page popup changes the limit, the select opens, the save saves, the delete confirm cancels, the logout ends the session and the login comes back. |
| R-27 | PASS | The empty state carries the chip, the title and the line, the list shows the dashed no-results block, the banner is the yellow card, and the disabled arrow is the flat grey. |
| R-31 | PASS | Every decision is written down: `DESIGN.md` for the direction, the plan for the order of the work, and the `ponytail:` comment on the one shortcut (the viewport dependent first render of the rail). |
| R-32 | PASS | The focus ring is a 3px ink outline, the kyos ring in ink. The kyos yellow ring measures about 1.2:1 on cream, so it is not a ring. This is the one recorded deviation. |
| R-35 | PASS | `scripts/verify-admin.mjs` runs 34 checks and passes them. Click through at 1536 and 390: the dashboard, a list with two pages, a list with one page, a create form, an edit form, the profile global, the account page, the delete confirmation, a select dropdown, the account chip, the logout and the login. 0 console errors on eight pages at both sizes. |

**The form is the reference's dialog.** Payload draws the form as a bare page:
a bar with the title and the actions, then the groups, then the array rows.
The page is now the card: cream, a 2px ink border, a 16px radius and a 4px
hard shadow, inset by the reference 40px gutter. The bar is the head, with the
meta on the left, the actions on the right and an ink rule under it, and it
sticks under the top bar so the save stays in reach. The groups are the
reference's panels, a cloud ground with a cloud rule, and the array rows are
recessed.

**The account page and the profile global are grids of panels.** The
reference's settings page is a stack of cards, each with a caps title and the
fields inside. Here the head is the first card and the field groups are the
cards under it: two columns on a wide screen, one on a phone, and the wide
fields (the intro and the three arrays) take the whole row.

**The phone fits.** The gutter narrows to 16px below 768px, the head row wraps
so the search takes the row, the meta wraps instead of running off the card,
and the two Payload rules that ran past the card (the form width and the
settings rule) are pulled back in. Every page measures `scrollWidth` equal to
`clientWidth` at 390px.

**The console is clean.** The rail reads the viewport on its first render, so
the server and the client can disagree on the first paint. The state settles
on the next render, so the warning is silenced with `suppressHydrationWarning`
rather than the state held back from the server. Nothing else logs.

The dials are ENERGY 2 / RHYTHM 2 / MOTION 1, and the one recorded deviation
is the ink focus ring.

### Delivery Gate: the public repo

The repository goes public, so the audit asks one question: what would a
stranger get from the clone that they should not have? Source first, then the
history, then the live credential.

| # | Priority | Finding | Evidence | Fix |
|---|---|---|---|---|
| 1 | high | The live admin password sat in a tracked file | `scripts/verify-admin.mjs:24-25` held the email and `REDACTED`, the working password of the account in `supabase/seed.sql:8` | The defaults are gone. The credential comes from `.env.local`, and the script exits when it is missing |
| 2 | medium | The same string was in the history | `git log --all -S"REDACTED"` returned `4f48ec7` | The history was rewritten before the first push, so the old blob is gone from the object store |
| 3 | medium | Unlimited login attempts | `src/collections/Users.ts` had `auth: true` with no `maxLoginAttempts`, and Payload only adds the lock fields when it is set (`node_modules/payload/dist/auth/getAuthFields.js:45`) | `maxLoginAttempts: 5`, `lockTime: 600000` |
| 4 | low | Local uploads would have been committed | `src/collections/Media.ts` writes to `public/media`, and that folder was not ignored | `/public/media` is ignored |
| 5 | low | The machine layout leaked | The absolute Windows path in `DESIGN.md`, `docs/PRD.md`, `docs/PROJECT_STRUCTURE.md`, `docs/plans/phase-1-scaffold.md` and `scripts/seed-data.ts` | The paths are relative, and the three portfolio checkouts are named, not pathed |
| 6 | low | The lockfile pointed at a mirror | All 1081 resolved tarballs in `bun.lock` pointed at `registry.npmmirror.com`, 9s from here against 1.3s for npmjs | The host is `registry.npmjs.org`, the versions and the integrity hashes are untouched, and `bun install --frozen-lockfile` reports no changes |
| 7 | info | The owner's contact details were in the tracked files | The email in `scripts/seed-data.ts`, `supabase/seed.sql`, `docs/CONTRACT.md`, `docs/ROADMAP.md` and `docs/plans/phase-4-database.md` | The repository carries `owner@example.com`. The real address lives in `.env.local`, and the public seed reads it from there |
| 8 | info | No license | The repository had no `LICENSE` | MIT |

**Checked and not a finding.** Anonymous writes are blocked: Payload's
collection default access is `Boolean(user)`
(`node_modules/payload/dist/auth/defaultAccess.js:1`), so create, update and
delete need a session even where only `read` is declared. CORS is the default
empty list, so no cross-origin caller. `.env.local` and `docs/LOCAL-ACCESS.md`
were never committed, and `.env.example` carries placeholders only. No JWT, no
service role key, no S3 key and no 64 char secret sits in the tree or in the
history; the only 64 hex strings are the integrity hashes in `bun.lock`.

**Two seed profiles.** A dev seed writes the placeholder contact, so nothing
personal lands in the repository. A public seed writes the owner's real
address from `OWNER_EMAIL` and `OWNER_WHATSAPP`, and refuses to run without
them, so a live site never shows a placeholder. The rule is in
`docs/CONFIGURATION.md` §7.1.

**The credential was rotated.** The password that was in the source is dead:
the account was updated through the Payload local API, and the new value lives
only in `.env.local` and `docs/LOCAL-ACCESS.md`, both git-ignored.

**The gate.** `bun test` 42 pass, `bun run lint` clean, `bunx tsc --noEmit`
clean, `bun run build` clean, `node scripts/verify-admin.mjs` 34 of 34.
