import type {
  ContractAward,
  ContractCapability,
  ContractCertification,
  ContractCompany,
  ContractEducation,
  ContractExperience,
  ContractLanguage,
  ContractOrganization,
  ContractPayload,
  ContractProfile,
  ContractProject,
  ContractSiteContent,
  ContractSkill,
  ContractTerminalLine,
  ContractTestimonial,
} from "@/contract/types";

export type Site = "v3" | "my" | "minimal";

type ArrField = { value?: string | null } | null;
type Doc = Record<string, unknown>;

const str = (v: unknown) => (v == null ? "" : String(v));
const bool = (v: unknown) => v === true;

// Payload array fields arrive as [{ value }, ...]; flatten to string[].
const arr = (v: unknown): string[] => {
  if (!Array.isArray(v)) return [];
  return v
    .map((item) => (item && typeof item === "object" ? (item as ArrField)?.value : item))
    .filter((x): x is string => typeof x === "string" && x.length > 0);
};

// Payload array rows with two named keys become an array of small objects.
const arrPairs = <A extends string, B extends string>(
  v: unknown,
  a: A,
  b: B,
): Record<A | B, string>[] => {
  if (!Array.isArray(v)) return [];
  return v.map((row) => {
    const doc = (row ?? {}) as Doc;
    return { [a]: str(doc[a]), [b]: str(doc[b]) } as Record<A | B, string>;
  });
};

export function toContractProject(doc: Doc): ContractProject {
  const periodStart = str(doc.period_start);
  return {
    slug: str(doc.slug),
    title: str(doc.title),
    role: str(doc.role),
    subtitle: doc.subtitle ? str(doc.subtitle) : undefined,
    description: str(doc.description),
    impact: doc.impact ? str(doc.impact) : undefined,
    highlights: arr(doc.highlights),
    tech: arr(doc.tech),
    github: str(doc.github),
    live: str(doc.live),
    image: str(doc.image_url),
    featured: bool(doc.featured),
    year: str(doc.year),
    period: periodStart
      ? { start: periodStart, end: doc.period_end ? str(doc.period_end) : undefined }
      : undefined,
    category: doc.category ? str(doc.category) : undefined,
    status: doc.status ? str(doc.status) : undefined,
  };
}

export function toContractExperience(doc: Doc): ContractExperience {
  return {
    id: str(doc.ext_id) || str(doc.id),
    company: str(doc.company),
    position: str(doc.position),
    period: str(doc.period),
    location: str(doc.location),
    type: str(doc.type),
    duration: str(doc.duration),
    mode: str(doc.mode),
    role: str(doc.role),
    summary: str(doc.summary),
    outcomes: arr(doc.outcomes),
    stack: arr(doc.stack),
    periodRange: str(doc.period_start)
      ? { start: str(doc.period_start), end: doc.period_end ? str(doc.period_end) : undefined }
      : undefined,
  };
}

export function toContractCompany(doc: Doc): ContractCompany {
  const rows = Array.isArray(doc.positions) ? (doc.positions as Doc[]) : [];
  return {
    id: str(doc.id),
    company: str(doc.company),
    companyWebsite: str(doc.company_website),
    companyIcon: str(doc.company_icon),
    isCurrent: bool(doc.is_current),
    positions: rows.map((row) => {
      const start = str(row.period_start);
      return {
        id: str(row.id),
        title: str(row.title),
        period: start
          ? { start, end: row.period_end ? str(row.period_end) : undefined }
          : undefined,
        employmentType: str(row.employment_type),
        description: str(row.description),
        skills: arr(row.skills),
      };
    }),
  };
}

export function toContractCapability(doc: Doc): ContractCapability {
  return {
    id: str(doc.id),
    title: str(doc.title),
    description: str(doc.description),
    tags: arr(doc.tags),
  };
}

