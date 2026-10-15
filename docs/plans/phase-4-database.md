# Phase 4 — Database Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** The Supabase schema, RLS policies, storage bucket, and seed data, applied and verified.

**Architecture:** SQL migrations under `supabase/`. `0001` creates tables, `0002` enables RLS with anon SELECT-only, `seed.sql` loads today's content from the three sites. The admin writes with the service-role key, so RLS blocks everyone except the admin.

**Tech Stack:** Supabase (Postgres), SQL.

## Global Constraints

- `site` values: `'v3' | 'my' | 'minimal' | 'all'`.
- All content tables have RLS enabled.
- Storage bucket `portfolio` is public-read, authenticated-write.

---

### Task 1: Schema migration

**Files:**
- Create: `supabase/migrations/0001_schema.sql`

**Interfaces:**
- Consumes: nothing.
- Produces: `profile`, `section_headers`, `projects`, `experiences`, `capabilities`, `skills`, `terminal_lines`, `testimonials`, `awards`.

- [ ] **Step 1: Write the DDL**

`supabase/migrations/0001_schema.sql`:

```sql
create extension if not exists pgcrypto;

create table if not exists profile (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text default '',
  location text default '',
  email text default '',
  website text default '',
  avatar_url text default '',
  intro text default '',
  socials jsonb default '{}'::jsonb,
  updated_at timestamptz default now()
);

create table if not exists section_headers (
  id uuid primary key default gen_random_uuid(),
  site text not null check (site in ('v3','my','minimal','all')),
  section text not null,
  left_kicker text default '', left_title text default '',
  middle_kicker text default '', middle_title text default '',
  right_kicker text default '', right_title text default '',
  unique (site, section)
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  role text default '',
  subtitle text,
  description text default '',
  impact text,
  highlights text[] default '{}',
  tech text[] default '{}',
  github text default '',
  live text default '',
  image_url text default '',
  featured boolean default false,
  year text default '',
  category text,
  status text,
  sort int default 0,
  updated_at timestamptz default now()
);

create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  ext_id text,
  company text not null,
  position text not null,
  period text default '',
  location text default '',
  type text default '',
  duration text default '',
  mode text default '',
  role text default '',
  summary text default '',
  outcomes text[] default '{}',
  stack text[] default '{}',
  sort int default 0,
  updated_at timestamptz default now()
);

create table if not exists capabilities (
  id uuid primary key default gen_random_uuid(),
  site text not null check (site in ('v3','my','minimal','all')) default 'all',
  title text not null,
  description text default '',
  tags text[] default '{}',
  sort int default 0
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  site text not null check (site in ('v3','my','minimal','all')) default 'all',
  category text default '',
  name text not null,
  icon_key text default '',
  sort int default 0
);

create table if not exists terminal_lines (
  id uuid primary key default gen_random_uuid(),
  site text not null check (site in ('v3','my','minimal','all')) default 'all',
  text text default '',
  delay int default 0,
  color_class text default '',
  bold boolean default false,
  is_cursor boolean default false,
  sort int default 0
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  site text not null check (site in ('v3','my','minimal','all')) default 'all',
  name text not null,
  role text default '',
  quote text not null,
  avatar_url text default '',
  sort int default 0
);

create table if not exists awards (
  id uuid primary key default gen_random_uuid(),
  site text not null check (site in ('v3','my','minimal','all')) default 'all',
  kind text default '',
  title text not null,
  org text default '',
  year text default '',
  description text default '',
  sort int default 0
);
```

- [ ] **Step 2: Apply in the Supabase SQL editor**

Run the file in the Supabase dashboard SQL editor.
Expected: tables created with no errors.

- [ ] **Step 3: Verify**

In the SQL editor: `select table_name from information_schema.tables where table_schema='public';`
Expected: all nine tables listed.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/0001_schema.sql
git commit -m "feat: database schema"
```

---

### Task 2: RLS + storage policies

**Files:**
- Create: `supabase/migrations/0002_rls.sql`

**Interfaces:**
- Consumes: Task 1 tables.
- Produces: anon SELECT-only on all content tables; no anon write.

- [ ] **Step 1: Write the policies**

`supabase/migrations/0002_rls.sql`:

```sql
do $$
declare t text;
begin
  foreach t in array array[
    'profile','section_headers','projects','experiences',
    'capabilities','skills','terminal_lines','testimonials','awards'
  ] loop
    execute format('alter table %I enable row level security;', t);
    execute format(
      'drop policy if exists "public read %1$s" on %1$I;', t
    );
    execute format(
      'create policy "public read %1$s" on %1$I for select using (true);', t
    );
  end loop;
end $$;

insert into storage.buckets (id, name, public)
values ('portfolio', 'portfolio', true)
on conflict (id) do nothing;

drop policy if exists "portfolio public read" on storage.objects;
create policy "portfolio public read" on storage.objects
  for select using (bucket_id = 'portfolio');

drop policy if exists "portfolio admin write" on storage.objects;
create policy "portfolio admin write" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio');

drop policy if exists "portfolio admin update" on storage.objects;
create policy "portfolio admin update" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio');

