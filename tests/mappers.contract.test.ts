import { describe, it, expect } from "vitest";
import { toContractProject } from "@/lib/mappers/contract";

describe("toContractProject", () => {
  it("passes through core fields with defaults", () => {
    const out = toContractProject({
      id: "1", slug: "dzikra", title: "Dzikra", role: "Dev",
      subtitle: null, description: "d", impact: null,
      highlights: null, tech: ["Flutter"], github: "", live: "",
      image_url: "/a.webp", featured: true, year: "2024",
      category: null, status: null, sort: 0,
    });
    expect(out.slug).toBe("dzikra");
    expect(out.tech).toEqual(["Flutter"]);
    expect(out.highlights).toEqual([]);
    expect(out.subtitle).toBeUndefined();
  });
});
