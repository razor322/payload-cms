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
| [PRD.md](PRD.md) | Problem, goals, scope, requirements (original brief, partly superseded) |
| [ROADMAP.md](ROADMAP.md) | Phases, completion tracking, per-phase plan links |
| [ARCHITECTURE.md](ARCHITECTURE.md) | System context, layers, flows, security, trade-offs |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | File tree, responsibilities, collection list |
| [CONFIGURATION.md](CONFIGURATION.md) | Env vars, scripts, Supabase setup, deployment |
| [CONTRACT.md](CONTRACT.md) | Read-only JSON contract + per-portfolio mapping |
| [LOCAL-ACCESS.md](LOCAL-ACCESS.md) | Login details (git-ignored, never committed) |
| [DELIVERY-GATE.md](DELIVERY-GATE.md) | Pre-ship PASS/FAIL report (Phase 9, legacy app) |
| [plans/](plans/) | Bite-sized implementation plans, one per phase |
| [superpowers/plans/](superpowers/plans/) | Implementation plans for the Payload migration |

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

Full setup in [CONFIGURATION.md](CONFIGURATION.md).

## How it fits with the portfolios

```text
web-admin (Payload)  ──writes──▶  Supabase Postgres (schema `payload`)
        │
        └── GET /api/content?site=<v3|my|minimal> ──▶  3 portfolio sites
```

The three portfolios keep their own designs; only the content source changes.
`portfolio-v3` is already rewired (build-time fetch into a generated data
file). The other two are still on hardcoded content.

## Status

See [ROADMAP.md](ROADMAP.md) for phase completion. The Payload migration
(Phase 10) is done through the admin rework; the remaining portfolios are not
rewired yet.
