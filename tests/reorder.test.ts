import { describe, it, expect } from "vitest";
import { reorder } from "@/lib/reorder";

describe("reorder", () => {
  it("moves an item down", () => {
    expect(reorder(["a", "b", "c"], 0, 2)).toEqual(["b", "c", "a"]);
  });
  it("moves an item up", () => {
    expect(reorder(["a", "b", "c"], 2, 0)).toEqual(["c", "a", "b"]);
  });
  it("returns a copy when from === to", () => {
    const src = ["a", "b"];
    const out = reorder(src, 1, 1);
    expect(out).toEqual(src);
    expect(out).not.toBe(src);
  });
  it("clamps out-of-range indices", () => {
    expect(reorder(["a", "b"], 0, 99)).toEqual(["b", "a"]);
  });
});
