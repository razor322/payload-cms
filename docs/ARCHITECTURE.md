# Architecture — Web Admin Portofolio

---

## 1. System context

```text
                 ┌──────────────────────────────────────────┐
                 │                Supabase                   │
                 │  Postgres  ·  Auth  ·  Storage (bucket)   │
                 └───────┬───────────────────────┬──────────┘
                         │ service-role (write)  │ anon (read-only)
                         │                       │
        ┌────────────────▼──────────┐   ┌────────▼─────────────────────┐
        │        web-admin          │   │  3 portfolio sites (4 apps)  │
        │  Server Components        │   │  GET-only /api/<domain>      │
        │  Server Actions (writes)  │   │  reads on build / revalidate │
        │  No public API            │   │                              │
        └───────────────────────────┘   └──────────────────────────────┘
```

One Supabase project is the single source of truth. The admin writes through
Server Actions using the service-role key. The portfolios read with the anon
key (or proxy through their own GET route) and can never write.

## 2. Key architectural decisions

| Decision | Choice | Reason |
|---|---|---|
| Write surface | Server Actions only | Owner said "no /api for CRUD". Server Actions keep the service-role key on the server and remove an attack surface. |
| Read surface for portfolios | Each portfolio hosts its own GET route | Owner said "/api only in the portfolio, GET only". The admin stays API-free. |
| Client/server split | Server Components by default; client components only for interaction | Fewer bytes, secrets stay server-side. |
| Auth | Supabase Auth, one allowed email | Gets sessions/cookies for free; the email gate is one predicate. |
| Authorization | Middleware + `requireAdmin()` in every protected server action | Defense in depth; a missed layout guard does not expose writes. |
| Data access | Service-role client for writes, cookie (anon) client for session reads | Writes bypass RLS intentionally; sessions still use the user's token. |
| Validation | Zod at the trust boundary | Every Server Action re-validates its input; the client form is convenience, not trust. |
| Content model | Canonical superset tables + `site` column for per-site rows | Content is 90% shared across three sites; one row per fact avoids 3× editing. |
| Theming | Tailwind v4 + shadcn/ui, hand-styled neobrutalism | Owner chose hand-styled. No external theme dependency. |
| Testing | Vitest on the data layer only | Owner chose data-layer TDD. UI forms are verified by click-through (antislop R-35). |

## 3. Layers

```text
app/(admin)/…            ← Route segments, Server Components (read) + forms (write)
components/brut, forms   ← Presentation + client interaction
actions/*                ← "use server" functions: validate → write → revalidate
lib/supabase/*           ← Clients (cookie session, service-role)
lib/schema, mappers      ← Pure logic, TDD-covered
contract/types           ← JSON shape consumed by portfolios
supabase/migrations      ← DDL, RLS, seed
```

Dependency direction is one-way: `app → actions → lib → supabase`. `lib` never
imports from `app` or `components`. Pure modules (`schema`, `mappers`, `auth`)
have no Supabase import, so they test without a database.

## 4. Request flows

### 4.1 Read (admin page)

```text
Browser → Server Component → createServerClient(cookies).auth.getUser()
                          → if email ≠ ADMIN_EMAIL → redirect /login
                          → supabase select → map row → render
```

### 4.2 Write (CRUD)

```text
Form submit → Server Action
            → requireAdmin()          (session + email)
            → zod.parse(input)         (trust boundary)
            → service-role client insert/update/delete
            → revalidatePath(list)
            → return result; UI shows toast
```

### 4.3 Portfolio read (rewire pass, deferred)

```text
Portfolio GET /api/projects
   → createServerClient(anon)
   → select → map row → portfolio view-model
   → JSON
   next build / revalidate consumes it
```

## 5. Authentication & authorization

- **Session:** `@supabase/ssr` cookie client. `middleware.ts` refreshes tokens on
  every request (`getUser` always hits the auth server).
- **Single admin:** after `getUser()`, compare `user.email` to
  `process.env.ADMIN_EMAIL`. Mismatch → sign out + redirect to `/login`.
- **Signup:** disabled in the Supabase dashboard. The one user is created manually.
- **Server actions:** each starts with `await requireAdmin()`; it throws/redirects
  when the caller is not the admin. The middleware is the fast path; this is the lock.

## 6. Data model

See `PROJECT_STRUCTURE.md` §4 for table DDL. Relationships:

```text
profile           1 row (singleton)
section_headers   (site, section) unique
projects          slug unique      ┐ content shared across all sites
experiences       ext_id           ┘ unless a site-specific override row exists
capabilities      site-scoped
skills            site-scoped
terminal_lines    site-scoped
testimonials      site-scoped
awards            site-scoped
```

`site ∈ {v3, my, minimal, all}`. A `site='all'` row is shared; a site-specific row
takes precedence in the portfolio mapper.

## 7. Security

| Concern | Mitigation |
|---|---|
| Write access | Service-role key is server-only (`SUPABASE_SERVICE_ROLE_KEY`, never `NEXT_PUBLIC_`). |
| Read access | RLS: anon has `SELECT` only. Storage: public read, authenticated write. |
| Authorization | Email gate in middleware + `requireAdmin()` in every write action. |
| Input | Zod validates all action inputs; DB constraints are the last line. |
| Secrets | `.env.local` git-ignored; `.env.example` holds placeholders only. |
| CSRF | Server Actions are POST-only and Next.js-guarded; no custom API to protect. |

## 8. Deployment

- Admin: Vercel (or any Node host). Needs all four env vars.
- Database/Auth/Storage: Supabase.
- Portfolios: unchanged hosting for now; the rewire pass points them at Supabase or
  at the admin's future read contract.

## 9. Trade-offs (recorded)

- **Superset tables** keep one project row instead of three, at the cost of some
  columns being null for some sites. Accepted: mapping lives in pure functions.
- **No draft/publish** means a save is live. Accepted for a solo owner.
- **Data-layer-only TDD** leaves forms to click-through. Accepted per owner choice;
  the Delivery Gate makes that check explicit.
- **No shared package** for the contract (file duplicated per portfolio). Accepted
  while the contract is one small file; revisit if it churns.
