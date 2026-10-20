import { describe, it, expect } from "vitest";

import { resolveForSite } from "@/lib/mappers/resolve-site";

type Row = { site: string; name: string; value?: number };

describe("resolveForSite", () => {
  it("keeps shared rows that the site does not override", () => {
    const rows: Row[] = [
      { site: "all", name: "alpha" },
      { site: "v3", name: "beta" },
    ];
    const out = resolveForSite(rows, "v3", (r) => r.name);
    expect(out.map((r) => r.name).sort()).toEqual(["alpha", "beta"]);
  });

  it("lets a site row replace a shared row with the same key", () => {
    const rows: Row[] = [
      { site: "all", name: "skills", value: 1 },
      { site: "v3", name: "skills", value: 2 },
    ];
    const out = resolveForSite(rows, "v3", (r) => r.name);
    expect(out).toHaveLength(1);
    expect(out[0].value).toBe(2);
  });

  it("drops rows that belong to another site", () => {
    const rows: Row[] = [
      { site: "all", name: "alpha" },
      { site: "my", name: "beta" },
    ];
    const out = resolveForSite(rows, "v3", (r) => r.name);
    expect(out.map((r) => r.name)).toEqual(["alpha"]);
  });
});
