import { describe, it, expect } from "vitest";

import {
  pickForSite,
  toContractCompany,
  toContractExperience,
  toContractPayload,
  toContractProfile,
  toContractProject,
  toContractSiteContent,
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
        companies: [],
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

describe("project period", () => {
  it("maps period_start and period_end into a period object", () => {
    const p = toContractProject({
      slug: "dzikra",
      title: "Dzikra",
      period_start: "09.2024",
      period_end: "12.2024",
    });
    expect(p.period).toEqual({ start: "09.2024", end: "12.2024" });
  });

  it("leaves an open-ended period when only the start is set", () => {
    const p = toContractProject({ slug: "x", title: "X", period_start: "2026" });
    expect(p.period).toEqual({ start: "2026", end: undefined });
  });

  it("leaves period undefined when only year is present", () => {
    const p = toContractProject({ slug: "x", title: "X", year: "2024" });
    expect(p.period).toBeUndefined();
    expect(p.year).toBe("2024");
  });
});

describe("experience period range", () => {
  it("maps the period range", () => {
    const e = toContractExperience({
      company: "Halcom",
      position: "Software Engineer",
      period_start: "2026",
    });
    expect(e.periodRange).toEqual({ start: "2026", end: undefined });
  });

  it("leaves the range undefined when absent", () => {
    expect(toContractExperience({ company: "X", position: "Y" }).periodRange).toBeUndefined();
  });
});

describe("company grouping", () => {
  it("maps a company with its positions", () => {
    const c = toContractCompany({
      company: "Halcom",
      company_website: "https://halcom.id",
      is_current: true,
      positions: [
        {
          title: "Software Engineer",
          period_start: "2026",
          employment_type: "Full-time",
          description: ">_ Role: Full-Stack",
          skills: [{ value: "Next.js" }],
        },
      ],
    });
    expect(c.company).toBe("Halcom");
    expect(c.isCurrent).toBe(true);
    expect(c.positions).toHaveLength(1);
    expect(c.positions[0].title).toBe("Software Engineer");
    expect(c.positions[0].period).toEqual({ start: "2026", end: undefined });
    expect(c.positions[0].skills).toEqual(["Next.js"]);
  });

  it("returns an empty positions array when the field is missing", () => {
    expect(toContractCompany({ company: "X" }).positions).toEqual([]);
  });
});

describe("site content", () => {
  it("maps the per-site copy", () => {
    const out = toContractSiteContent({
      site: "v3",
      hero_kicker: "Design Driven Engineer",
      hero_title_lines: [{ value: "Pixels with purpose." }],
      hero_intro: "I bridge design with code.",
      hero_cta_primary: "START NOW",
      hero_cta_secondary: "VIEW STACK",
      seo_title: "Gybran Nauval",
      seo_keywords: [{ value: "portfolio" }],
      seo_og_image: "/og.png",
      about_subtitle: "About me.",
      contact_kicker: "Let's talk",
      contact_heading: "Contact",
      contact_body: "Send a message.",
      contact_email: "a@b.c",
    });
    expect(out.site).toBe("v3");
    expect(out.hero.kicker).toBe("Design Driven Engineer");
    expect(out.hero.titleLines).toEqual(["Pixels with purpose."]);
    expect(out.hero.ctaPrimary).toBe("START NOW");
    expect(out.seo.keywords).toEqual(["portfolio"]);
    expect(out.contact.heading).toBe("Contact");
    expect(out.contact.email).toBe("a@b.c");
  });

  it("returns empty strings and arrays when the doc is missing", () => {
    const out = toContractSiteContent(null);
    expect(out.hero.kicker).toBe("");
    expect(out.hero.titleLines).toEqual([]);
    expect(out.seo.title).toBe("");
    expect(out.contact.body).toBe("");
  });
});
