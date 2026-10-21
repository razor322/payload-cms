import { describe, it, expect } from "vitest";

import { composeProjects } from "@/lib/mappers/payload-contract";

const projects = [
  { id: 1, slug: "dzikra", title: "Dzikra", sort: 0 },
  { id: 2, slug: "raisehand", title: "Raisehand", sort: 1 },
  { id: 3, slug: "eztix-id", title: "Eztix.id", sort: 2 },
];

describe("composeProjects", () => {
  it("falls back to every project when the site has no rows", () => {
    const out = composeProjects(projects, [], "v3", true);
    expect(out.map((p) => p.slug)).toEqual(["dzikra", "raisehand", "eztix-id"]);
  });

  it("composes only the site rows, ordered by sort", () => {
    const rows = [
      { site: "v3", project: 3, sort: 1 },
      { site: "v3", project: 1, sort: 0 },
    ];
    const out = composeProjects(projects, rows, "v3", true);
    expect(out.map((p) => p.slug)).toEqual(["dzikra", "eztix-id"]);
  });

  it("applies a title override and ignores rows of other sites", () => {
    const rows = [
      { site: "minimal", project: 3, sort: 0, title_override: "SEA Catering Management" },
      { site: "v3", project: 1, sort: 0 },
    ];
    const out = composeProjects(projects, rows, "minimal", true);
    expect(out).toHaveLength(1);
    expect(out[0].title).toBe("SEA Catering Management");
  });

  it("returns nothing when the site has no rows and the fallback is off", () => {
    expect(composeProjects(projects, [], "v3", false)).toEqual([]);
  });

  it("applies the image override, because each portfolio keeps its own assets", () => {
    const rows = [{ site: "my", project: 1, sort: 0, image_override: "/projects/dzikra.webp" }];
    const out = composeProjects(projects, rows, "my", true);
    expect(out[0].image).toBe("/projects/dzikra.webp");
  });

  it("keeps the project image when the site does not override it", () => {
    const rows = [{ site: "my", project: 1, sort: 0 }];
    const out = composeProjects(
      [{ ...projects[0], image_url: "/images/projects/bks.webp" }],
      rows,
      "my",
      true,
    );
    expect(out[0].image).toBe("/images/projects/bks.webp");
  });
});
