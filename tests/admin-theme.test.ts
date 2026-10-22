import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const css = readFileSync(
  fileURLToPath(new URL("../src/app/(payload)/custom.css", import.meta.url)),
  "utf8",
).replace(/\/\*[\s\S]*?\*\//g, "");

/** The value of one property in the first rule whose selector list holds `selector`. */
export function rule(selector: string, property: string): string | undefined {
  const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)];
  for (const [, selectors, body] of blocks) {
    if (!selectors.split(",").some((part) => part.trim() === selector)) continue;
    const match = body.match(new RegExp(`(?:^|;)\\s*${property}\\s*:\\s*([^;]+)`));
    if (match) return match[1].trim();
  }
  return undefined;
}

describe("the admin theme", () => {
  it("lets the window scroll instead of the body", () => {
    expect(rule("body", "overflow-y")).toBe("visible");
    expect(rule("html", "overflow-y")).toBe("visible");
  });

  it("keeps the sidebar on one scroller of its own", () => {
    expect(rule(".admin-nav__links", "overflow-y")).toBe("auto");
    expect(rule(".admin-nav__controls", "margin-top")).toBe("auto");
  });

  it("pads the content column the way the reference does", () => {
    expect(rule(":root", "--pa-gutter")).toBe("40px");
    expect(rule(".template-default__wrap > .collection-list", "margin")).toBe(
      "16px var(--pa-gutter) 48px",
    );
  });

  it("puts the search and the action in the head row", () => {
    expect(rule(".pa-list-head__row", "gap")).toBe("12px");
    expect(rule(".pa-list-head__actions", "gap")).toBe("12px");
    expect(rule(".pa-search__input", "border")).toBe("var(--pa-border)");
  });

  it("puts the limit, the count and the pages on one footer row", () => {
    expect(rule(".collection-list .page-controls", "display")).toBe("flex");
    expect(rule(".collection-list .page-controls__page-info", "order")).toBe("1");
    expect(rule(".collection-list .per-page", "order")).toBe("2");
    expect(rule(".collection-list .paginator", "order")).toBe("3");
  });

  it("gives the form the reference's head, panels and rows", () => {
    expect(rule(".doc-controls__wrapper", "gap")).toBe("12px");
    expect(rule(".doc-controls", "border-bottom")).toBe("var(--pa-border)");
    expect(rule(".collapsible__toggle", "border-bottom")).toBe("2px solid #ececee");
    expect(rule(".array-field__row", "background-color")).toBe("#fafafa");
  });

  it("lays the account and the global out in panels", () => {
    expect(rule(".collection-edit--users .document-fields__edit", "display")).toBe("grid");
    expect(rule(".global-edit--profile .render-fields", "display")).toBe("grid");
    expect(
      rule(
        ".global-edit--profile .document-fields__edit > .render-fields > .field-type",
        "box-shadow",
      ),
    ).toBe("var(--pa-shadow)");
  });
});
