# Content Contract

The read-only JSON shape a portfolio consumes. Frozen in `src/contract/types.ts`.
Additive changes only.

## 1. The endpoint

```
GET /api/content?site=<v3|my|minimal>&locale=<en|id>
```

| Parameter | Required | Default | Behaviour |
|---|---|---|---|
| `site` | yes | none | `v3`, `my` or `minimal`. Anything else returns 400. |
| `locale` | no | `en` | `en` or `id`. Anything else falls back to `en`. |

The response is public, no session needed. The portfolios fetch it at build time
because they are static exports.

## 2. What each portfolio shows

Verified from the three repos. This is the target the CMS serves.

| Domain | portfolio-v3 | MYportfolio | minimal |
|---|---|---|---|
| hero | Hero | HeroSection | ProfileHeader + Overview |
| about | QuickLinks narrative | AboutSection | About |
| stats | Stats | no | no |
| marquee | Marquee | no | no |
| capabilities | no | CapabilitySection | no |
| skills / tech stack | Skills | SkillsSection | TechStack |
| terminal / telemetry | inside Skills | terminalLines in SkillsSection | no |
| projects | Projects + detail routes | ProjectsSection | Projects |
| experiences | Experience | ExperienceSection | Experiences |
| contact | Contact | ContactSection | SocialLinks + Overview |
| awards | no | no | Awards |
| certifications | no | no | Certifications |
| education | no | no | Education |
| organizations | no | no | Organizations |
| languages | no | no | Languages |
| bookmarks | no | no | Bookmarks |
| github contributions | no | no | external API, not CMS |
| insights | no | no | external API, not CMS |
| socials | FloatingSocials | contact actions and links | SocialLinks |
| SEO | yes | siteConfig | USER and the /og route |

## 3. Shared facts versus per-site content

Two domains are shared facts, stored once:

- `projects` (7 items, the same list on every site)
- `experiences` (3 items, one row per position, used by v3 and MY)

Everything else is per-site. Columns and rows carry a `site` value:

| Value | Meaning |
|---|---|
| `all` | shared, every site reads it |
| `v3`, `my`, `minimal` | one site only |

`resolveForSite` applies the precedence: a site row replaces an `all` row that
has the same key. Rows for other sites are dropped. The comparison key differs
per domain:

| Domain | Key |
|---|---|
| capabilities | `title` |
| skills | `name` |
| terminal_lines | `text` |
| section_headers | `section` |
| testimonials | `name` |
| awards | `title` |
| education | `title` |
| certifications | `title` |
| organizations | `company` |
| languages | `name` |

## 4. Project composition per site

`projects` is one shared list, and the new `site-projects` collection decides
which of them each site shows and in what order.

Each row has `site` (no `all` option), `project` (a relationship), `sort`, and
optional `featured_override`, `title_override` and `subtitle_override`.

With no rows for a site, the site shows every project in `sort` order, so the
endpoint never returns an empty list. minimal uses `title_override` for
"Catering Management System" to render as "SEA Catering Management".

## 5. Experiences versus companies

Two shapes, one purpose (owner decision):

| Collection | Shape | Consumer |
|---|---|---|
| `experiences` | one row per position, flat fields | portfolio-v3, MYportfolio |
| `companies` | one row per employer with a nested `positions` array | minimal |

The current data in all three repos has one position per company, so the two
collections stay simple.

## 6. Payload shape

```json
{
  "locale": "en",
  "profile": {
    "name": "Gybran Nauval Yuhandika",
    "role": "Design-Driven Software Engineer (Full-Stack, Mobile, AI)",
    "location": "Padang, Sumatra Barat, Indonesia",
    "email": "owner@example.com",
    "website": "https://gybrannauval.site/",
    "avatar": "",
    "intro": "...",
    "socials": { "github": "https://github.com/razor322" },
    "languages": [{ "name": "English", "level": "Elementary" }],
    "documents": [{ "label": "Curriculum Vitae", "href": "/documents/CV_ENG.pdf" }]
  },
  "siteContent": {
    "site": "v3",
    "hero": {
      "kicker": "...",
      "titleLines": ["..."],
      "intro": "...",
      "ctaPrimary": "...",
      "ctaSecondary": "...",
      "techStack": "..."
    },
    "seo": { "title": "...", "description": "...", "keywords": ["..."], "ogImage": "..." },
    "about": { "subtitle": "...", "portrait": "...", "portraitAlt": "...", "location": "..." },
    "contact": { "kicker": "...", "heading": "...", "body": "...", "email": "...", "whatsapp": "..." }
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
      "period": { "start": "09.2024", "end": "12.2024" },
      "category": "Mobile App",
      "status": "Live (Google Play Store)"
    }
  ],
  "experiences": [],
  "companies": [],
  "capabilities": [],
  "skills": [],
  "terminal_lines": [],
  "testimonials": [],
  "awards": [],
  "education": [],
  "certifications": [],
  "organizations": [],
  "languages": []
}
```

## 7. Per-portfolio mapping

### portfolio-v3

Reads the endpoint at build time. `scripts/sync-content.mjs` writes
`app/data/content.generated.ts`, so the site stays a static export. Field mapping
is 1:1 with the contract, apart from `image` (contract) to `image` (site).

### MYportfolio

| Contract | MY field |
|---|---|
| `projects[].title` | `name` |
| `projects[].tech` | `stack` |
| `projects[].live` or `github` | `url` |
| `projects[].category` | `category` |
| `projects[].status` | `status` |
| `capabilities[]` | capability blocks |
| `skills[]` + `terminal_lines[]` | skills section, core items, clusters, terminal |

### minimal-dev-portfolio

| Contract | minimal field |
|---|---|
| `projects[].title` | `title` |
| `projects[].tech` | `skills` |
| `projects[].live` or `github` | `link` |
| `projects[].period` | `period` |
| `experiences[]` or `companies[]` | `EXPERIENCES` |
| `education[]` | `EDUCATION` |
| `certifications[]` | `CERTIFICATIONS` |
| `organizations[]` | `ORGANIZATIONS` |
| `languages[]` | `LANGUAGES` |

## 8. Deliberately not in the CMS

| Content | Why |
|---|---|
| `insights` (minimal) | external OpenPanel API, not editorial content |
| `github-contributions` (minimal) | external GitHub API |
| the 49 template testimonials in minimal | dead code (no consumer) and quotes from the template author |
| icon assets | each portfolio resolves an `iconKey` to its own asset |
| filters, card themes, `DEFAULT_VISIBLE_PROJECTS` | UI configuration, not content |
