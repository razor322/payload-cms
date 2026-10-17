import type { CollectionConfig } from "payload";

import { siteField, sortField } from "./fields";

export const Awards: CollectionConfig = {
  slug: "awards",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "kind", "year", "site", "sort"],
  },
  access: {
    read: () => true,
  },
  fields: [
    siteField,
    { name: "kind", type: "text", defaultValue: "" },
    { name: "title", type: "text", required: true },
    { name: "org", type: "text", defaultValue: "" },
    { name: "year", type: "text", defaultValue: "" },
    { name: "description", type: "textarea", defaultValue: "" },
    sortField,
  ],
};
