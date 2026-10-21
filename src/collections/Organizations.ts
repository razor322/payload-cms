import type { CollectionConfig } from "payload";

import { siteField, sortField } from "./fields";

export const Organizations: CollectionConfig = {
  slug: "organizations",
  admin: {
    useAsTitle: "company",
    defaultColumns: ["company", "position", "site", "sort"],
    components: {
      beforeList: ["@/components/admin/AdminListHeader#AdminListHeader"],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    siteField,
    { name: "company", type: "text", required: true },
    { name: "position", type: "text", required: true },
    { name: "period_start", type: "text", defaultValue: "" },
    { name: "period_end", type: "text", defaultValue: "" },
    { name: "description", type: "textarea", defaultValue: "" },
    {
      name: "skills",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    sortField,
  ],
};
