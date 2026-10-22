import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    // Payload only adds the lock fields when maxLoginAttempts is set, so
    // without it the login endpoint accepts unlimited guesses.
    maxLoginAttempts: 5,
    lockTime: 600000,
  },
  admin: {
    useAsTitle: "email",
    components: {
      beforeList: ["@/components/admin/AdminListHeader#AdminListHeader"],
    },
  },
  access: {
    read: ({ req }) => Boolean(req.user),
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "name",
      type: "text",
    },
  ],
};
