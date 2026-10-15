import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("smoke", () => {
  it("merges class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });
});
