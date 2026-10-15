import { describe, it, expect } from "vitest";
import { isAdminEmail } from "@/lib/auth-predicate";

describe("isAdminEmail", () => {
  it("true on exact match", () => {
    expect(isAdminEmail("a@b.com", "a@b.com")).toBe(true);
  });
  it("case-insensitive and trims", () => {
    expect(isAdminEmail(" A@B.com ", "a@b.com")).toBe(true);
  });
  it("false on different email", () => {
    expect(isAdminEmail("x@y.com", "a@b.com")).toBe(false);
  });
  it("false when admin unset", () => {
    expect(isAdminEmail("a@b.com", undefined)).toBe(false);
  });
  it("false when email null", () => {
    expect(isAdminEmail(null, "a@b.com")).toBe(false);
  });
});