drop policy if exists "portfolio admin delete" on storage.objects;
create policy "portfolio admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio');
```

- [ ] **Step 2: Apply**

Run in the SQL editor.
Expected: no errors; bucket `portfolio` appears under Storage.

- [ ] **Step 3: Verify anon cannot write**

With the anon key (REST): `POST /rest/v1/projects` →
Expected: `401`/`403` (RLS blocks). `GET /rest/v1/projects` → `200`.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/0002_rls.sql
git commit -m "feat: rls and storage policies"
```

---

### Task 3: Seed data

**Files:**
- Create: `supabase/seed.sql`

**Interfaces:**
- Consumes: Task 1 tables.
- Produces: rows mirroring the current content of the three portfolios.

- [ ] **Step 1: Write profile + headers**

`supabase/seed.sql` starts with:

```sql
insert into profile (name, role, location, email, website, intro)
values (
  'Gybran Nauval Yuhandika',
  'Design-Driven Software Engineer (Full-Stack, Mobile, AI)',
  'Padang, Sumatra Barat, Indonesia',
  'owner@example.com',
  'https://gybrannauval.site/',
  'Engineer crafting fast, accessible, and polished web, mobile, and AI products with Next.js, Flutter, and TypeScript.'
);

insert into section_headers
  (site, section, left_kicker, left_title, middle_kicker, middle_title, right_kicker, right_title)
values
  ('my','capability','From','Design.','CRAFT','Build.','TO CODE','Ship.'),
  ('my','skills','HOW','Code.','IT''S','Ships.','BUILT','Fast.'),
  ('my','projects','SELECTED','Works.','SHIPPED','Products.','PROVEN','Impact.'),
  ('my','experience','CAREER','Roles.','LOG','Built.','HISTORY','Shipped.'),
  ('my','about','WHO','Code.','AM','Design.','I','Me.');
```

- [ ] **Step 2: Seed projects**

Append all seven projects (Dzikra, Raisehand, Eztix.id, Room and Space Booking,
Emonesia, Trolley Petani, Catering Management System) with values copied from
`portfolio-v3/app/data/projects.ts` and `project-descriptions.ts`. Example row:

```sql
insert into projects
  (slug, title, role, subtitle, description, impact, highlights, tech, github, live, image_url, featured, year, category, status, sort)
values
  ('dzikra','Dzikra','Mobile Developer','Habit & worship mobile app',
   'Production mobile app on Google Play Store, built to help users maintain daily worship habits with gentle routine tracking and consistency-focused UX.',
   'Live on Play Store with Firebase backend, real-time sync, and notification-driven habit loops.',
   ARRAY['Live on Google Play Store with Firebase backend and real-time sync.',
         'Notification-driven habit loops designed for high-mobility users.',
         'Built with Flutter, Dart, Firebase, and GetX architecture.'],
   ARRAY['Flutter','Dart','Firebase','GetX'],
   'https://play.google.com/store/apps/details?id=id.bigio.dzikra&hl=en',
   'https://play.google.com/store/apps/details?id=id.bigio.dzikra&hl=en',
   '/images/projects/bks.webp', true, '2024', 'Mobile App', 'Live (Google Play Store)', 0),
  ('raisehand','Raisehand','Mobile Engineer','Internal attendance system',
   'Production employee attendance app for Inovasi360 and Bigio, featuring GPS-based check-in, push notifications, and automated leave request workflows.',
   'Deployed on Google Play Store, used daily for location-verified attendance tracking.',
   ARRAY['GPS-based check-in and location-verified attendance.',
         'Push notifications and automated leave workflows in one app.',
         'Used daily across Inovasi360 and Bigio.'],
   ARRAY['Flutter','Dart','Firebase','GetX'],
   'https://play.google.com/store/apps/details?id=id.inovasi360.attendapp&hl=en&pli=1',
   'https://play.google.com/store/apps/details?id=id.inovasi360.attendapp&hl=en&pli=1',
   '/images/projects/atms.webp', true, '2024', 'Mobile App', 'Live (Google Play Store)', 1);
```

Add the remaining five projects the same way, in `sort` order 2..6.

- [ ] **Step 3: Seed experiences**

Append the three entries from `MYportfolio/.../experience-section-content.ts`
(EXP-003 Halcom, EXP-002 Bigio, EXP-001 Kabau Sirah) with `outscomes`/`stack`
arrays and `sort` 0..2.

- [ ] **Step 4: Seed capabilities, skills, terminal lines**

Append the three capability blocks, the core-infrastructure + cluster skills,
and the terminal lines from `MYportfolio/.../skills-section-content.ts`.

- [ ] **Step 5: Apply and verify**

Run the file in the SQL editor.
Expected: `select count(*) from projects;` returns `7`.

- [ ] **Step 6: Commit**

```bash
git add supabase/seed.sql
git commit -m "feat: seed content from portfolios"
```

---

### Task 4: Verify Phase 4

- [ ] **Step 1: Cross-check reads**

With the anon key: `select` each table.
Expected: rows present; writes rejected.

- [ ] **Step 2: Mark roadmap**

Tick Phase 4 boxes in `docs/ROADMAP.md`.

- [ ] **Step 3: Commit**

```bash
git add docs/ROADMAP.md
git commit -m "docs: mark phase 4 complete"
```