export function toContractSkill(doc: Doc): ContractSkill {
  return {
    id: str(doc.id),
    category: str(doc.category),
    name: str(doc.name),
    iconKey: str(doc.icon_key),
  };
}

export function toContractTerminalLine(doc: Doc): ContractTerminalLine {
  return {
    id: str(doc.id),
    text: str(doc.text),
    delay: Number(doc.delay ?? 0),
    colorClass: str(doc.color_class),
    bold: bool(doc.bold),
    isCursor: bool(doc.is_cursor),
    kind: doc.kind === "command" || doc.kind === "output" ? doc.kind : "line",
    outputFor: str(doc.output_for),
  };
}

export function toContractEducation(doc: Doc): ContractEducation {
  const start = str(doc.period_start);
  return {
    id: str(doc.id),
    institution: str(doc.institution),
    degree: str(doc.degree),
    gpa: str(doc.gpa),
    period: start ? { start, end: doc.period_end ? str(doc.period_end) : undefined } : undefined,
    description: doc.description ? str(doc.description) : undefined,
    skills: arr(doc.skills),
  };
}

export function toContractCertification(doc: Doc): ContractCertification {
  return {
    id: str(doc.id),
    title: str(doc.title),
    issuer: str(doc.issuer),
    issuerIcon: str(doc.issuer_icon),
    issueDate: str(doc.issue_date),
    credentialId: str(doc.credential_id),
    credentialUrl: str(doc.credential_url),
  };
}

export function toContractOrganization(doc: Doc): ContractOrganization {
  const start = str(doc.period_start);
  return {
    id: str(doc.id),
    company: str(doc.company),
    position: str(doc.position),
    period: start ? { start, end: doc.period_end ? str(doc.period_end) : undefined } : undefined,
    description: str(doc.description),
    skills: arr(doc.skills),
  };
}

export function toContractLanguage(doc: Doc): ContractLanguage {
  return { id: str(doc.id), name: str(doc.name), level: str(doc.level) };
}

export function toContractTestimonial(doc: Doc): ContractTestimonial {
  return {
    id: str(doc.id),
    name: str(doc.name),
    role: str(doc.role),
    quote: str(doc.quote),
    avatar: str(doc.avatar_url),
  };
}

export function toContractAward(doc: Doc): ContractAward {
  return {
    id: str(doc.id),
    kind: str(doc.kind),
    title: str(doc.title),
    org: str(doc.org),
    year: str(doc.year),
    description: str(doc.description),
  };
}

export function toContractProfile(doc: Doc | null | undefined): ContractProfile {
  const d = doc ?? {};
  const socials: Record<string, string> = {};
  const list = Array.isArray(d.socials) ? (d.socials as Doc[]) : [];
  for (const item of list) {
    const key = str(item?.key);
    if (key) socials[key] = str(item?.url);
  }
  return {
    name: str(d.name),
    role: str(d.role),
    location: str(d.location),
    email: str(d.email),
    website: str(d.website),
    avatar: str(d.avatar_url),
    intro: str(d.intro),
    socials,
    languages: arrPairs(d.languages, "name", "level"),
    documents: arrPairs(d.documents, "label", "href"),
  };
}

export function toContractSiteContent(doc: Doc | null | undefined): ContractSiteContent {
  const d = doc ?? {};
  return {
    site: str(d.site),
    hero: {
      kicker: str(d.hero_kicker),
      titleLines: arr(d.hero_title_lines),
      intro: str(d.hero_intro),
      ctaPrimary: str(d.hero_cta_primary),
      ctaSecondary: str(d.hero_cta_secondary),
      techStack: str(d.hero_tech_stack),
    },
    seo: {
      title: str(d.seo_title),
      description: str(d.seo_description),
      keywords: arr(d.seo_keywords),
      ogImage: str(d.seo_og_image),
    },
    about: {
      subtitle: str(d.about_subtitle),
      portrait: str(d.about_portrait),
      portraitAlt: str(d.about_portrait_alt),
      location: str(d.about_location),
    },
    contact: {
      kicker: str(d.contact_kicker),
      heading: str(d.contact_heading),
      body: str(d.contact_body),
      email: str(d.contact_email),
      whatsapp: str(d.contact_whatsapp),
    },
  };
}

