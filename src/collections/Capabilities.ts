import type { CollectionConfig } from "payload";

import { siteField, sortField } from "./fields";

export const Capabilities: CollectionConfig = {
  slug: "capabilities",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "site", "sort"],
    components: {
      beforeList: ["@/components/admin/AdminListHeader#AdminListHeader"],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    siteField,
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea", defaultValue: "" },
    {
      name: "tags",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    sortField,
  ],
};
