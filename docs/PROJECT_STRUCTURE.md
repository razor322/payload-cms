# Project Structure — Web Admin Portofolio

## 1. Repository layout

The admin is a standalone Next.js app. It is a sibling of the three portfolios,
all under `the portfolio workspace`.

```text
Portofolio/
├─ portfolio-v3/            (existing)
├─ MYportfolio/             (existing)
├─ minimal-dev-portfolio/   (existing)
└─ web-admin/               ← this app
```

## 2. `web-admin/` tree

```text
web-admin/
├─ docs/
│  ├─ README.md                 # you are here (docs index)
│  ├─ PRD.md
│  ├─ ROADMAP.md
│  ├─ ARCHITECTURE.md
│  ├─ PROJECT_STRUCTURE.md
│  ├─ CONFIGURATION.md
│  └─ plans/
│     ├─ phase-1-scaffold.md
│     ├─ phase-2-data-layer.md
│     ├─ phase-3-supabase-auth.md
│     ├─ phase-4-database.md
│     ├─ phase-5-components.md
│     ├─ phase-6-projects-crud.md
│     ├─ phase-7-domains.md
│     ├─ phase-8-contract.md
│     └─ phase-9-polish.md
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx             # root shell, fonts, neobrutalism base
│  │  ├─ globals.css            # Tailwind v4 + brut tokens
│  │  ├─ (auth)/login/page.tsx  # login form
│  │  └─ (admin)/
│  │     ├─ layout.tsx          # guarded shell: nav + sign out
│  │     ├─ page.tsx            # dashboard
│  │     ├─ projects/
│  │     │  ├─ page.tsx         # list
│  │     │  └─ [id]/page.tsx    # edit (id="new" = create)
│  │     ├─ experiences/…
│  │     ├─ skills/…
│  │     ├─ capabilities/…
│  │     ├─ headers/…
│  │     ├─ profile/…
│  │     ├─ testimonials/…
│  │     └─ awards/…
│  ├─ components/
│  │  ├─ brut/                  # Button, Card, Input, Textarea, Select,
│  │  │                         # Checkbox, Table, Tag, Badge, Toast, Confirm
│  │  ├─ forms/                 # ProjectForm, ArrayField, ImageUpload, …
│  │  └─ states/                # Empty, Loading, Error
│  ├─ actions/                  # "use server": projects, experiences, skills,
│  │                            # capabilities, headers, profile, testimonials, awards
│  ├─ lib/
│  │  ├─ supabase/
│  │  │  ├─ server.ts           # createServerClient(cookies)
│  │  │  └─ admin.ts            # service-role client (writes)
│  │  ├─ auth.ts                # isAdminEmail, requireAdmin
│  │  ├─ schema.ts              # Zod per domain (single source)
│  │  ├─ reorder.ts             # pure reorder helper
│  │  └─ mappers/               # row ↔ form, row → contract view-model
│  └─ contract/
│     └─ types.ts               # JSON shape each portfolio consumes
├─ supabase/
│  ├─ migrations/
│  │  ├─ 0001_schema.sql
│  │  └─ 0002_rls.sql
│  └─ seed.sql
├─ tests/                       # Vitest: schema, mappers, reorder, auth
├─ middleware.ts                # session refresh + admin-email gate
├─ vitest.config.ts
├─ .env.example
├─ .env.local                   # git-ignored
├─ next.config.ts
├─ tsconfig.json
├─ package.json
└─ README.md                    # app-level getting started
```

## 3. Responsibility of each unit

| Path | Responsibility | Depends on |
|---|---|---|
| `app/**` | Routing, data fetching (Server Components), composition | `actions`, `lib`, `components` |
| `actions/**` | Validate + persist + revalidate; the only writers | `lib/*`, `lib/supabase/admin` |
| `components/brut` | Presentational neobrutalist primitives | none (pure UI) |
| `components/forms` | Interactive forms; call Server Actions | `brut`, `actions` |
| `lib/schema` | Zod contracts for every domain | `zod` only |
| `lib/mappers` | Pure transforms row ↔ form ↔ contract | `contract`, `lib/schema` |
| `lib/auth` | Admin predicate + guard helper | `lib/supabase/server` |
| `lib/supabase/server` | Per-request cookie client | `@supabase/ssr` |
| `lib/supabase/admin` | Service-role client (server-only) | `@supabase/supabase-js` |
| `contract/types` | Shared JSON shape | `zod` (optional) |

## 4. Database schema (DDL summary)

Full DDL ships in `supabase/migrations/0001_schema.sql`.

```sql
-- singleton
profile(id uuid pk default gen_random_uuid(), name text, role text, location text,
        email text, website text, avatar_url text, intro text, socials jsonb,
        updated_at timestamptz default now())

-- per site + section
section_headers(id uuid pk, site text, section text,
        left_kicker text, left_title text, middle_kicker text, middle_title text,
        right_kicker text, right_title text,
        unique(site, section))

-- shared content
projects(id uuid pk, slug text unique, title text, role text, subtitle text,
        description text, impact text, highlights text[], tech text[], github text,
        live text, image_url text, featured bool default false, year text,
        category text, status text, sort int, updated_at timestamptz default now())

experiences(id uuid pk, ext_id text, company text, position text, period text,
        location text, type text, duration text, mode text, role text, summary text,
        outcomes text[], stack text[], sort int, updated_at timestamptz default now())

-- site-scoped
capabilities(id uuid pk, site text, title text, description text, tags text[], sort int)
skills(id uuid pk, site text, category text, name text, icon_key text, sort int)
terminal_lines(id uuid pk, site text, text text, delay int, color_class text,
        bold bool default false, is_cursor bool default false, sort int)
testimonials(id uuid pk, site text, name text, role text, quote text, avatar_url text, sort int)
awards(id uuid pk, site text, kind text, title text, org text, year text,
        description text, sort int)
```

`site` check: `in ('v3','my','minimal','all')`.

## 5. Naming conventions

- Files: `kebab-case.tsx` for components, `camelCase.ts` for functions/data, `PascalCase` for the exported component.
- Server Actions: `verbNoun` (`createProject`, `updateExperience`, `reorderSkills`), colocated in `actions/<domain>.ts`.
- Zod schema per domain exported as `<domain>Schema`; the inferred type as `<Domain>`.
- Brut components exported as plain names (`Button`, `Card`); imported from `@/components/brut`.

## 6. Routing map

| Path | Screen |
|---|---|
| `/login` | Login form |
| `/` | Dashboard (counts, quick links) |
| `/projects` | Projects list |
| `/projects/new` | Create project |
| `/projects/[id]` | Edit project |
| `/experiences`, `/skills`, `/capabilities`, `/headers`, `/profile`, `/testimonials`, `/awards` | Same list/edit pattern |

## 7. Conventions for contributors

- Default to a Server Component. Add `"use client"` only when the file needs state, effects, or event handlers.
- Never import `lib/supabase/admin.ts` into a client component.
- One responsibility per file; if a component grows past ~200 lines, split it.
- Follow the existing pattern in `components/brut` for any new primitive.
