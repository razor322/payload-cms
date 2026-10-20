import type {
  ContractAward,
  ContractCapability,
  ContractCompany,
  ContractExperience,
  ContractPayload,
  ContractProfile,
  ContractProject,
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
  };
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
  };
}

// A site-specific row (site === target) wins over a shared row (site === "all").
// Both are always included; the portfolio mapper decides precedence later.
export function pickForSite<T extends Doc>(docs: T[], site: Site): T[] {
  return docs.filter((d) => d.site === "all" || d.site === site);
}

export type PayloadContent = {
  profile: Doc | null;
  projects: Doc[];
  experiences: Doc[];
  companies: Doc[];
  capabilities: Doc[];
  skills: Doc[];
  terminal_lines: Doc[];
  testimonials: Doc[];
  awards: Doc[];
};

export function toContractPayload(input: PayloadContent, site: Site): ContractPayload {
  return {
    profile: toContractProfile(input.profile),
    projects: input.projects.map(toContractProject),
    experiences: input.experiences.map(toContractExperience),
    companies: pickForSite(input.companies ?? [], site).map(toContractCompany),
    capabilities: pickForSite(input.capabilities, site).map(toContractCapability),
    skills: pickForSite(input.skills, site).map(toContractSkill),
    terminal_lines: pickForSite(input.terminal_lines, site).map(toContractTerminalLine),
    testimonials: pickForSite(input.testimonials, site).map(toContractTestimonial),
    awards: pickForSite(input.awards, site).map(toContractAward),
  };
}
