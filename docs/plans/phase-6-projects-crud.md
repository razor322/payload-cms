# Phase 6 — Projects CRUD Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Full create/read/update/delete/reorder for projects, plus image upload, all through Server Actions.

**Architecture:** A `projects` repository module wraps the service-role client. `actions/projects.ts` holds `"use server"` functions that guard, validate with `projectInputSchema`, write, and `revalidatePath`. The list is a Server Component; the form is a client component posting to actions.

**Tech Stack:** Next.js Server Actions, Supabase, Zod, React.

## Global Constraints

- No `/api` route; writes are Server Actions only.
- Every action starts with `requireAdmin()` then `projectInputSchema.parse`.
- Service-role client only; never the anon client for writes.
- Array fields (highlights, tech) edited as reorderable lists using `reorder` (Phase 2).

---

### Task 1: Projects repository

**Files:**
- Create: `src/lib/repositories/projects.ts`

**Interfaces:**
- Consumes: `createAdminClient`, `projectInputSchema`, `ProjectInput`.
- Produces: `listProjects()`, `getProject(id)`, `insertProject(input)`, `updateProject(id, input)`, `deleteProject(id)`, `setProjectOrder(ids: string[])`.

- [ ] **Step 1: Write the repository**

`src/lib/repositories/projects.ts`:

```ts
import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { projectInputSchema, type ProjectInput } from "@/lib/schema";

export async function listProjects() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("projects").select("*").order("sort", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getProject(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("projects").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function insertProject(input: ProjectInput) {
  const supabase = createAdminClient();
  const row = projectInputSchema.parse(input);
  const { data, error } = await supabase.from("projects").insert(row).select().single();
  if (error) throw error;
  return data;
}

export async function updateProject(id: string, input: ProjectInput) {
  const supabase = createAdminClient();
  const row = projectInputSchema.parse(input);
  const { data, error } = await supabase
    .from("projects").update(row).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

export async function setProjectOrder(ids: string[]) {
  const supabase = createAdminClient();
  await Promise.all(
    ids.map((id, index) =>
      supabase.from("projects").update({ sort: index }).eq("id", id),
    ),
  );
}
```

- [ ] **Step 2: Type-check**

Run: `bun run build`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/lib/repositories/projects.ts
git commit -m "feat: projects repository"
```

---

### Task 2: Projects server actions

**Files:**
- Create: `src/actions/projects.ts`

**Interfaces:**
- Consumes: `requireAdmin`, repository, `projectInputSchema`.
- Produces: `createProject`, `updateProjectAction`, `deleteProjectAction`, `reorderProjects`.

- [ ] **Step 1: Write the actions**

`src/actions/projects.ts`:

```ts
"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { projectInputSchema } from "@/lib/schema";
import * as repo from "@/lib/repositories/projects";

