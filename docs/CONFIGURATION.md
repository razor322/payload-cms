# Configuration — Web Admin Portofolio

## 1. Prerequisites

| Tool | Version | Notes |
|---|---|---|
| bun | 1.2+ | package manager (owner choice) |
| Node.js | 20+ | Next.js runtime, 22 recommended |
| Supabase project | one | shared by admin + 3 portfolios |
| git | any | version control |

## 2. Environment variables

Copy `.env.example` to `.env.local` and fill real values. `.env.local` is
git-ignored and must never be committed.

```dotenv
# Postgres connection string for Payload. Use the Supabase SESSION POOLER (port 5432).
# Format: postgresql://postgres.<project-ref>:<db-password>@aws-0-<region>.pooler.supabase.com:5432/postgres
# Do NOT use the direct db.<ref>.supabase.co host; it is IPv6-only and fails on most laptops.
DATABASE_URI=postgresql://postgres.<project-ref>:<db-password>@aws-0-<region>.pooler.supabase.com:5432/postgres

# Random unguessable string, 32+ chars.
# Generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
PAYLOAD_SECRET=<64-char-hex>

# Supabase Storage over the S3 protocol (media collection).
# Keys come from the dashboard: Storage -> S3 Configuration -> Access keys.
S3_ENDPOINT=https://<project-ref>.storage.supabase.co/storage/v1/s3
S3_REGION=<project-region>
S3_BUCKET=portfolio
S3_ACCESS_KEY_ID=<access-key-id>
S3_SECRET_ACCESS_KEY=<secret-access-key>
```

| Variable | Scope | Exposed to browser | Used by |
|---|---|---|---|
| `DATABASE_URI` | server | **no** | Payload Postgres adapter |
| `PAYLOAD_SECRET` | server | **no** | Payload session signing, token hashing |
| `S3_ENDPOINT` | server | no | media upload target |
| `S3_REGION` | server | no | media upload target |
| `S3_BUCKET` | server | no | media upload target |
| `S3_ACCESS_KEY_ID` | server | **no** | media upload auth (bypasses RLS) |
| `S3_SECRET_ACCESS_KEY` | server | **no** | media upload auth (bypasses RLS) |

`.env.example` ships with placeholder values and no secrets.

The admin user is a row in the `payload.users` table, not an env var. See
`LOCAL-ACCESS.md` (git-ignored) for the current credentials.

## 3. Dependencies

```text
runtime:  next  react  react-dom
          payload  @payloadcms/next  @payloadcms/ui
          @payloadcms/db-postgres  @payloadcms/richtext-lexical
          @payloadcms/storage-s3 (when uploads move to Supabase Storage)
          graphql  server-only
          tailwindcss (v4)  tw-animate-css  shadcn
          undici (pinned, see note)
dev:      typescript  @types/node  @types/react  @types/react-dom
          eslint  eslint-config-next
          vitest  @vitejs/plugin-react
          @tailwindcss/turbopack  @swc-node/register  @swc/core
```

Install:

```bash
bun add payload@3.91.0 @payloadcms/next@3.91.0 @payloadcms/db-postgres@3.91.0 \
  @payloadcms/richtext-lexical@3.91.0 @payloadcms/ui@3.91.0 graphql@^16.8.1
bun add -d vitest @vitejs/plugin-react
```

Every `@payloadcms/*` package and `payload` must be the same version.

**`undici` is pinned to 7.30.0** through `resolutions` and `overrides`. The
default npm mirror shipped a tampered `undici` build with stripped `if`
statements, and the version Payload pins crashes `new CacheStorage()` on Node
22. The project also ships a `.npmrc` that forces `registry.npmjs.org`, because
the mirror tarballs are the tampered ones.

## 4. Scripts (`package.json`)

```jsonc
{
  "scripts": {
    "dev": "node scripts/dev.mjs",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run",
    "test:watch": "vitest",
    "payload": "payload",
    "generate:types": "payload generate:types",
    "generate:importmap": "payload generate:importmap",
    "migrate": "payload migrate"
  }
}
```

`scripts/dev.mjs` picks a free port itself, records the pid and port in
`.dev-server.json`, and reuses a running server instead of failing. Next 16
holds an exclusive lock on `.next/dev/lock` and aborts when a second dev
server is started for the same project.

## 5. Tooling configuration

### 5.1 `tsconfig.json`

- `"strict": true`
- path alias `"@/*" -> ["./src/*"]`
- path alias `"@payload-config" -> ["./src/payload.config.ts"]`

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

```ts
import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
        // 'foreign' covers node_modules, so Payload's own stylesheet is not
        // run through the Tailwind loader. Otherwise Tailwind's preflight
        // lands after Payload's layer and strips the admin's styles.
        condition: { not: "foreign" },
      },
    },
  },
};

export default withPayload(nextConfig);
```

