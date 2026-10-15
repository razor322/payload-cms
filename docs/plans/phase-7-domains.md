# Phase 7 — Remaining Domains Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The same list + form CRUD pattern applied to every other domain, so all PRD §5.1 content is editable.

**Architecture:** Repeat the Projects pattern per domain: a repository, a set of Server Actions, a list page, and a form page. Shell domains with site-scoped rows expose a `site` select.

**Tech Stack:** Next.js Server Actions, Supabase, Zod.

## Global Constraints

- Reuse the Projects pattern; do not invent a new shape.
- Each action: `requireAdmin()` → `schema.parse` → write → `revalidatePath`.
- Every list has Empty/Loading/Error states.
- `site` select options: `all`, `v3`, `my`, `minimal`.

---

### Task 1: Experiences

**Files:**
- Create: `src/lib/repositories/experiences.ts`
- Create: `src/actions/experiences.ts`
- Create: `src/app/(admin)/experiences/page.tsx`
- Create: `src/app/(admin)/experiences/new/page.tsx`
- Create: `src/app/(admin)/experiences/[id]/page.tsx`
- Create: `src/components/forms/experience-form.tsx`

**Interfaces:**
- Consumes: `experienceInputSchema`, `requireAdmin`, `createAdminClient`, `ArrayField`.
- Produces: CRUD for experiences.

- [ ] **Step 1: Repository**

Mirror `repositories/projects.ts` for the `experiences` table:
`listExperiences`, `getExperience`, `insertExperience`, `updateExperience`,
`deleteExperience`, `setExperienceOrder`. Order by `sort`.

- [ ] **Step 2: Actions**

`src/actions/experiences.ts`: `createExperience`, `updateExperienceAction`,
`deleteExperienceAction`, `reorderExperiences`. Parse via a helper identical in
shape to the projects `parse`, `formData.getAll("outcomes")` and `"stack"`.

- [ ] **Step 3: Form**

`ExperienceForm` fields: ext_id, company, position, period, location, type,
duration, mode, role, summary (Textarea), `ArrayField name="outcomes"`,
`ArrayField name="stack"`, sort.

- [ ] **Step 4: Pages**

List (table: company, position, period, actions) and create/edit pages, matching
the Projects pages. Bind `updateExperienceAction` with the id.

- [ ] **Step 5: Verify**

Create, edit, reorder, delete an experience; confirm persistence and revalidation.

- [ ] **Step 6: Commit**

```bash
git add src/lib/repositories/experiences.ts src/actions/experiences.ts "src/app/(admin)/experiences" src/components/forms/experience-form.tsx
git commit -m "feat: experiences crud"
```

---

### Task 2: Skills (site-scoped)

**Files:**
- Create: `src/lib/repositories/skills.ts`
- Create: `src/actions/skills.ts`
- Create: `src/app/(admin)/skills/page.tsx`, `new/page.tsx`, `[id]/page.tsx`
- Create: `src/components/forms/skill-form.tsx`

**Interfaces:**
- Consumes: `skillInputSchema`.
- Produces: CRUD for skills with a `site` select.

- [ ] **Step 1: Repository + actions + form + pages**

Mirror Task 1. `SkillForm` fields: `site` (Select), category, name, icon_key,
sort. List groups rows by `site` then `category`, ordered by `sort`.

- [ ] **Step 2: Verify**

Create a skill for `my`; confirm it lists under the `my` group and persists.

- [ ] **Step 3: Commit**

```bash
git add src/lib/repositories/skills.ts src/actions/skills.ts "src/app/(admin)/skills" src/components/forms/skill-form.tsx
git commit -m "feat: skills crud"
```

---

### Task 3: Capabilities (site-scoped)

**Files:**
- Create: `src/lib/repositories/capabilities.ts`
- Create: `src/actions/capabilities.ts`
- Create: `src/app/(admin)/capabilities/page.tsx`, `new/page.tsx`, `[id]/page.tsx`
- Create: `src/components/forms/capability-form.tsx`

**Interfaces:**
- Consumes: `capabilityInputSchema`.
- Produces: CRUD for capabilities.

- [ ] **Step 1: Build**

Mirror Task 1. `CapabilityForm` fields: `site`, title, description (Textarea),
`ArrayField name="tags"`, sort.

- [ ] **Step 2: Verify**

Create, edit, delete a capability.
Stop dev server after.

- [ ] **Step 3: Commit**

```bash
git add src/lib/repositories/capabilities.ts src/actions/capabilities.ts "src/app/(admin)/capabilities" src/components/forms/capability-form.tsx
git commit -m "feat: capabilities crud"
```

