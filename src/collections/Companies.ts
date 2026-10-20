import type { CollectionConfig } from "payload";

import { siteField, sortField } from "./fields";

export const Companies: CollectionConfig = {
  slug: "companies",
  admin: {
    useAsTitle: "company",
    defaultColumns: ["company", "site", "is_current", "sort"],
    description: "One employer with its positions. Used by minimal-dev-portfolio.",
  },
  access: {
    read: () => true,
  },
  fields: [
    siteField,
    { name: "company", type: "text", required: true },
    { name: "company_website", type: "text", defaultValue: "" },
    {
      name: "company_icon",
      type: "text",
      defaultValue: "",
      admin: { description: "Icon key the portfolio resolves to its own asset." },
    },
    { name: "is_current", type: "checkbox", defaultValue: false },
    {
      name: "positions",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "period_start", type: "text", defaultValue: "" },
        { name: "period_end", type: "text", defaultValue: "" },
        {
          name: "employment_type",
          type: "select",
          defaultValue: "Full-time",
          options: [
            { label: "Full-time", value: "Full-time" },
            { label: "Part-time", value: "Part-time" },
            { label: "Contract", value: "Contract" },
            { label: "Internship", value: "Internship" },
          ],
        },
        { name: "description", type: "textarea", defaultValue: "" },
        {
          name: "skills",
          type: "array",
          fields: [{ name: "value", type: "text", required: true }],
        },
      ],
    },
    sortField,
  ],
};
