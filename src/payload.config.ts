import path from "path";
import { fileURLToPath } from "url";

import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Awards } from "./collections/Awards";
import { Capabilities } from "./collections/Capabilities";
import { Certifications } from "./collections/Certifications";
import { Companies } from "./collections/Companies";
import { Education } from "./collections/Education";
import { Experiences } from "./collections/Experiences";
import { Languages } from "./collections/Languages";
import { Media } from "./collections/Media";
import { Organizations } from "./collections/Organizations";
import { Projects } from "./collections/Projects";
import { SectionHeaders } from "./collections/SectionHeaders";
import { SiteContent } from "./collections/SiteContent";
import { SiteProjects } from "./collections/SiteProjects";
import { Skills } from "./collections/Skills";
import { TerminalLines } from "./collections/TerminalLines";
import { Testimonials } from "./collections/Testimonials";
import { Users } from "./collections/Users";
import { Profile } from "./globals/Profile";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    // Light by default. Payload reads this before any cookie or the OS
    // preference, so the panel does not follow a dark desktop.
    theme: "light",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      Nav: "@/components/admin/AdminNav",
      header: ["@/components/admin/AdminHeader#AdminHeader"],
      graphics: {
        Icon: "@/components/admin/AdminLogo#AdminLogo",
        Logo: "@/components/admin/AdminLogo#AdminLogo",
      },
      logout: {
        Button: "@/components/admin/AdminLogout#AdminLogout",
      },
    },
  },
  collections: [
    Users,
    Media,
    Projects,
    SiteProjects,
    Experiences,
    Companies,
    Capabilities,
    Skills,
    TerminalLines,
    Testimonials,
    Awards,
    SectionHeaders,
    SiteContent,
    Education,
    Certifications,
    Organizations,
    Languages,
  ],
  globals: [Profile],
  localization: {
    locales: [
      { code: "en", label: "English" },
      { code: "id", label: "Bahasa Indonesia" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
    schemaName: "payload",
  }),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  sharp,
});
