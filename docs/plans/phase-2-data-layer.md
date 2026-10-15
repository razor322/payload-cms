# Phase 2 — Data Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pure, test-covered modules for validation, mapping, reordering, and the admin predicate. No database, no network.

**Architecture:** `src/lib` holds pure functions only. Zod defines each domain; mappers convert between DB rows, form values, and the portfolio contract; `reorder` moves an item in a list; `auth.isAdminEmail` decides access. All are written test-first (RED → GREEN).

**Tech Stack:** TypeScript, Zod, Vitest.

## Global Constraints

- TDD: write the failing test first, watch it fail, then write minimal code.
- Pure modules must not import Supabase or `next/*`.
- TypeScript strict.
- Tests live in `tests/`, one file per module.

---

### Task 1: Project schema

**Files:**
- Create: `src/lib/schema.ts`
- Test: `tests/schema.test.ts`

**Interfaces:**
- Consumes: `zod`.
- Produces: `projectInputSchema` (Zod object) and `type ProjectInput = z.infer<typeof projectInputSchema>`.

- [ ] **Step 1: Write the failing test**

`tests/schema.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { projectInputSchema } from "@/lib/schema";

const valid = {
  slug: "dzikra",
  title: "Dzikra",
  role: "Mobile Developer",
  description: "Habit app.",
  tech: ["Flutter", "Dart"],
  highlights: ["Live on Play Store"],
  featured: true,
  year: "2024",
  sort: 0,
};

describe("projectInputSchema", () => {
  it("accepts a valid project", () => {
    expect(projectInputSchema.parse(valid).slug).toBe("dzikra");
  });
  it("defaults arrays and sort", () => {
    const parsed = projectInputSchema.parse({ slug: "x", title: "X" });
    expect(parsed.tech).toEqual([]);
    expect(parsed.highlights).toEqual([]);
    expect(parsed.featured).toBe(false);
  });
  it("rejects a bad slug", () => {
    expect(() => projectInputSchema.parse({ ...valid, slug: "Bad Slug!" })).toThrow();
  });
  it("rejects a missing title", () => {
    expect(() => projectInputSchema.parse({ slug: "x" })).toThrow();
  });
});
```

- [ ] **Step 2: Run it to fail**

Run: `bun test tests/schema.test.ts`
Expected: FAIL (cannot resolve `@/lib/schema`).

- [ ] **Step 3: Write the schema**

`src/lib/schema.ts`:

```ts
import { z } from "zod";

export const projectInputSchema = z.object({
  slug: z.string().trim().regex(/^[a-z0-9-]+$/, "lowercase, digits, dashes only"),
  title: z.string().trim().min(1),
  role: z.string().trim().default(""),
  subtitle: z.string().trim().optional(),
  description: z.string().trim().default(""),
  impact: z.string().trim().optional(),
  highlights: z.array(z.string().trim().min(1)).default([]),
  tech: z.array(z.string().trim().min(1)).default([]),
  github: z.string().trim().default(""),
  live: z.string().trim().default(""),
  image_url: z.string().trim().default(""),
  featured: z.boolean().default(false),
  year: z.string().trim().default(""),
  category: z.string().trim().optional(),
  status: z.string().trim().optional(),
  sort: z.number().int().default(0),
});

export type ProjectInput = z.infer<typeof projectInputSchema>;
```

- [ ] **Step 4: Run to pass**

Run: `bun test tests/schema.test.ts`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/schema.ts tests/schema.test.ts
git commit -m "feat: project input schema"
```

---

### Task 2: Remaining domain schemas

**Files:**
- Modify: `src/lib/schema.ts`
- Test: `tests/schema.domains.test.ts`

**Interfaces:**
- Consumes: Task 1 file.
- Produces: `experienceInputSchema`, `skillInputSchema`, `capabilityInputSchema`, `headerInputSchema`, `profileInputSchema`, `testimonialInputSchema`, `awardInputSchema` and their inferred types.

- [ ] **Step 1: Write the failing tests**

`tests/schema.domains.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  experienceInputSchema,
  skillInputSchema,
  profileInputSchema,
} from "@/lib/schema";

describe("domain schemas", () => {
  it("experience defaults arrays", () => {
    const p = experienceInputSchema.parse({ company: "Halcom", position: "Dev" });
    expect(p.outcomes).toEqual([]);
    expect(p.stack).toEqual([]);
  });
  it("skill requires name", () => {
    expect(() => skillInputSchema.parse({ name: "" })).toThrow();
  });
  it("profile requires a name", () => {
    expect(() => profileInputSchema.parse({})).toThrow();
  });
});
```

- [ ] **Step 2: Run to fail**

Run: `bun test tests/schema.domains.test.ts`
Expected: FAIL (exports missing).

- [ ] **Step 3: Add the schemas**

Append to `src/lib/schema.ts`:

```ts
const siteEnum = z.enum(["v3", "my", "minimal", "all"]);