The `condition` is load-bearing. Without it, Tailwind's `base` layer wins
over Payload's `payload-default` layer and the admin renders unstyled
(buttons lose their background, border and padding).

### 5.4 Payload theme tokens (`src/app/(payload)/custom.css`)

Payload 3.91 reads these names. The old v2 names are dead:

| Use | Token |
|---|---|
| Page background | `--theme-bg` |
| Text color | `--theme-text` |
| Input background | `--theme-input-bg` |
| Corner radius | `--style-radius-s/m/l` |
| Body font | `--font-body` |
| Mono font | `--font-mono` |
| Button background | `--bg-color` (on `.btn--style-primary`) |
| Button text | `--color` (on `.btn--style-primary`) |
| Button border | `--btn-border` (on `.btn`) |
| Panel and card border | `--theme-border-color`, `--card-border-color` |

Custom CSS lives in `@layer payload { }`, the layer Payload reserves for
overrides, so it wins over the shipped admin styles.

### 5.5 The neobrutalist theme

`DESIGN.md` holds the direction. The primitives live at the top of
`custom.css`:

| Token | Value | Use |
|---|---|---|
| `--nb-border-w` | `3px` | Border width everywhere |
| `--nb-border` | `3px solid #000000` | The border |
| `--nb-shadow` | `5px 5px 0 #000000` | Overlay shadow |
| `--nb-shadow-sm` | `3px 3px 0 #000000` | Button and card hover shadow |
| `--nb-yellow` | `#ffeb3b` | The primary action |
| `--nb-red` | `#ff5252` | Destructive action only |
| `--nb-blue` | `#2196f3` | Focus ring and active nav item |

Two things Payload does not do on its own, both handled in `custom.css`:

- It ships a blurred shadow on inputs, checkboxes, radios and selects. This
  style refuses blur, so those rules set `box-shadow: none`.
- It rounds a few small elements. Those get `border-radius: 0`. The drag handle
  needs `!important` because Payload sets its radius inline.

The panel is light by default. `admin.theme: "light"` in `payload.config.ts`
makes Payload resolve the theme before it reads a cookie or the
`prefers-color-scheme` header, so a dark desktop does not flip the panel.

## 6. Supabase setup

1. Create a project. Note the ref and the region.
2. **Database -> Reset database password** if the password is unknown.
3. **Connect -> Session pooler** for the `DATABASE_URI` (port 5432).
4. **Storage -> S3 Configuration -> Access keys** for the `S3_*` block.
5. The `payload` Postgres schema is created by the app itself (see
   `payload_schema_create` in the migration history).

## 7. Local development

```bash
bun install
cp .env.example .env.local   # then fill real values
bun dev                      # http://localhost:3000/admin
bun test
bun run build
```

Two scripts read `.env.local` and talk to the database directly:

```bash
bun scripts/seed-content.ts       # writes the per-site content from the three
                                  # portfolio repos, replacing the site scoped
                                  # rows and updating the shared ones
node scripts/verify-admin.mjs     # boots the admin, probes it, stops it
bun scripts/set-admin-password.ts # sets the admin password from the environment
```

Both are safe to re-run. The seed replaces the site scoped rows, so a content
change in a portfolio repo can be pushed with one command.

### 7.1 Two seed profiles

`SEED_PROFILE` picks what the seed writes for the contact details.

| Profile | `SEED_PROFILE` | Contact written | Use for |
|---|---|---|---|
| dev | `dev` (the default) | `owner@example.com` and a placeholder number | local work, a shared dev database, anything that must not carry personal data |
| public | `public` | the owner's real address from `OWNER_EMAIL` and `OWNER_WHATSAPP` | the live site |

```bash
# dev
bun scripts/seed-content.ts

# public
SEED_PROFILE=public OWNER_EMAIL=... OWNER_WHATSAPP=... bun scripts/seed-content.ts
```

The public profile refuses to run without both values, so a live site never
ends up with a placeholder contact. Both values live in `.env.local`, which is
git-ignored; the repository only carries the placeholder.

`scripts/set-admin-password.ts` and `scripts/verify-admin.mjs` read
`ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env.local` too, so no credential ever
has to sit in a tracked file.

## 8. Deployment

- Host: Vercel or any Node host.
- Set `DATABASE_URI`, `PAYLOAD_SECRET`, and the `S3_*` block in the host's
  dashboard. All of them are server-only.
- Build command `bun run build`.
- The portfolios fetch `/api/content` at build time, so the admin must be
  publicly reachable from the build environment.

## 9. Security checklist before shipping

- [ ] `.env.local` is git-ignored; no secrets in the repo.
- [ ] `PAYLOAD_SECRET` is a fresh 32+ char random string.
- [ ] The admin password is not the throwaway one from `LOCAL-ACCESS.md`.
- [ ] S3 keys are not exposed to the client.
- [ ] `docs/LOCAL-ACCESS.md` is git-ignored and never committed.
