import type { CollectionConfig } from "payload";

import { siteFieldRequired } from "./fields";

export const SiteContent: CollectionConfig = {
  slug: "site-content",
  admin: {
    useAsTitle: "site",
    description: "Hero, SEO, about and contact copy for one portfolio.",
  },
  access: {
    read: () => true,
  },
  fields: [
    siteFieldRequired,
    {
      type: "collapsible",
      label: "Hero",
      fields: [
        { name: "hero_kicker", type: "text", defaultValue: "" },
        {
          name: "hero_title_lines",
          type: "array",
          fields: [{ name: "value", type: "text", required: true }],
        },
        { name: "hero_intro", type: "textarea", defaultValue: "" },
        { name: "hero_cta_primary", type: "text", defaultValue: "" },
        { name: "hero_cta_secondary", type: "text", defaultValue: "" },
        { name: "hero_tech_stack", type: "text", defaultValue: "" },
      ],
    },
    {
      type: "collapsible",
      label: "SEO",
      fields: [
        { name: "seo_title", type: "text", defaultValue: "" },
        { name: "seo_description", type: "textarea", defaultValue: "" },
        {
          name: "seo_keywords",
          type: "array",
          fields: [{ name: "value", type: "text", required: true }],
        },
        { name: "seo_og_image", type: "text", defaultValue: "" },
      ],
    },
    {
      type: "collapsible",
      label: "About",
      fields: [
        { name: "about_subtitle", type: "textarea", defaultValue: "" },
        { name: "about_portrait", type: "text", defaultValue: "" },
        { name: "about_portrait_alt", type: "text", defaultValue: "" },
        { name: "about_location", type: "text", defaultValue: "" },
      ],
    },
    {
      type: "collapsible",
      label: "Contact",
      fields: [
        { name: "contact_kicker", type: "text", defaultValue: "" },
        { name: "contact_heading", type: "text", defaultValue: "" },
        { name: "contact_body", type: "textarea", defaultValue: "" },
        { name: "contact_email", type: "text", defaultValue: "" },
        { name: "contact_whatsapp", type: "text", defaultValue: "" },
      ],
    },
  ],
  indexes: [{ fields: ["site"], unique: true }],
};
