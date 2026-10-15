import { describe, it, expect } from "vitest";
import {
  experienceInputSchema,
  skillInputSchema,
  profileInputSchema,
} from "@/lib/schema";

describe("domain schemas", () => {
  it("experience defaults arrays", () => {
    const p = experienceInputSchema.parse({ company: "Halcom", position: "Dev" });
    expect(p.outcomes).toEqual([]);
    expect(p.stack).toEqual([]);
  });
  it("skill requires name", () => {
    expect(() => skillInputSchema.parse({ name: "" })).toThrow();
  });
  it("profile requires a name", () => {
    expect(() => profileInputSchema.parse({})).toThrow();
  });
});
