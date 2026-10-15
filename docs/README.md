# Web Admin — Portfolio Content Manager

A private, single-owner admin app that stores all portfolio content in one
Supabase database and feeds it to the three portfolio sites as read-only JSON.

Server-side only: Server Components for reads, Server Actions for writes, **no
public API**. Neobrutalism UI.

## Docs

| Doc | What it covers |
|---|---|
| [PRD.md](PRD.md) | Problem, goals, scope, requirements |
| [ROADMAP.md](ROADMAP.md) | Phases, completion tracking, per-phase plan links |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System context, layers, flows, security, trade-offs |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | File tree, responsibilities, DB schema |
| [CONFIGURATION.md](CONFIGURATION.md) | Env vars, scripts, Supabase setup, deployment |
| [CONTRACT.md](CONTRACT.md) | Read-only JSON contract + per-portfolio mapping (Phase 8) |
| [DELIVERY-GATE.md](DELIVERY-GATE.md) | Pre-ship PASS/FAIL report (Phase 9) |
| [plans/](plans/) | Bite-sized implementation plans, one per phase |

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Supabase
(`@supabase/ssr`) · Zod · Vitest. Package manager: **bun**.

## Quick start

```bash
bun install
cp .env.example .env.local   # fill Supabase URL / keys / ADMIN_EMAIL
bun dev                      # http://localhost:3000
```

Full setup in [CONFIGURATION.md](CONFIGURATION.md).

## How it fits with the portfolios

```text
web-admin  ──writes──▶  Supabase  ──read-only──▶  3 portfolio sites
(service-role)                     (anon / GET)
```

The three portfolios keep their own designs; only the content source changes in
a later, separate pass.

## Status

See [ROADMAP.md](ROADMAP.md) for phase completion. Phase 0 (docs) is done.
