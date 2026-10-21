# Web Admin — Portfolio Content Manager

A private, single-owner admin app that stores all portfolio content in one
Supabase database and feeds it to the three portfolio sites as read-only JSON.

The admin is a **Payload 3** app running inside Next.js: one process serves
the admin panel (`/admin`), the REST and GraphQL API (`/api/*`), and the
read-only content contract (`/api/content?site=`) the portfolios fetch at
build time.

## Docs

| Doc | What it covers |
|---|---|
| [docs/PRD.md](docs/PRD.md) | Problem, goals, scope, requirements (original brief, partly superseded) |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Phases, completion tracking, plan links |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System context, layers, flows, security |
| [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) | File tree, responsibilities, collections |
| [docs/CONFIGURATION.md](docs/CONFIGURATION.md) | Env vars, scripts, Supabase setup |
| [docs/CONTRACT.md](docs/CONTRACT.md) | Read-only JSON contract + per-portfolio mapping |
| [docs/LOCAL-ACCESS.md](docs/LOCAL-ACCESS.md) | Login details (git-ignored, never committed) |

## Stack

Next.js 16 (App Router) · TypeScript · Payload 3 · Tailwind CSS v4 (kept for
custom admin components) · Supabase Postgres + Storage · Vitest.
Package manager: **bun**.

## Quick start

```bash
bun install
cp .env.example .env.local   # fill DATABASE_URI, PAYLOAD_SECRET, S3 keys
bun dev                      # http://localhost:3000/admin
```

Full setup in [docs/CONFIGURATION.md](docs/CONFIGURATION.md).

## Scripts

```bash
bun dev            # dev server, falls back to a free port
bun run build      # production build
bun run lint       # eslint
bun test           # vitest (contract mapper)
node scripts/verify-admin.mjs   # boots the admin, probes it, stops it
bun run payload -- generate:types   # regenerate payload-types.ts
```

## What is built

- Payload admin panel at `/admin` with one login (`/admin/login`).
- Collections: users, media, projects, site projects, experiences, companies,
  capabilities, skills, terminal lines, testimonials, awards, section headers,
  site content, education, certifications, organizations, languages. Global:
  profile.
- Site scoping per row (`v3`, `my`, `minimal`, `all`).
- Content contract (`src/contract/types.ts`) served at
  `/api/content?site=<v3|my|minimal>&locale=<en|id>`.
- A custom admin frame in `src/components/admin/`: a collapsible sidebar, a
  header, the brand mark and the logout. The whole visual language lives in
  `src/app/(payload)/custom.css`, one file, in `@layer payload`. The direction
  is in [DESIGN.md](DESIGN.md).

## Status

- The admin is live: `build` ✓, `lint` ✓, `test` ✓ (28 tests).
- `portfolio-v3` reads the CMS (build-time fetch). The other two portfolios
  still use hardcoded content.
- Only `my` has per-site rows today. `v3` and `minimal` need a backfill in
  the admin.
- See [docs/ROADMAP.md](docs/ROADMAP.md) for what is left.
