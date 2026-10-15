import type {
  ContractProject,
  ContractExperience,
  ContractCapability,
  ContractSkill,
  ContractTerminalLine,
  ContractTestimonial,
  ContractAward,
  ContractProfile,
  ContractPayload,
} from "@/contract/types";

type ProjectRow = {
  id: string; slug: string; title: string; role: string;
  subtitle: string | null; description: string; impact: string | null;
  highlights: string[] | null; tech: string[] | null;
  github: string; live: string; image_url: string;
  featured: boolean; year: string; category: string | null;
  status: string | null; sort: number;
};

export function toContractProject(row: ProjectRow): ContractProject {
  return {
    slug: row.slug,
    title: row.title,
    role: row.role,
    subtitle: row.subtitle ?? undefined,
    description: row.description,
    impact: row.impact ?? undefined,
    highlights: row.highlights ?? [],
    tech: row.tech ?? [],
    github: row.github,
    live: row.live,
    image: row.image_url,
    featured: row.featured,
    year: row.year,
    category: row.category ?? undefined,
    status: row.status ?? undefined,
  };
}

type Row = Record<string, unknown>;
const str = (r: Row, k: string) => String(r[k] ?? "");
const strArr = (r: Row, k: string) => (Array.isArray(r[k]) ? (r[k] as string[]) : []);

export function toContractExperience(row: Row): ContractExperience {
  return {
    id: str(row, "id"), company: str(row, "company"), position: str(row, "position"),
    period: str(row, "period"), location: str(row, "location"), type: str(row, "type"),
    duration: str(row, "duration"), mode: str(row, "mode"), role: str(row, "role"),
    summary: str(row, "summary"),
    outcomes: strArr(row, "outcomes"), stack: strArr(row, "stack"),
  };
}
export function toContractCapability(row: Row): ContractCapability {
  return { id: str(row, "id"), title: str(row, "title"), description: str(row, "description"), tags: strArr(row, "tags") };
}
export function toContractSkill(row: Row): ContractSkill {
  return { id: str(row, "id"), category: str(row, "category"), name: str(row, "name"), iconKey: str(row, "icon_key") };
}
export function toContractTerminalLine(row: Row): ContractTerminalLine {
  return {
    id: str(row, "id"), text: str(row, "text"), delay: Number(row.delay ?? 0),
    colorClass: str(row, "color_class"), bold: Boolean(row.bold), isCursor: Boolean(row.is_cursor),
  };
}
export function toContractTestimonial(row: Row): ContractTestimonial {
  return { id: str(row, "id"), name: str(row, "name"), role: str(row, "role"), quote: str(row, "quote"), avatar: str(row, "avatar_url") };
}
export function toContractAward(row: Row): ContractAward {
  return { id: str(row, "id"), kind: str(row, "kind"), title: str(row, "title"), org: str(row, "org"), year: str(row, "year"), description: str(row, "description") };
}
export function toContractProfile(row: Row): ContractProfile {
  return {
    name: str(row, "name"), role: str(row, "role"), location: str(row, "location"),
    email: str(row, "email"), website: str(row, "website"), avatar: str(row, "avatar_url"),
    intro: str(row, "intro"),
    socials: (row.socials ?? {}) as Record<string, string>,
  };
}

type PayloadInput = {
  profile: Row;
  projects: Row[];
  experiences: Row[];
  capabilities: Row[];
  skills: Row[];
  terminal_lines: Row[];
  testimonials: Row[];
  awards: Row[];
};

export function toContractPayload(input: PayloadInput): ContractPayload {
  return {
    profile: toContractProfile(input.profile),
    projects: input.projects.map((r) => toContractProject(r as Parameters<typeof toContractProject>[0])),
    experiences: input.experiences.map(toContractExperience),
    capabilities: input.capabilities.map(toContractCapability),
    skills: input.skills.map(toContractSkill),
    terminal_lines: input.terminal_lines.map(toContractTerminalLine),
    testimonials: input.testimonials.map(toContractTestimonial),
    awards: input.awards.map(toContractAward),
  };
}
