import type { CollectionConfig } from "payload";

import { siteField, sortField } from "./fields";

export const Education: CollectionConfig = {
  slug: "education",
  admin: {
    useAsTitle: "institution",
    defaultColumns: ["institution", "degree", "site", "sort"],
    components: {
      beforeList: ["@/components/admin/AdminListHeader#AdminListHeader"],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    siteField,
    { name: "institution", type: "text", required: true },
    { name: "degree", type: "text", defaultValue: "" },
    { name: "gpa", type: "text", defaultValue: "" },
    { name: "period_start", type: "text", defaultValue: "" },
    { name: "period_end", type: "text", defaultValue: "" },
    { name: "description", type: "textarea" },
    {
      name: "skills",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    sortField,
  ],
};