// A site-specific row (site === target) wins over a shared row (site === "all").
// Both are always included; the portfolio mapper decides precedence later.
export function pickForSite<T extends Doc>(docs: T[], site: Site): T[] {
  return docs.filter((d) => d.site === "all" || d.site === site);
}

type SiteProjectRow = {
  site?: string;
  project: number | { id: number };
  sort?: number;
  featured_override?: boolean | null;
  title_override?: string | null;
  subtitle_override?: string | null;
};

const projectId = (row: SiteProjectRow) =>
  typeof row.project === "object" && row.project !== null ? row.project.id : row.project;

/**
 * Builds the project list a site shows.
 *
 * With site-projects rows, the site shows exactly those projects in `sort`
 * order, with the optional overrides applied. With no rows for the site, it
 * falls back to every project so the endpoint never returns an empty list.
 */
export function composeProjects(
  projectDocs: Doc[],
  siteProjectDocs: SiteProjectRow[],
  site: Site,
  fallbackToAll: boolean,
): ContractProject[] {
  const rows = siteProjectDocs
    .filter((row) => row.site === site)
    .sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0));

  const byId = new Map<number, Doc>();
  for (const doc of projectDocs) byId.set(Number(doc.id), doc);

  if (rows.length === 0) {
    if (!fallbackToAll) return [];
    return [...projectDocs]
      .sort((a, b) => Number(a.sort ?? 0) - Number(b.sort ?? 0))
      .map(toContractProject);
  }

  const out: ContractProject[] = [];
  for (const row of rows) {
    const doc = byId.get(projectId(row));
    if (!doc) continue;
    const mapped = toContractProject(doc);
    out.push({
      ...mapped,
      title: row.title_override ? str(row.title_override) : mapped.title,
      subtitle: row.subtitle_override ? str(row.subtitle_override) : mapped.subtitle,
      featured:
        row.featured_override === true || row.featured_override === false
          ? row.featured_override
          : mapped.featured,
    });
  }
  return out;
}

export type PayloadContent = {
  profile: Doc | null;
  siteContent?: Doc | null;
  projects: Doc[];
  siteProjects?: SiteProjectRow[];
  experiences: Doc[];
  companies: Doc[];
  capabilities: Doc[];
  skills: Doc[];
  terminal_lines: Doc[];
  testimonials: Doc[];
  awards: Doc[];
  education?: Doc[];
  certifications?: Doc[];
  organizations?: Doc[];
  languages?: Doc[];
};

export function toContractPayload(input: PayloadContent, site: Site): ContractPayload {
  return {
    profile: toContractProfile(input.profile),
    siteContent: toContractSiteContent(input.siteContent),
    projects: composeProjects(input.projects, input.siteProjects ?? [], site, true),
    experiences: input.experiences.map(toContractExperience),
    companies: pickForSite(input.companies ?? [], site).map(toContractCompany),
    capabilities: pickForSite(input.capabilities, site).map(toContractCapability),
    skills: pickForSite(input.skills, site).map(toContractSkill),
    terminal_lines: pickForSite(input.terminal_lines, site).map(toContractTerminalLine),
    testimonials: pickForSite(input.testimonials, site).map(toContractTestimonial),
    awards: pickForSite(input.awards, site).map(toContractAward),
    education: pickForSite(input.education ?? [], site).map(toContractEducation),
    certifications: pickForSite(input.certifications ?? [], site).map(toContractCertification),
    organizations: pickForSite(input.organizations ?? [], site).map(toContractOrganization),
    languages: pickForSite(input.languages ?? [], site).map(toContractLanguage),
  };
}
