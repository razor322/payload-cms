# Content Contract

The read-only JSON shape a portfolio consumes. Frozen in `src/contract/types.ts`.
Additive changes only.

## 1. Example payload

```json
{
  "profile": {
    "name": "Gybran Nauval Yuhandika",
    "role": "Design-Driven Software Engineer (Full-Stack, Mobile, AI)",
    "location": "Padang, Sumatra Barat, Indonesia",
    "email": "owner@example.com",
    "website": "https://gybrannauval.site/",
    "avatar": "",
    "intro": "...",
    "socials": { "github": "https://github.com/razor322" }
  },
  "projects": [
    {
      "slug": "dzikra",
      "title": "Dzikra",
      "role": "Mobile Developer",
      "subtitle": "Habit & worship mobile app",
      "description": "...",
      "impact": "...",
      "highlights": ["..."],
      "tech": ["Flutter", "Dart"],
      "github": "https://...",
      "live": "https://...",
      "image": "/images/projects/bks.webp",
      "featured": true,
      "year": "2024",
      "category": "Mobile App",
      "status": "Live (Google Play Store)"
    }
  ],
  "experiences": [],
  "capabilities": [],
  "skills": [],
  "terminal_lines": [],
  "testimonials": [],
  "awards": []
}
```

## 2. Per-portfolio mapping

### portfolio-v3 (`app/data/projects.ts`)

| Contract | v3 field |
|---|---|
| `slug` | `slug` |
| `title` | `title` |
| `role` | `role` |
| `subtitle` | `subtitle` |
| `description` | `description` |
| `impact` | (folded into description today) |
| `highlights` | `highlights` |
| `tech` | `tech` |
| `github` | `github` |
| `live` | `live` |
| `image` | `image` |
| `featured` | `featured` |
| `year` | `year` |
| `category` | `category` |
| `status` | `status` |

### MYportfolio (`src/lib/constants/sections/projects-section-content.ts`)

| Contract | MY field |
|---|---|
| `title` | `name` |
| `image` | `image` |
| `tech` | `stack` |
| `description` | `description` |
| `impact` | `impact` |
| `slug`/`category`/`status` | derive (`category` from contract, `status` from `status`) |

### minimal-dev-portfolio (`src/features/portfolio/data/projects.ts`)

| Contract | minimal field |
|---|---|
| `title` | `title` |
| `description` | `description` |
| `tech` | `skills` |
| `live` or `github` | `link` |
| `period.start`/`period.end` | derive from `year` |

## 3. Shared rows

Rows with `site = 'all'` are shared across every site. A site-specific row
(`site = 'v3' | 'my' | 'minimal'`) takes precedence for that site. Projects and
experiences are stored once (no `site` column) and shared by all sites.

## 4. Rewire recipe (deferred pass)

Each portfolio adds a GET-only route that:

1. Creates a Supabase client with the anon key (SELECT-only via RLS).
2. Selects each table, filtering `site in ('all', '<this site>')`.
3. Maps rows with the equivalent of `toContractPayload` (copy `src/lib/mappers/contract.ts` verbatim; it is dependency-free).
4. Returns JSON.

The portfolio's existing data modules then read that route at build/revalidate
time and re-map the contract into their current view-model.

`app/api/content/route.ts` shape:

```ts
import { createClient } from "@supabase/supabase-js";
import { toContractPayload } from "@/lib/contract-mapper";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  const [profile, projects, experiences, capabilities, skills, terminal_lines, testimonials, awards] =
    await Promise.all([
      supabase.from("profile").select("*").limit(1).maybeSingle(),
      supabase.from("projects").select("*").order("sort"),
      supabase.from("experiences").select("*").order("sort"),
      supabase.from("capabilities").select("*").order("sort"),
      supabase.from("skills").select("*").order("sort"),
      supabase.from("terminal_lines").select("*").order("sort"),
      supabase.from("testimonials").select("*").order("sort"),
      supabase.from("awards").select("*").order("sort"),
    ]);
  return Response.json(
    toContractPayload({
      profile: profile.data,
      projects: projects.data ?? [],
      experiences: experiences.data ?? [],
      capabilities: capabilities.data ?? [],
      skills: skills.data ?? [],
      terminal_lines: terminal_lines.data ?? [],
      testimonials: testimonials.data ?? [],
      awards: awards.data ?? [],
    }),
  );
}
```

The anon key is public and read-only (RLS grants SELECT only), so this exposes
no write surface. Writes stay private to the admin.
