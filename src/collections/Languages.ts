import type { CollectionConfig } from "payload";

import { siteField, sortField } from "./fields";

export const Languages: CollectionConfig = {
  slug: "languages",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "level", "site", "sort"],
  },
  access: {
    read: () => true,
  },
  fields: [
    siteField,
    { name: "name", type: "text", required: true },
    { name: "level", type: "text", required: true },
    sortField,
  ],
};
