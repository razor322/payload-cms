import type { ContractProject } from "@/contract/types";

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
