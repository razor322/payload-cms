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
