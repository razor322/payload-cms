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

- [ ] `supabase/server.ts` (cookie client via `@supabase/ssr`)
- [ ] `supabase/admin.ts` (service-role client)
- [ ] `middleware.ts` session refresh + admin-email gate
- [ ] Login page + login/logout Server Actions
- [ ] `(admin)/layout.tsx` guarded shell

**Verification:** unauthenticated visit redirects to login; wrong email rejected; correct login reaches dashboard; sign out works.
**Plan:** [`plans/phase-3-supabase-auth.md`](plans/phase-3-supabase-auth.md)

---

## Phase 4 — Database

- [ ] `0001_schema.sql` — tables + enums
- [ ] `0002_rls.sql` — anon SELECT-only, storage policies
- [ ] `seed.sql` — content from the three sites
- [ ] Apply migrations to the Supabase project
- [ ] Storage bucket `portfolio` created

**Verification:** anon key can read and cannot write; tables populated; bucket public-read.
**Plan:** [`plans/phase-4-database.md`](plans/phase-4-database.md)

---

## Phase 5 — Brut component set

- [ ] Button, Input, Textarea, Select, Checkbox
- [ ] Card, Table, Tag, Badge
- [ ] Toast / feedback, Confirm dialog
- [ ] Empty / Loading / Error states

**Verification:** each component renders in light theme; focus visible; keyboard operable.
**Plan:** [`plans/phase-5-components.md`](plans/phase-5-components.md)

---

## Phase 6 — Projects CRUD

- [ ] Projects list (table)
- [ ] Project form (arrays: highlights, tech; image upload)
- [ ] create/update/delete/reorder Server Actions
- [ ] `revalidatePath` after each write
- [ ] Dashboard counts

**Verification:** create a project, see it in the list and in the DB; edit; reorder; delete.
**Plan:** [`plans/phase-6-projects-crud.md`](plans/phase-6-projects-crud.md)

---

## Phase 7 — Remaining domains

- [ ] Experiences CRUD
- [ ] Skills CRUD
- [ ] Capabilities CRUD
- [ ] Section headers editor
- [ ] Profile (singleton) editor
- [ ] Testimonials CRUD
- [ ] Awards CRUD

**Verification:** every domain in PRD §5.1 is editable; each has empty/loading/error states.
**Plan:** [`plans/phase-7-domains.md`](plans/phase-7-domains.md)

---

## Phase 8 — Content contract

- [ ] `contract/types.ts` — the JSON each portfolio consumes
- [ ] Mapping documented per site
- [ ] Handoff notes for the rewire pass

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
