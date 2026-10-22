# Phase 1 — Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A running Next.js app in `web-admin/` with the neobrutalism base, env templates, and Vitest wired.

**Architecture:** Standalone Next.js App Router app, TypeScript strict, Tailwind v4, shadcn/ui initialized, package manager bun. No Supabase or features yet; just a bootable, testable shell.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS v4, shadcn/ui, Vitest, bun.

## Global Constraints

- Package manager: **bun** (never npm/yarn/pnpm).
- TypeScript `strict: true`.
- Path alias `@/*` → `./src/*`.
- No `/api` route anywhere in this app.
- Node 20+.

---

### Task 1: Create the Next.js app

**Files:**
- Create: `web-admin/src/app/**`, `web-admin/package.json`, `web-admin/tsconfig.json`, `web-admin/next.config.ts`, `web-admin/eslint.config.mjs`, `web-admin/postcss.config.mjs`

**Interfaces:**
- Consumes: nothing.
- Produces: a bootable Next app on `src/` layout with `@/*` alias.

- [ ] **Step 1: Run create-next-app in place**

Run (in the repo root; `docs/` already exists so confirm
in-place init and keep `docs/`):

```bash
bun create next-app@latest . --ts --app --tailwind --eslint --src-dir --import-alias "@/*" --use-bun --no-turbopack
```

- [ ] **Step 2: Verify dev server boots**

Run: `bun dev`
Expected: server starts on http://localhost:3000 with no errors. Stop it (Ctrl+C).

- [ ] **Step 3: Verify build passes**

Run: `bun run build`
Expected: build completes, no type errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: scaffold next.js app in web-admin"
```

---

### Task 2: Add dependencies

**Files:**
- Modify: `web-admin/package.json`

**Interfaces:**
- Consumes: Task 1 app.
- Produces: `@supabase/supabase-js`, `@supabase/ssr`, `zod`, `vitest`.

- [ ] **Step 1: Install runtime deps**

```bash
bun add @supabase/supabase-js @supabase/ssr zod
```

- [ ] **Step 2: Install dev deps**

```bash
bun add -d vitest @vitejs/plugin-react
```

- [ ] **Step 3: Verify install**

Run: `bun pm ls | Select-String "supabase|zod|vitest"`
Expected: the packages listed.

- [ ] **Step 4: Commit**

```bash
git add package.json bun.lock
git commit -m "chore: add supabase, zod, vitest deps"
```

---

### Task 3: Initialize shadcn/ui

**Files:**
- Create: `web-admin/components.json`, `web-admin/src/lib/utils.ts`
- Modify: `web-admin/src/app/globals.css`

**Interfaces:**
- Consumes: Task 2 deps.
- Produces: `cn()` in `src/lib/utils.ts`; shadcn registry configured.

- [ ] **Step 1: Init shadcn**

```bash
bunx --bun shadcn@latest init
```

Choose: base color neutral, CSS variables yes.

- [ ] **Step 2: Verify utils export**

Run: `bun run build`
Expected: build passes; `src/lib/utils.ts` exists and exports `cn`.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: init shadcn/ui"
```

---

### Task 4: Neobrutalism tokens

**Files:**
- Modify: `web-admin/src/app/globals.css`

**Interfaces:**
- Consumes: Task 3 shadcn variables.
- Produces: `--background`, `--foreground`, `--accent`, `--border-brutal`, `--shadow-brutal`, `--radius`.

- [ ] **Step 1: Set the token block**

Add inside `:root` (keep shadcn's other variables):

```css
:root {
  --background: #fdf6e3;
  --foreground: #0b0b0b;
  --accent: #ff5c00;
  --border-brutal: 3px solid var(--foreground);
  --shadow-brutal: 6px 6px 0 var(--foreground);
  --radius: 0px;
}
```

- [ ] **Step 2: Verify visually**

Run: `bun dev`, open http://localhost:3000.
Expected: page uses the paper background / ink text. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add neobrutalism tokens"
```

---

### Task 5: Env templates

**Files:**
- Create: `web-admin/.env.example`
- Create: `web-admin/.env.local`

**Interfaces:**
- Consumes: nothing.
- Produces: documented env contract used by Phases 3–4.

- [ ] **Step 1: Write `.env.example`**

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>
ADMIN_EMAIL=you@example.com
```

- [ ] **Step 2: Write `.env.local`**

Same keys with the real values (or placeholders if the Supabase project does not
exist yet).

- [ ] **Step 3: Confirm git ignore**

Run: `git check-ignore .env.local`
Expected: prints `.env.local` (ignored). If not, add `.env*.local` to `.gitignore`.

- [ ] **Step 4: Commit**

```bash
git add .env.example .gitignore
git commit -m "chore: add env templates"
```

---

### Task 6: Vitest + smoke test

**Files:**
- Create: `web-admin/vitest.config.mts`, `web-admin/tests/smoke.test.ts`
- Modify: `web-admin/package.json`

**Interfaces:**
- Consumes: Task 2 vitest.
- Produces: `bun test` runs `tests/**/*.test.ts`.

- [ ] **Step 1: Write the failing test**

`tests/smoke.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("smoke", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });
});
```

- [ ] **Step 2: Add vitest config**

`vitest.config.mts`:

```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: { environment: "node", include: ["tests/**/*.test.ts"] },
});
```

- [ ] **Step 3: Add test scripts**

In `package.json` `scripts`: `"test": "vitest run"`, `"test:watch": "vitest"`.

- [ ] **Step 4: Run the test**

Run: `bun test`
Expected: PASS (1 test).

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts tests/smoke.test.ts package.json
git commit -m "test: wire vitest with smoke test"
```

---

### Task 7: Verify Phase 1

- [ ] **Step 1: Full check**

Run: `bun run build` then `bun test`
Expected: build clean, tests green.

- [ ] **Step 2: Mark roadmap**

In `docs/ROADMAP.md`, tick every Phase 1 box.

- [ ] **Step 3: Commit**

```bash
git add docs/ROADMAP.md
git commit -m "docs: mark phase 1 complete"
```