export const experienceInputSchema = z.object({
  ext_id: z.string().trim().optional(),
  company: z.string().trim().min(1),
  position: z.string().trim().min(1),
  period: z.string().trim().default(""),
  location: z.string().trim().default(""),
  type: z.string().trim().default(""),
  duration: z.string().trim().default(""),
  mode: z.string().trim().default(""),
  role: z.string().trim().default(""),
  summary: z.string().trim().default(""),
  outcomes: z.array(z.string().trim().min(1)).default([]),
  stack: z.array(z.string().trim().min(1)).default([]),
  sort: z.number().int().default(0),
});

export const skillInputSchema = z.object({
  site: siteEnum.default("all"),
  category: z.string().trim().default(""),
  name: z.string().trim().min(1),
  icon_key: z.string().trim().default(""),
  sort: z.number().int().default(0),
});

export const capabilityInputSchema = z.object({
  site: siteEnum.default("all"),
  title: z.string().trim().min(1),
  description: z.string().trim().default(""),
  tags: z.array(z.string().trim().min(1)).default([]),
  sort: z.number().int().default(0),
});

export const headerInputSchema = z.object({
  site: siteEnum,
  section: z.string().trim().min(1),
  left_kicker: z.string().trim().default(""),
  left_title: z.string().trim().default(""),
  middle_kicker: z.string().trim().default(""),
  middle_title: z.string().trim().default(""),
  right_kicker: z.string().trim().default(""),
  right_title: z.string().trim().default(""),
});

export const profileInputSchema = z.object({
  name: z.string().trim().min(1),
  role: z.string().trim().default(""),
  location: z.string().trim().default(""),
  email: z.string().trim().email().or(z.literal("")).default(""),
  website: z.string().trim().default(""),
  avatar_url: z.string().trim().default(""),
  intro: z.string().trim().default(""),
  socials: z.record(z.string(), z.string()).default({}),
});

export const testimonialInputSchema = z.object({
  site: siteEnum.default("all"),
  name: z.string().trim().min(1),
  role: z.string().trim().default(""),
  quote: z.string().trim().min(1),
  avatar_url: z.string().trim().default(""),
  sort: z.number().int().default(0),
});

export const awardInputSchema = z.object({
  site: siteEnum.default("all"),
  kind: z.string().trim().default(""),
  title: z.string().trim().min(1),
  org: z.string().trim().default(""),
  year: z.string().trim().default(""),
  description: z.string().trim().default(""),
  sort: z.number().int().default(0),
});

export type ExperienceInput = z.infer<typeof experienceInputSchema>;
export type SkillInput = z.infer<typeof skillInputSchema>;
export type CapabilityInput = z.infer<typeof capabilityInputSchema>;
export type HeaderInput = z.infer<typeof headerInputSchema>;
export type ProfileInput = z.infer<typeof profileInputSchema>;
export type TestimonialInput = z.infer<typeof testimonialInputSchema>;
export type AwardInput = z.infer<typeof awardInputSchema>;
export type Site = z.infer<typeof siteEnum>;
```

- [ ] **Step 4: Run to pass**

Run: `bun test tests/schema.domains.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/schema.ts tests/schema.domains.test.ts
git commit -m "feat: domain input schemas"
```

---

### Task 3: Reorder helper

**Files:**
- Create: `src/lib/reorder.ts`
- Test: `tests/reorder.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `reorder<T>(list: T[], from: number, to: number): T[]`.

- [ ] **Step 1: Write the failing test**

`tests/reorder.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { reorder } from "@/lib/reorder";

describe("reorder", () => {
  it("moves an item down", () => {
    expect(reorder(["a", "b", "c"], 0, 2)).toEqual(["b", "c", "a"]);
  });
  it("moves an item up", () => {
    expect(reorder(["a", "b", "c"], 2, 0)).toEqual(["c", "a", "b"]);
  });
  it("returns a copy when from === to", () => {
    const src = ["a", "b"];
    const out = reorder(src, 1, 1);
    expect(out).toEqual(src);
    expect(out).not.toBe(src);
  });
  it("clamps out-of-range indices", () => {
    expect(reorder(["a", "b"], 0, 99)).toEqual(["b", "a"]);
  });
});
```

- [ ] **Step 2: Run to fail**

Run: `bun test tests/reorder.test.ts`
Expected: FAIL (module missing).

- [ ] **Step 3: Implement**

`src/lib/reorder.ts`:

```ts
export function reorder<T>(list: readonly T[], from: number, to: number): T[] {
  const next = list.slice();
  if (next.length === 0) return next;
  const f = Math.max(0, Math.min(from, next.length - 1));
  const t = Math.max(0, Math.min(to, next.length - 1));
  const [item] = next.splice(f, 1);
  next.splice(t, 0, item);
  return next;
}
```

- [ ] **Step 4: Run to pass**

Run: `bun test tests/reorder.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/reorder.ts tests/reorder.test.ts
git commit -m "feat: reorder helper"
```

