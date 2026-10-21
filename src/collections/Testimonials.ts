import type { CollectionConfig } from "payload";

import { siteField, sortField } from "./fields";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "site", "sort"],
    components: {
      beforeList: ["@/components/admin/AdminListHeader#AdminListHeader"],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    siteField,
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", defaultValue: "" },
    { name: "quote", type: "textarea", required: true },
    { name: "avatar_url", type: "text", defaultValue: "" },
    sortField,
  ],
};
