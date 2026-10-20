# Roadmap — Web Admin Portofolio

Phases are sequential. Each phase ends with a working, testable increment.
Checkbox marks completion; a phase is done only when its Verification line passes.

Legend: `[ ]` not started · `[~]` in progress · `[x]` done

---

## Phase 0 — Documentation

- [x] PRD, Roadmap, Architecture, Project Structure, Configuration, README
- [x] Per-phase plans under `docs/plans/`

**Verification:** every doc file exists and cross-links resolve.

---

## Phase 1 — Scaffold

- [x] `create-next-app` in `web-admin/` (bun, TS, App Router, `src/`, Tailwind v4)
- [x] shadcn/ui init
- [x] Neobrutalism tokens in `globals.css`
- [x] `.env.example` + `.env.local`
- [x] Vitest wired, one smoke test green
- [x] `bun run build` and `bun dev` clean

**Verification:** build passes, dev server starts, smoke test passes.
**Plan:** [`plans/phase-1-scaffold.md`](plans/phase-1-scaffold.md)

---

## Phase 2 — Data layer (TDD)

- [x] Zod schemas per domain
- [x] Reorder helper + tests
- [x] Mappers row ↔ form and row → contract + tests
- [x] Auth predicate (`isAdminEmail`) + tests

**Verification:** `bun test` green; each module written test-first.
**Plan:** [`plans/phase-2-data-layer.md`](plans/phase-2-data-layer.md)

---

## Phase 3 — Supabase wiring + auth

- [x] `supabase/server.ts` (cookie client via `@supabase/ssr`)
- [x] `supabase/admin.ts` (service-role client)
- [x] `middleware.ts` session refresh + admin-email gate
- [x] Login page + login/logout Server Actions
- [x] `(admin)/layout.tsx` guarded shell

**Verification:** unauthenticated visit redirects to login; wrong email rejected; correct login reaches dashboard; sign out works.
**Plan:** [`plans/phase-3-supabase-auth.md`](plans/phase-3-supabase-auth.md)

---

## Phase 4 — Database

- [x] `0001_schema.sql` — tables + enums
- [x] `0002_rls.sql` — anon SELECT-only, storage policies
- [x] `seed.sql` — content from the three sites
- [x] Apply migrations to the Supabase project
- [x] Storage bucket `portfolio` created

**Verification:** anon key can read and cannot write; tables populated; bucket public-read.
**Plan:** [`plans/phase-4-database.md`](plans/phase-4-database.md)

---

## Phase 5 — Brut component set

- [x] Button, Input, Textarea, Select, Checkbox
- [x] Card, Table, Tag, Badge
- [x] Toast / feedback, Confirm dialog
- [x] Empty / Loading / Error states

**Verification:** each component renders in light theme; focus visible; keyboard operable.
**Plan:** [`plans/phase-5-components.md`](plans/phase-5-components.md)

---

## Phase 6 — Projects CRUD

- [x] Projects list (table)
- [x] Project form (arrays: highlights, tech; image upload)
- [x] create/update/delete/reorder Server Actions
- [x] `revalidatePath` after each write
- [x] Dashboard counts

**Verification:** create a project, see it in the list and in the DB; edit; reorder; delete.
**Plan:** [`plans/phase-6-projects-crud.md`](plans/phase-6-projects-crud.md)

---

## Phase 7 — Remaining domains

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

## Phase 8 — Content contract

- [x] `contract/types.ts` — the JSON each portfolio consumes
- [x] Mapping documented per site
- [x] Handoff notes for the rewire pass

**Verification:** contract types compile; a sample row maps to the expected JSON.
**Plan:** [`plans/phase-8-contract.md`](plans/phase-8-contract.md)

---

## Phase 9 — Polish + delivery gate

- [ ] Antislop Delivery Gate report (R-35 click-through included)
- [ ] Accessibility pass (contrast, focus, keyboard)
- [ ] Mobile pass (no overflow, tap targets)
- [ ] README finalized

**Verification:** Delivery Gate all PASS; build clean; click-through recorded.
**Plan:** [`plans/phase-9-polish.md`](plans/phase-9-polish.md)

---

## Deferred (after v1)

- Portfolio rewire (pass 2): each site gets a GET-only route reading Supabase.
- Draft/publish, revision history.
- Contact submissions stored in DB.
- Multi-site per-language variants.

---

## Phase 10 — Payload CMS migration

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
- [ ] Phase 5b: rewire `MYportfolio` and `minimal-dev-portfolio`
- [ ] Drop the legacy `public` Postgres tables once the new admin is signed off
- [ ] Deploy `web-admin` so the portfolio build can reach the CMS (the site is
      a static export, so the CMS must be publicly reachable at build time)

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
