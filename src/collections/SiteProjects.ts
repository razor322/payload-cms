import type { CollectionConfig } from "payload";

import { siteFieldRequired } from "./fields";

export const SiteProjects: CollectionConfig = {
  slug: "site-projects",
  admin: {
    useAsTitle: "site",
    defaultColumns: ["site", "project", "sort", "featured_override"],
    description: "Which projects a portfolio shows, and in what order.",
  },
  access: {
    read: () => true,
  },
  fields: [
    siteFieldRequired,
    {
      name: "project",
      type: "relationship",
      relationTo: "projects",
      required: true,
    },
    {
      name: "sort",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: { description: "Order this project appears in. Lowest first." },
    },
    {
      name: "featured_override",
      type: "checkbox",
      admin: { description: "Leave empty to use the project's own featured flag." },
    },
    {
      name: "title_override",
      type: "text",
      admin: { description: "Leave empty to use the project title." },
    },
    {
      name: "subtitle_override",
      type: "text",
      admin: { description: "Leave empty to use the project subtitle." },
    },
    {
      name: "image_override",
      type: "text",
      admin: {
        description:
          "Leave empty to use the project image. Each portfolio keeps its own assets, so the path differs per site.",
      },
    },
  ],
  indexes: [{ fields: ["site", "project"], unique: true }],
};
