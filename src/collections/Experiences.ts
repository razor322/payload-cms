import type { CollectionConfig } from "payload";

export const Experiences: CollectionConfig = {
  slug: "experiences",
  admin: {
    useAsTitle: "position",
    defaultColumns: ["company", "position", "period", "sort"],
  },
  access: {
    read: () => true,
  },
  fields: [
    { name: "ext_id", type: "text" },
    { name: "company", type: "text", required: true },
    { name: "position", type: "text", required: true },
    { name: "period", type: "text", defaultValue: "" },
    { name: "location", type: "text", defaultValue: "" },
    { name: "type", type: "text", defaultValue: "" },
    { name: "duration", type: "text", defaultValue: "" },
    { name: "mode", type: "text", defaultValue: "" },
    { name: "role", type: "text", defaultValue: "" },
    { name: "summary", type: "textarea", defaultValue: "" },
    {
      name: "outcomes",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "stack",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    { name: "sort", type: "number", required: true, defaultValue: 0 },
  ],
};
