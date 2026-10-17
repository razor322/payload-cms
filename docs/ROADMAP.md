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
- [ ] Create first owner user + verify `/api/users` is 401 (owner action)
- [ ] Phase 2: content collections
- [ ] Phase 3: migrate data from legacy Supabase tables
- [ ] Phase 4: `/api/content` contract route
- [ ] Phase 5: rewire the portfolios + remove legacy admin code

**Structure note:** the legacy app routes moved from `src/app/(admin)` and
`src/app/(auth)` under a new `src/app/(app)` group with its own root layout
(fonts + globals). Payload's `(payload)` group renders its own `<html>`/`<body>`,
so the two must not share a single `app/layout.tsx` (double `<html>` breaks
hydration). Payload tables live in a dedicated Postgres schema `payload`, created
via migration `payload_schema_create`; this avoids Drizzle mis-reading the legacy
`public` tables as renames and blocking with an interactive prompt.

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
