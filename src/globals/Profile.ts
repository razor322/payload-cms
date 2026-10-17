import type { GlobalConfig } from "payload";

export const Profile: GlobalConfig = {
  slug: "profile",
  access: {
    read: () => true,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text", defaultValue: "" },
    { name: "location", type: "text", defaultValue: "" },
    { name: "email", type: "text", defaultValue: "" },
    { name: "website", type: "text", defaultValue: "" },
    { name: "avatar_url", type: "text", defaultValue: "" },
    { name: "intro", type: "textarea", defaultValue: "" },
    {
      name: "socials",
      type: "array",
      fields: [
        { name: "key", type: "text", required: true },
        { name: "url", type: "text", required: true },
      ],
    },
  ],
};
