# Phase 8 — Content Contract Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A frozen, typed JSON contract that the three portfolios consume, plus mapping notes for the rewire pass.

**Architecture:** `src/contract/types.ts` is the single source of the read shape. Mappers in `src/lib/mappers` convert rows to contract values. A documented mapping table tells each portfolio how to translate the contract into its existing view-models. The rewire itself is deferred to a second execution pass.

**Tech Stack:** TypeScript, Zod (optional validation of the contract).

## Global Constraints

- The contract is read-only and stable; additive changes only.
- Contract fields use the sites' existing vocabulary (image, github, live, tech, highlights).
- No portfolio code is modified in this phase.

---

### Task 1: Freeze the contract types

**Files:**
- Modify: `src/contract/types.ts`
- Test: `tests/mappers.contract.test.ts` (extend)

**Interfaces:**
- Consumes: nothing new.
- Produces: `ContractProject`, `ContractExperience`, `ContractCapability`, `ContractSkill`, `ContractTerminalLine`, `ContractTestimonial`, `ContractAward`, `ContractProfile`, `ContractPayload`.

- [ ] **Step 1: Write the failing test for a payload**

Append to `tests/mappers.contract.test.ts`:

```ts
import { toContractPayload } from "@/lib/mappers/contract";

it("builds a payload with all sections", () => {
  const payload = toContractPayload({
    profile: { name: "G", role: "Eng", location: "Padang", email: "", website: "",
      avatar_url: "", intro: "", socials: {} },
    projects: [], experiences: [], capabilities: [], skills: [],
    terminal_lines: [], testimonials: [], awards: [],
  });
  expect(payload.profile.name).toBe("G");
  expect(payload.projects).toEqual([]);
});
```

- [ ] **Step 2: Run to fail**

Run: `bun test tests/mappers.contract.test.ts`
Expected: FAIL (`toContractPayload` missing).

- [ ] **Step 3: Add the types**

`src/contract/types.ts` (append):

```ts
export type ContractExperience = {
  id: string; company: string; position: string; period: string;
  location: string; type: string; duration: string; mode: string; role: string;
  summary: string; outcomes: string[]; stack: string[];
};

export type ContractCapability = {
  id: string; title: string; description: string; tags: string[];
};
export type ContractSkill = { id: string; category: string; name: string; iconKey: string };
export type ContractTerminalLine = {
  id: string; text: string; delay: number; colorClass: string;
  bold: boolean; isCursor: boolean;
};
export type ContractTestimonial = {
  id: string; name: string; role: string; quote: string; avatar: string;
};
export type ContractAward = {
  id: string; kind: string; title: string; org: string; year: string; description: string;
};
export type ContractProfile = {
  name: string; role: string; location: string; email: string; website: string;
  avatar: string; intro: string; socials: Record<string, string>;
};

export type ContractPayload = {
  profile: ContractProfile;
  projects: ContractProject[];
  experiences: ContractExperience[];
  capabilities: ContractCapability[];
  skills: ContractSkill[];
  terminal_lines: ContractTerminalLine[];
  testimonials: ContractTestimonial[];
  awards: ContractAward[];
};
```

- [ ] **Step 4: Add `toContractPayload`**

`src/lib/mappers/contract.ts` (append): accept the raw table rows keyed by name,
map each list with its row mapper, and map the profile. Only `site='all'` or the
target site should be selected upstream; the mapper does not filter.

- [ ] **Step 5: Run to pass**

Run: `bun test tests/mappers.contract.test.ts`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/contract/types.ts src/lib/mappers/contract.ts tests/mappers.contract.test.ts
git commit -m "feat: content contract types and payload mapper"
```

---

### Task 2: Mapping documentation

**Files:**
- Create: `docs/CONTRACT.md`

**Interfaces:**
- Consumes: the contract types.
- Produces: per-site mapping notes for the rewire pass.

- [ ] **Step 1: Write the doc**

`docs/CONTRACT.md` includes:

- The full JSON shape (one example payload).
- A table per portfolio: contract field → that site's current field.

  portfolio-v3 `app/data/projects.ts`: `image_url` → `image`, `tech` → `tech`,
  `highlights` → `highlights`, `github`/`live`/`year`/`category`/`status` → same.

  MYportfolio `projects-section-content.ts`: `title` → `name`, `image_url` →
  `image`, `tech` → `stack`, `description`/`impact` → same, add derived
  `category`/`status`.

  minimal-dev-portfolio `features/portfolio/data/projects.ts`: `title`,
  `description`, `skills` (from `tech`), `link` (from `live` or `github`).

- A note that `site='all'` rows are shared and a site-specific row overrides.

- The rewire recipe: each portfolio adds a GET-only route (e.g.
  `app/api/content/route.ts`) that reads Supabase with the anon key, maps to the
  contract, and returns JSON; the existing data modules then read from that route
  at build/revalidate time.

- [ ] **Step 2: Commit**

```bash
git add docs/CONTRACT.md
git commit -m "docs: content contract mapping"
```

---

### Task 3: Verify Phase 8

- [ ] **Step 1: Build + tests**

Run: `bun run build` then `bun test`
Expected: clean; contract mapper tests pass.

- [ ] **Step 2: Mark roadmap**

Tick Phase 8 boxes in `docs/ROADMAP.md`.

- [ ] **Step 3: Commit**

```bash
git add docs/ROADMAP.md
git commit -m "docs: mark phase 8 complete"
```
