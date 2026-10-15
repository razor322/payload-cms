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

export function toContractExperience(row: any): ContractExperience {
  return {
    id: row.id, company: row.company, position: row.position, period: row.period,
    location: row.location, type: row.type, duration: row.duration, mode: row.mode,
    role: row.role, summary: row.summary,
    outcomes: row.outcomes ?? [], stack: row.stack ?? [],
  };
}
export function toContractCapability(row: any): ContractCapability {
  return { id: row.id, title: row.title, description: row.description, tags: row.tags ?? [] };
}
export function toContractSkill(row: any): ContractSkill {
  return { id: row.id, category: row.category, name: row.name, iconKey: row.icon_key };
}
export function toContractTerminalLine(row: any): ContractTerminalLine {
  return {
    id: row.id, text: row.text, delay: row.delay, colorClass: row.color_class,
    bold: row.bold, isCursor: row.is_cursor,
  };
}
export function toContractTestimonial(row: any): ContractTestimonial {
  return { id: row.id, name: row.name, role: row.role, quote: row.quote, avatar: row.avatar_url };
}
export function toContractAward(row: any): ContractAward {
  return { id: row.id, kind: row.kind, title: row.title, org: row.org, year: row.year, description: row.description };
}
export function toContractProfile(row: any): ContractProfile {
  return {
    name: row.name, role: row.role, location: row.location, email: row.email,
    website: row.website, avatar: row.avatar_url, intro: row.intro, socials: row.socials ?? {},
  };
}

type PayloadInput = {
  profile: any;
  projects: any[];
  experiences: any[];
  capabilities: any[];
  skills: any[];
  terminal_lines: any[];
  testimonials: any[];
  awards: any[];
};

export function toContractPayload(input: PayloadInput): ContractPayload {
  return {
    profile: toContractProfile(input.profile),
    projects: input.projects.map(toContractProject),
    experiences: input.experiences.map(toContractExperience),
    capabilities: input.capabilities.map(toContractCapability),
    skills: input.skills.map(toContractSkill),
    terminal_lines: input.terminal_lines.map(toContractTerminalLine),
    testimonials: input.testimonials.map(toContractTestimonial),
    awards: input.awards.map(toContractAward),
  };
}
