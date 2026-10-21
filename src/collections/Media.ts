import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    useAsTitle: "filename",
    components: {
      beforeList: ["@/components/admin/AdminListHeader#AdminListHeader"],
    },
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
  },
  fields: [
    { name: "alt", type: "text", required: true },
  ],
};