function parse(formData: FormData) {
  return projectInputSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    role: formData.get("role") ?? "",
    subtitle: formData.get("subtitle") || undefined,
    description: formData.get("description") ?? "",
    impact: formData.get("impact") || undefined,
    highlights: formData.getAll("highlights").map(String).filter(Boolean),
    tech: formData.getAll("tech").map(String).filter(Boolean),
    github: formData.get("github") ?? "",
    live: formData.get("live") ?? "",
    image_url: formData.get("image_url") ?? "",
    featured: formData.get("featured") === "on",
    year: formData.get("year") ?? "",
    category: formData.get("category") || undefined,
    status: formData.get("status") || undefined,
    sort: Number(formData.get("sort") ?? 0),
  });
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  await repo.insertProject(parse(formData));
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function updateProjectAction(id: string, formData: FormData) {
  await requireAdmin();
  await repo.updateProject(id, parse(formData));
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function deleteProjectAction(id: string) {
  await requireAdmin();
  await repo.deleteProject(id);
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function reorderProjects(ids: string[]) {
  await requireAdmin();
  await repo.setProjectOrder(ids);
  revalidatePath("/projects");
}
```

- [ ] **Step 2: Type-check**

Run: `bun run build`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/actions/projects.ts
git commit -m "feat: projects server actions"
```

---

### Task 3: Image upload action

**Files:**
- Create: `src/actions/upload.ts`

**Interfaces:**
- Consumes: `requireAdmin`, `createAdminClient`.
- Produces: `uploadProjectImage(formData): Promise<string>` (public URL).

- [ ] **Step 1: Write the action**

`src/actions/upload.ts`:

```ts
"use server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function uploadProjectImage(formData: FormData): Promise<string> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file provided");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Not an image");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image too large (max 5MB)");
  }
  const supabase = createAdminClient();
  const ext = file.name.split(".").pop() ?? "webp";
  const path = `projects/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("portfolio")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
  return data.publicUrl;
}
```

- [ ] **Step 2: Type-check**

Run: `bun run build`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/actions/upload.ts
git commit -m "feat: project image upload action"
```

---

### Task 4: ArrayField component

**Files:**
- Create: `src/components/forms/array-field.tsx`

**Interfaces:**
- Consumes: `reorder` (Phase 2), `Input`, `Button`.
- Produces: `ArrayField` client component: `name`, `defaultValues: string[]`.

- [ ] **Step 1: Write it**

`src/components/forms/array-field.tsx` (`"use client"`): keeps `items` in state,
renders one `Input name={name}` per item, an Add button (appends ""), a Remove per
row, and Up/Down buttons that call `reorder`. Each row's input carries the same
`name` so `formData.getAll(name)` returns them in order.

- [ ] **Step 2: Verify**

Render with two defaults; add, remove, move; confirm input values reorder.
Stop dev server after.

- [ ] **Step 3: Commit**

```bash
git add src/components/forms/array-field.tsx
git commit -m "feat: array field editor"
```

---

### Task 5: ImageUpload component

**Files:**
- Create: `src/components/forms/image-upload.tsx`

**Interfaces:**
- Consumes: `uploadProjectImage`.
- Produces: `ImageUpload`: `name`, `defaultUrl`.

- [ ] **Step 1: Write it**

`src/components/forms/image-upload.tsx` (`"use client"`): a file input plus a
hidden `input name={name}` (the URL). On file select, build `FormData`, call the
action, set the URL state, show a preview via `<img>`. Show loading and error text.

- [ ] **Step 2: Verify**

Upload a small image; confirm a public URL appears and previews.
Stop dev server after.

- [ ] **Step 3: Commit**

```bash
git add src/components/forms/image-upload.tsx
git commit -m "feat: image upload field"
```

---

### Task 6: Projects list page

**Files:**
- Create: `src/app/(admin)/projects/page.tsx`

**Interfaces:**
- Consumes: `listProjects`, `deleteProjectAction`, `reorderProjects`.
- Produces: the list screen with empty state.

- [ ] **Step 1: Write the page**

Server Component: `requireAdmin()`, `listProjects()`. If empty, render `<Empty>`
with a link to `/projects/new`. Otherwise render a `Table` with columns: title,
slug, year, featured (Badge), and row actions (Edit link, Up/Down calling
`reorderProjects`, `ConfirmButton` for delete). Add a "New project" `Button`
linking to `/projects/new`.

- [ ] **Step 2: Verify**

Visit `/projects`; if seeded, rows show; descending/up reorders and persists.
Stop dev server after.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(admin)/projects/page.tsx"
git commit -m "feat: projects list"
```

---

### Task 7: Project form page (create + edit)

**Files:**
- Create: `src/components/forms/project-form.tsx`
- Create: `src/app/(admin)/projects/new/page.tsx`
- Create: `src/app/(admin)/projects/[id]/page.tsx`

**Interfaces:**
- Consumes: `createProject`, `updateProjectAction`, `ArrayField`, `ImageUpload`, `projectInputSchema`.
- Produces: create and edit screens sharing one form component.

- [ ] **Step 1: Write `ProjectForm`**

`src/components/forms/project-form.tsx` (`"use client"`): a `<form>` whose
`action` is a bound Server Action. Fields: slug, title, role, subtitle,
description (Textarea), impact (Textarea), `ArrayField name="highlights"`,
`ArrayField name="tech"`, github, live, `ImageUpload name="image_url"`, featured
(Checkbox), year, category, status, sort (number). Submit button. On `useFormStatus`
pending, disable submit and show "Saving".

- [ ] **Step 2: Write the create page**

`src/app/(admin)/projects/new/page.tsx`: Server Component; renders `ProjectForm`
with `createProject` and empty defaults.

- [ ] **Step 3: Write the edit page**

`src/app/(admin)/projects/[id]/page.tsx`: Server Component; `getProject(id)`,
`notFound()` if missing; renders `ProjectForm` with
`updateProjectAction.bind(null, id)` and row defaults.

- [ ] **Step 4: Verify**

Create a new project; confirm it appears on `/projects` and in the DB (Supabase
table editor). Edit it; confirm the change persists. Delete it; confirm removal.

- [ ] **Step 5: Commit**

```bash
git add src/components/forms/project-form.tsx "src/app/(admin)/projects/new/page.tsx" "src/app/(admin)/projects/[id]/page.tsx"
git commit -m "feat: project create and edit"
```

---

### Task 8: Dashboard counts

**Files:**
- Modify: `src/app/(admin)/page.tsx`

**Interfaces:**
- Consumes: `listProjects`.
- Produces: dashboard cards with counts + quick links.

- [ ] **Step 1: Write it**

Server Component: `requireAdmin()`; count projects (extend later per domain);
render `Card`s with counts and links to each list.

- [ ] **Step 2: Verify**

Visit `/`; counts match the lists.
Stop dev server after.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(admin)/page.tsx"
git commit -m "feat: dashboard counts"
```

---

### Task 9: Verify Phase 6

- [ ] **Step 1: Build + tests**

Run: `bun run build` then `bun test`
Expected: clean.

- [ ] **Step 2: Click-through (antislop R-35)**

Create → list shows it; edit → persists; reorder → persists; upload → URL +
preview; delete → gone. Record each result.

- [ ] **Step 3: Mark roadmap**

Tick Phase 6 boxes in `docs/ROADMAP.md`.

- [ ] **Step 4: Commit**

```bash
git add docs/ROADMAP.md
git commit -m "docs: mark phase 6 complete"
```
