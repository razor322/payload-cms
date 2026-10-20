import type { CollectionConfig } from "payload";

import { siteField, sortField } from "./fields";

export const TerminalLines: CollectionConfig = {
  slug: "terminal-lines",
  admin: {
    useAsTitle: "text",
    defaultColumns: ["text", "site", "sort"],
  },
  access: {
    read: () => true,
  },
  fields: [
    siteField,
    { name: "text", type: "text", required: true },
    {
      name: "kind",
      type: "select",
      defaultValue: "line",
      options: [
        { label: "Line", value: "line" },
        { label: "Command", value: "command" },
        { label: "Command output", value: "output" },
      ],
    },
    {
      name: "output_for",
      type: "text",
      defaultValue: "",
      admin: { description: "For kind=output: the command this output belongs to." },
    },
    { name: "delay", type: "number", defaultValue: 0 },
    { name: "color_class", type: "text", defaultValue: "" },
    { name: "bold", type: "checkbox", defaultValue: false },
    { name: "is_cursor", type: "checkbox", defaultValue: false },
    sortField,
  ],
};
