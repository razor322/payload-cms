# Configuration — Web Admin Portofolio

## 1. Prerequisites

| Tool | Version | Notes |
|---|---|---|
| bun | latest | package manager (owner choice) |
| Node.js | 20+ | Next.js runtime |
| Supabase project | one | shared by admin + 3 portfolios |
| git | any | version control |

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill real values. `.env.local` is
git-ignored and must never be committed.

```dotenv
# Supabase project URL (safe to expose)
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co

# Anon/publishable key (safe to expose; RLS restricts it to SELECT)
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>

# Service-role key. SERVER ONLY. Never prefix with NEXT_PUBLIC_.
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>

# The single allowed admin email. Any other signed-in user is rejected.
ADMIN_EMAIL=owner@example.com
```

| Variable | Scope | Exposed to browser | Used by |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | public | yes | cookie client, service client |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | public | yes | cookie client |
| `SUPABASE_SERVICE_ROLE_KEY` | server | **no** | write actions only |
| `ADMIN_EMAIL` | server | no | middleware, `requireAdmin` |

`.env.example` ships with placeholder values and no secrets.

## 3. Dependencies

```text
runtime:  next  react  react-dom
          @supabase/supabase-js  @supabase/ssr
          zod
          tailwindcss (v4)  @tailwindcss/postcss
          shadcn/ui components (radix primitives as needed)
          class-variance-authority  clsx  tailwind-merge
dev:      typescript  @types/node  @types/react  @types/react-dom
          eslint  eslint-config-next
          vitest  @vitejs/plugin-react
```

Install:

```bash
bun add @supabase/supabase-js@2.117.0 @supabase/ssr zod server-only
bun add -d vitest @vitejs/plugin-react
```

Note: `@supabase/supabase-js@2.118.0` pins an unpublished sub-dependency
(`@supabase/functions-js@2.118.0`). Pin `2.117.0` until upstream publishes it.

## 4. Scripts (`package.json`)

```jsonc
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

## 5. Tooling configuration

### 5.1 `tsconfig.json`

- `"strict": true`
- path alias `"@/*": ["./src/*"]` (set by `create-next-app --import-alias "@/*"`)

### 5.2 `vitest.config.mts`

`.mts` (not `.ts`) so Vite loads it as ESM without a CommonJS warning.

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
```

### 5.3 `next.config.ts`

Default from `create-next-app`. If remote images are used, add
`images.remotePatterns` for the Supabase storage host.

### 5.4 Tailwind / neobrutalism tokens (`src/app/globals.css`)

```css
:root {
  --background: #fdf6e3;      /* warm paper, high contrast against ink */
  --foreground: #0b0b0b;      /* near-black ink */
  --accent: #ff5c00;          /* single accent, from the portfolio palette */
  --border-brutal: 3px solid var(--foreground);
  --shadow-brutal: 6px 6px 0 var(--foreground);
  --radius: 0px;              /* square corners are the identity */
}
```

Reason (R-31): warm paper + near-black keep AA contrast; one accent prevents a
rainbow; zero radius and hard offset shadows are the neobrutalist signature.

## 6. Supabase setup

1. Create a project. Record the URL, anon key, service-role key.
2. **Auth → Providers:** enable Email. **Auth → Sign-ups:** disable (no public signup).
3. **Auth → Users:** create the single admin user manually (email + password).
4. **Storage:** create a public bucket named `portfolio`.
5. Apply migrations (see §6.1).
6. Delete old harness files if migrating from a previous attempt.

### 6.1 Applying migrations

Run the SQL in `supabase/migrations/0001_schema.sql`, then `0002_rls.sql`, then
`seed.sql`, via the Supabase SQL editor (or `supabase db push` if the CLI is
linked).

### 6.2 RLS summary

| Table set | anon | authenticated (admin) | service-role |
|---|---|---|---|
| all content tables | SELECT | SELECT | all |
| storage `portfolio` | SELECT | SELECT, INSERT, UPDATE, DELETE | all |

Writes from the admin go through the **service-role** key, so RLS never blocks
the admin but blocks everyone else.

## 7. Local development

```bash
bun install
cp .env.example .env.local   # then fill real values
bun dev                      # http://localhost:3000
bun test                     # data-layer tests
bun run build                # production build check
```

## 8. Deployment

- Host: Vercel or any Node host.
- Set all four env vars in the host's dashboard (service-role as server-only).
- Build command `bun run build`, output standard Next.js.
- Supabase remains the managed backend; no DB deploy needed from the host.

## 9. Security checklist before shipping

- [ ] `.env.local` is git-ignored; no secrets in the repo.
- [ ] Service-role key appears only in server modules.
- [ ] Signups disabled in Supabase.
- [ ] RLS enabled on every content table.
- [ ] `ADMIN_EMAIL` set to the real single owner.
- [ ] Storage bucket public-read only; write path authenticated.
