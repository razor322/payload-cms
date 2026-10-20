import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "year", "featured", "sort"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: { description: "lowercase, digits, dashes only" },
    },
    { name: "title", type: "text", required: true },
    { name: "role", type: "text", defaultValue: "" },
    { name: "subtitle", type: "text" },
    { name: "description", type: "textarea", defaultValue: "" },
    { name: "impact", type: "textarea" },
    {
      name: "highlights",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    {
      name: "tech",
      type: "array",
      fields: [{ name: "value", type: "text", required: true }],
    },
    { name: "github", type: "text", defaultValue: "" },
    { name: "live", type: "text", defaultValue: "" },
    { name: "image_url", type: "text", defaultValue: "" },
    { name: "featured", type: "checkbox", defaultValue: false },
    { name: "year", type: "text", defaultValue: "" },
    {
      name: "period_start",
      type: "text",
      defaultValue: "",
      admin: { description: "Free text, e.g. 09.2024. Leave empty to omit the period." },
    },
    { name: "period_end", type: "text", defaultValue: "" },
    { name: "category", type: "text" },
    { name: "status", type: "text" },
    {
      name: "sort",
      type: "number",
      required: true,
      defaultValue: 0,
    },
  ],
};
