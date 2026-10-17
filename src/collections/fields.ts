import type { Field } from "payload";

// Site scoping shared by every site-aware collection. Rows with `all` are
// consumed by every portfolio; a site-specific row takes precedence.
export const siteField: Field = {
  name: "site",
  type: "select",
  required: true,
  defaultValue: "all",
  options: [
    { label: "All sites (shared)", value: "all" },
    { label: "portfolio-v3", value: "v3" },
    { label: "MYportfolio", value: "my" },
    { label: "minimal-dev-portfolio", value: "minimal" },
  ],
  admin: {
    description: "Which portfolio consumes this row. 'All sites' is shared.",
  },
};

export const sortField: Field = {
  name: "sort",
  type: "number",
  required: true,
  defaultValue: 0,
  admin: {
    description: "Manual order, lowest first.",
  },
};
