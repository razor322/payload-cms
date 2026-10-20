import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
        // 'foreign' covers node_modules, so Payload's own stylesheet is not
        // run through the Tailwind loader. Otherwise Tailwind's preflight
        // lands after Payload's layer and strips the admin's styles.
        condition: { not: "foreign" },
      },
    },
  },
};

export default withPayload(nextConfig);
