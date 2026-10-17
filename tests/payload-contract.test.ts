import { describe, it, expect } from "vitest";

import {
  pickForSite,
  toContractPayload,
  toContractProfile,
  toContractProject,
} from "@/lib/mappers/payload-contract";

const projectDoc = {
  slug: "dzikra",
  title: "Dzikra",
  role: "Mobile Developer",
  subtitle: "Habit app",
  description: "desc",
  impact: "impact",
  highlights: [{ value: "one" }, { value: "two" }],
  tech: [{ value: "Flutter" }],
  github: "g",
  live: "l",
  image_url: "/x.webp",
  featured: true,
  year: "2024",
  category: "Mobile App",
  status: "Live",
};

describe("payload-contract mapper", () => {
  it("flattens payload array fields to string[]", () => {
    const p = toContractProject(projectDoc);
    expect(p.highlights).toEqual(["one", "two"]);
    expect(p.tech).toEqual(["Flutter"]);
    expect(p.image).toBe("/x.webp");
    expect(p.featured).toBe(true);
  });

  it("converts profile socials array to a record", () => {
    const prof = toContractProfile({
      name: "G",
      email: "e",
      socials: [
        { key: "github", url: "https://github.com/x" },
        { key: "x", url: "https://x.com/x" },
      ],
    });
    expect(prof.socials).toEqual({
      github: "https://github.com/x",
      x: "https://x.com/x",
    });
  });

  it("keeps shared (all) rows plus the target site, drops other sites", () => {
    const rows = [
      { id: 1, site: "all" },
      { id: 2, site: "my" },
      { id: 3, site: "minimal" },
    ];
    expect(pickForSite(rows, "my").map((r) => r.id)).toEqual([1, 2]);
    expect(pickForSite(rows, "v3").map((r) => r.id)).toEqual([1]);
  });

  it("scopes site-aware collections in the full payload", () => {
    const out = toContractPayload(
      {
        profile: { name: "G" },
        projects: [projectDoc],
        experiences: [],
        capabilities: [{ id: 1, site: "all", title: "A" }, { id: 2, site: "v3", title: "B" }],
        skills: [{ id: 1, site: "my", name: "S" }],
        terminal_lines: [],
        testimonials: [],
        awards: [],
      },
      "v3",
    );
    expect(out.projects).toHaveLength(1);
    expect(out.capabilities.map((c) => c.title)).toEqual(["A", "B"]);
    expect(out.skills).toHaveLength(0);
  });
});
