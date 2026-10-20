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

## 4. The content endpoint

The admin serves the contract directly. No proxy route, no key, no re-mapping
on the portfolio side beyond its own view-model.

```
GET https://<admin>/api/content?site=<v3|my|minimal>
```

| Behaviour | Result |
|---|---|
| `site` missing or not one of the three | `400` |
| `site=v3` | shared rows plus the `v3` specific rows |
| no session needed | the route is public, the portfolios fetch it at build time |

`portfolio-v3` already does this. It fetches the endpoint during the build and
writes the result to `app/data/content.generated.ts`, so the site stays a
static export:

```ts
// scripts/sync-content.mjs
const url = `${CMS_URL}/api/content?site=${CMS_SITE}`;
const payload = await (await fetch(url)).json();
```

If the CMS is unreachable and a generated file already exists, the build keeps
the previous content and warns. If there is no generated file yet, the build
fails loudly.

The admin side of the mapping is `src/lib/mappers/payload-contract.ts` (pure,
tested). It flattens Payload's array fields (`{ value }` rows) into the string
arrays the contract uses and applies the `all` + site precedence.

