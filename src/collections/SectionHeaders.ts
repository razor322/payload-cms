import type { CollectionConfig } from "payload";

import { siteField } from "./fields";

const kickerTitle = (prefix: string) => [
  { name: `${prefix}_kicker`, type: "text" as const, defaultValue: "" },
  { name: `${prefix}_title`, type: "text" as const, defaultValue: "" },
];

export const SectionHeaders: CollectionConfig = {
  slug: "section-headers",
  admin: {
    useAsTitle: "section",
    defaultColumns: ["site", "section"],
    components: {
      beforeList: ["@/components/admin/AdminListHeader#AdminListHeader"],
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    siteField,
    {
      name: "section",
      type: "text",
      required: true,
      admin: { description: "Section key, e.g. hero, about, skills, projects." },
    },
    ...kickerTitle("left"),
    ...kickerTitle("middle"),
    ...kickerTitle("right"),
  ],
  indexes: [{ fields: ["site", "section"], unique: true }],
};