---

### Task 4: Section headers

**Files:**
- Create: `src/lib/repositories/headers.ts`
- Create: `src/actions/headers.ts`
- Create: `src/app/(admin)/headers/page.tsx`
- Create: `src/components/forms/header-form.tsx`

**Interfaces:**
- Consumes: `headerInputSchema`.
- Produces: an editor for the `section_headers` triples.

- [ ] **Step 1: Build**

No separate create page: `headers/page.tsx` lists rows (filtered by `site`) and
renders a `HeaderForm` per row inline (or links to a small edit route). The
action uses `upsert` on `(site, section)`. `HeaderForm` fields: site, section,
left_kicker, left_title, middle_kicker, middle_title, right_kicker, right_title.

- [ ] **Step 2: Verify**

Edit the `projects` header for `my`; confirm it persists (upsert, not duplicate).

- [ ] **Step 3: Commit**

```bash
git add src/lib/repositories/headers.ts src/actions/headers.ts "src/app/(admin)/headers" src/components/forms/header-form.tsx
git commit -m "feat: section headers editor"
```

---

### Task 5: Profile (singleton)

**Files:**
- Create: `src/lib/repositories/profile.ts`
- Create: `src/actions/profile.ts`
- Create: `src/app/(admin)/profile/page.tsx`
- Create: `src/components/forms/profile-form.tsx`

**Interfaces:**
- Consumes: `profileInputSchema`, `ImageUpload`.
- Produces: a single-row editor.

- [ ] **Step 1: Build**

`getProfile()` reads the single row (create it in seed). `saveProfile` does
`update` on that id (or `upsert` with a fixed id). `ProfileForm` fields: name,
role, location, email, website, `ImageUpload name="avatar_url"`, intro
(Textarea), plus socials as a small key/value pair editor (four fixed rows:
linkedin, github, instagram, whatsapp).

- [ ] **Step 2: Verify**

Change the intro; reload; confirm it persisted.

- [ ] **Step 3: Commit**

```bash
git add src/lib/repositories/profile.ts src/actions/profile.ts "src/app/(admin)/profile" src/components/forms/profile-form.tsx
git commit -m "feat: profile editor"
```

---

### Task 6: Testimonials + Awards

**Files:**
- Create: `src/lib/repositories/testimonials.ts`, `src/lib/repositories/awards.ts`
- Create: `src/actions/testimonials.ts`, `src/actions/awards.ts`
- Create: `src/app/(admin)/testimonials/**`, `src/app/(admin)/awards/**`
- Create: `src/components/forms/testimonial-form.tsx`, `award-form.tsx`

**Interfaces:**
- Consumes: `testimonialInputSchema`, `awardInputSchema`, `ImageUpload`.
- Produces: CRUD for testimonials and awards.

- [ ] **Step 1: Build**

`TestimonialForm`: site, name, role, quote (Textarea), `ImageUpload name="avatar_url"`, sort.
`AwardForm`: site, kind, title, org, year, description (Textarea), sort.
Same list/edit pages as Projects.

- [ ] **Step 2: Verify**

Create one of each; confirm they list and persist.

- [ ] **Step 3: Commit**

```bash
git add src/lib/repositories/testimonials.ts src/lib/repositories/awards.ts src/actions/testimonials.ts src/actions/awards.ts "src/app/(admin)/testimonials" "src/app/(admin)/awards" src/components/forms/testimonial-form.tsx src/components/forms/award-form.tsx
git commit -m "feat: testimonials and awards crud"
```

---

### Task 7: Dashboard counts for all domains

**Files:**
- Modify: `src/app/(admin)/page.tsx`

- [ ] **Step 1: Extend**

Count every domain (projects, experiences, skills, capabilities, testimonials,
awards) and render a card each, linking to its list.

- [ ] **Step 2: Verify**

Counts match each list.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(admin)/page.tsx"
git commit -m "feat: dashboard counts for all domains"
```

---

### Task 8: Verify Phase 7

- [ ] **Step 1: Build + tests**

Run: `bun run build` then `bun test`
Expected: clean.

- [ ] **Step 2: Domain coverage check**

Confirm every domain in PRD §5.1 has a list and an edit path.

- [ ] **Step 3: Mark roadmap**

Tick Phase 7 boxes in `docs/ROADMAP.md`.

- [ ] **Step 4: Commit**

```bash
git add docs/ROADMAP.md
git commit -m "docs: mark phase 7 complete"
```
