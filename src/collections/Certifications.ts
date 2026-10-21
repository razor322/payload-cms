import type { CollectionConfig } from "payload";

import { siteField, sortField } from "./fields";

export const Certifications: CollectionConfig = {
  slug: "certifications",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "issuer", "site", "sort"],
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
    { name: "issuer", type: "text", defaultValue: "" },
    { name: "issuer_icon", type: "text", defaultValue: "" },
    { name: "issue_date", type: "text", defaultValue: "" },
    { name: "credential_id", type: "text", defaultValue: "" },
    { name: "credential_url", type: "text", defaultValue: "" },
    sortField,
  ],
};