---

### Task 4: Auth predicate

**Files:**
- Create: `src/lib/auth-predicate.ts`
- Test: `tests/auth-predicate.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `isAdminEmail(email: string | null | undefined, adminEmail: string | undefined): boolean`.

- [ ] **Step 1: Write the failing test**

`tests/auth-predicate.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { isAdminEmail } from "@/lib/auth-predicate";

describe("isAdminEmail", () => {
  it("true on exact match", () => {
    expect(isAdminEmail("a@b.com", "a@b.com")).toBe(true);
  });
  it("case-insensitive and trims", () => {
    expect(isAdminEmail(" A@B.com ", "a@b.com")).toBe(true);
  });
  it("false on different email", () => {
    expect(isAdminEmail("x@y.com", "a@b.com")).toBe(false);
  });
  it("false when admin unset", () => {
    expect(isAdminEmail("a@b.com", undefined)).toBe(false);
  });
  it("false when email null", () => {
    expect(isAdminEmail(null, "a@b.com")).toBe(false);
  });
});
```

- [ ] **Step 2: Run to fail**

Run: `bun test tests/auth-predicate.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement**

`src/lib/auth-predicate.ts` (separate from `lib/auth.ts` so it imports no Next/Supabase):

```ts
export function isAdminEmail(
  email: string | null | undefined,
  adminEmail: string | undefined,
): boolean {
  if (!email || !adminEmail) return false;
  return email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
}
```

- [ ] **Step 4: Run to pass**

Run: `bun test tests/auth-predicate.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/auth-predicate.ts tests/auth-predicate.test.ts
git commit -m "feat: admin email predicate"
```

---

### Task 5: Row → contract mappers

**Files:**
- Create: `src/contract/types.ts`
- Create: `src/lib/mappers/contract.ts`
- Test: `tests/mappers.contract.test.ts`

**Interfaces:**
- Consumes: row shapes.
- Produces: `toContractProject(row)`, plus `ContractProject` type.

- [ ] **Step 1: Write the failing test**

`tests/mappers.contract.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { toContractProject } from "@/lib/mappers/contract";

describe("toContractProject", () => {
  it("passes through core fields with defaults", () => {
    const out = toContractProject({
      id: "1", slug: "dzikra", title: "Dzikra", role: "Dev",
      subtitle: null, description: "d", impact: null,
      highlights: null, tech: ["Flutter"], github: "", live: "",
      image_url: "/a.webp", featured: true, year: "2024",
      category: null, status: null, sort: 0,
    });
    expect(out.slug).toBe("dzikra");
    expect(out.tech).toEqual(["Flutter"]);
    expect(out.highlights).toEqual([]);
    expect(out.subtitle).toBeUndefined();
  });
});
```

- [ ] **Step 2: Run to fail**

Run: `bun test tests/mappers.contract.test.ts`
Expected: FAIL.

- [ ] **Step 3: Write contract types and mapper**

`src/contract/types.ts`:

```ts
export type ContractProject = {
  slug: string;
  title: string;
  role: string;
  subtitle?: string;
  description: string;
  impact?: string;
  highlights: string[];
  tech: string[];
  github: string;
  live: string;
  image: string;
  featured: boolean;
  year: string;
  category?: string;
  status?: string;
};
```

`src/lib/mappers/contract.ts`:

```ts
import type { ContractProject } from "@/contract/types";

type ProjectRow = {
  id: string; slug: string; title: string; role: string;
  subtitle: string | null; description: string; impact: string | null;
  highlights: string[] | null; tech: string[] | null;
  github: string; live: string; image_url: string;
  featured: boolean; year: string; category: string | null;
  status: string | null; sort: number;
};

export function toContractProject(row: ProjectRow): ContractProject {
  return {
    slug: row.slug,
    title: row.title,
    role: row.role,
    subtitle: row.subtitle ?? undefined,
    description: row.description,
    impact: row.impact ?? undefined,
    highlights: row.highlights ?? [],
    tech: row.tech ?? [],
    github: row.github,
    live: row.live,
    image: row.image_url,
    featured: row.featured,
    year: row.year,
    category: row.category ?? undefined,
    status: row.status ?? undefined,
  };
}
```

- [ ] **Step 4: Run to pass**

Run: `bun test tests/mappers.contract.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/contract/types.ts src/lib/mappers/contract.ts tests/mappers.contract.test.ts
git commit -m "feat: row to contract project mapper"
```

---

### Task 6: Verify Phase 2

- [ ] **Step 1: Run the whole suite**

Run: `bun test`
Expected: all green.

- [ ] **Step 2: Type check via build**

Run: `bun run build`
Expected: no type errors.

- [ ] **Step 3: Mark roadmap**

Tick Phase 2 boxes in `docs/ROADMAP.md`.

- [ ] **Step 4: Commit**

```bash
git add docs/ROADMAP.md
git commit -m "docs: mark phase 2 complete"
```
