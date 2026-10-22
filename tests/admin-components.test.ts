import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { Badge } from "@/components/admin/ui/Badge";
import { EmptyState } from "@/components/admin/ui/EmptyState";
import { InfoRow } from "@/components/admin/ui/InfoRow";
import { Progress } from "@/components/admin/ui/Progress";

describe("the shared admin pieces", () => {
  it("puts the label left and the value right", () => {
    const html = renderToStaticMarkup(InfoRow({ label: "Status", value: "Live" }));
    expect(html).toContain("pa-info-row");
    expect(html).toContain("Status");
    expect(html).toContain("Live");
  });

  it("paints the badge by its variant", () => {
    expect(renderToStaticMarkup(Badge({ children: "Live", variant: "secondary" }))).toContain(
      "pa-badge--secondary",
    );
    expect(renderToStaticMarkup(Badge({ children: "Live", variant: "purple" }))).toContain(
      "pa-badge--purple",
    );
  });

  it("shows the progress as a filled bar", () => {
    const html = renderToStaticMarkup(Progress({ value: 40 }));
    expect(html).toContain("pa-progress");
    expect(html).toContain("width:40%");
  });

  it("names the cause in an empty state", () => {
    const html = renderToStaticMarkup(
      EmptyState({ description: "Nothing has been written yet.", title: "No entries" }),
    );
    expect(html).toContain("pa-empty");
    expect(html).toContain("No entries");
    expect(html).toContain("Nothing has been written yet.");
  });
});
