import { describe, it, expect } from "vitest";
import { projectInputSchema } from "@/lib/schema";

const valid = {
  slug: "dzikra",
  title: "Dzikra",
  role: "Mobile Developer",
  description: "Habit app.",
  tech: ["Flutter", "Dart"],
  highlights: ["Live on Play Store"],
  featured: true,
  year: "2024",
  sort: 0,
};

describe("projectInputSchema", () => {
  it("accepts a valid project", () => {
    expect(projectInputSchema.parse(valid).slug).toBe("dzikra");
  });
  it("defaults arrays and sort", () => {
    const parsed = projectInputSchema.parse({ slug: "x", title: "X" });
    expect(parsed.tech).toEqual([]);
    expect(parsed.highlights).toEqual([]);
    expect(parsed.featured).toBe(false);
  });
  it("rejects a bad slug", () => {
    expect(() => projectInputSchema.parse({ ...valid, slug: "Bad Slug!" })).toThrow();
  });
  it("rejects a missing title", () => {
    expect(() => projectInputSchema.parse({ slug: "x" })).toThrow();
  });
});
