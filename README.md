# Web Admin — Portfolio Content Manager

A private, single-owner admin app that stores all portfolio content in one
Supabase database and feeds it to the three portfolio sites as read-only JSON.

Server-side only: Server Components for reads, Server Actions for writes, **no
public API**. Neobrutalism UI.

## Docs

| Doc | What it covers |
|---|---|
| [docs/PRD.md](docs/PRD.md) | Problem, goals, scope, requirements |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Phases, completion tracking, plan links |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | System context, layers, flows, security |
| [docs/PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) | File tree, responsibilities, DB schema |
| [docs/CONFIGURATION.md](docs/CONFIGURATION.md) | Env vars, scripts, Supabase setup |
| [docs/CONTRACT.md](docs/CONTRACT.md) | Read-only JSON contract + per-portfolio mapping |
| [docs/DELIVERY-GATE.md](docs/DELIVERY-GATE.md) | Antislop release gate report |
| [docs/plans/](docs/plans/) | Per-phase implementation plans |

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Supabase
(`@supabase/ssr`) · Zod · Vitest. Package manager: **bun**.

## Quick start

```bash
bun install
cp .env.example .env.local   # fill Supabase URL / anon / service-role / ADMIN_EMAIL
bun dev                      # http://localhost:3000
```

Full setup in [docs/CONFIGURATION.md](docs/CONFIGURATION.md).

## Scripts

```bash
bun dev          # dev server
bun run build    # production build
bun run lint     # eslint
bun test         # vitest (data layer)
```

## What is built

- Single-admin login (email/password, one allowed email).
- Full CRUD for projects, experiences, skills, capabilities, testimonials,
  awards; upsert editor for section headers; singleton profile editor.
- Image upload to Supabase Storage (bucket `portfolio`).
- Reorder for projects and catalog domains.
- Content contract (`src/contract/types.ts`) + mapping for the portfolio rewire.

## Status

- Phases 0–8 complete; verified: `build` ✓, `lint` ✓, `test` ✓ (19 tests).
- Phase 9 live click-through pending the service-role key + admin user.
- Portfolio rewire is a separate, later pass (see `docs/CONTRACT.md` §4).
