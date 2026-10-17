import type { CollectionConfig } from "payload";

import { siteField, sortField } from "./fields";

export const Skills: CollectionConfig = {
  slug: "skills",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "site", "sort"],
  },
  access: {
    read: () => true,
  },
  fields: [
    siteField,
    { name: "category", type: "text", defaultValue: "" },
    { name: "name", type: "text", required: true },
    { name: "icon_key", type: "text", defaultValue: "" },
    sortField,
  ],
};
