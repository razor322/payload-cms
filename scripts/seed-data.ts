/**
 * Seed data for the per-site content.
 *
 * Every value here is transcribed from the portfolio repos, which stay the
 * source of truth until each site is rewired to read the CMS:
 *
 *   v3      the portfolio workspaceportfolio-v3
 *   my      the portfolio workspaceMYportfolio
 *   minimal the portfolio workspaceminimal-dev-portfolio
 *
 * The project rows, the experience rows and the profile global are shared
 * facts. Everything else is site scoped.
 */

export const PORTRAIT_URL =
  "https://aiuyrged8x.ufs.sh/f/OpMSwBmLbt3MUVH3WLY1Pi4nzysHhIgtbdFrV5Mwf3LcAekj";

export const CONTACT = {
  kicker: "Let's talk",
  heading: "Contact",
  body: "Let's build something thoughtful, useful, and ready to ship. If you have a project, role, or collaboration in mind, send me a message and I will get back to you.",
  email: "owner@example.com",
  whatsapp: "https://wa.me/000000000000",
};

export const SITE_CONTENT = [
  {
    site: "v3",
    hero_kicker: "From Indonesia with Love",
    hero_title_lines: [{ value: "Software" }, { value: "Developer" }],
    hero_intro: "Building fast, clean web apps for real users.",
    hero_cta_primary: "Selected work",
    hero_cta_secondary: "",
    hero_tech_stack: "Next.js • Flutter • Express • Laravel",
    seo_title: "Gybran Nauval | Software Developer",
    seo_description:
      "Gybran Nauval is a software developer with a passion for building web applications.",
    seo_keywords: [
      { value: "Gybran Nauval" },
      { value: "Software Developer" },
      { value: "Portfolio" },
      { value: "Next.js" },
      { value: "Flutter" },
      { value: "Padang Indonesia Developer" },
    ],
    seo_og_image: "/DevByRoman.png",
    about_subtitle:
      "Design-Driven Software Engineer with a D-IV degree in Software Engineering from Politeknik Negeri Padang, specializing in building high-fidelity web applications, native mobile apps, and custom AI integrations using Next.js, React, Flutter, TypeScript, and Laravel. Currently a Software Developer at PT. Halcom Inovasi Teknologi shipping full-stack features and AI workflows. Previously engineered mobile solutions at PT. Bejana Investidata Globalindo (Bigio) launching production apps like Raisehand and Dzikra on Google Play Store and built enterprise reservation systems at PT. Kabau Sirah Semen Padang. Recognized with a Rising Star award at the UNIMAS international competition for Trolley Petani. Dedicated to bridging sophisticated design with clean, production-ready code delivering fast, accessible, and user-centered products.",
    about_portrait: PORTRAIT_URL,
    about_portrait_alt: "Gybran Nauval Yuhandika Portrait",
    about_location: "Based in Padang City, Indonesia",
    contact_kicker: CONTACT.kicker,
    contact_heading: CONTACT.heading,
    contact_body: CONTACT.body,
    contact_email: CONTACT.email,
    contact_whatsapp: CONTACT.whatsapp,
  },
  {
    site: "my",
    hero_kicker: "Design Driven Engineer • Full-Stack • AI Engineer",
    hero_title_lines: [
      { value: "Pixels with purpose." },
      { value: "Code with precision." },
    ],
    hero_intro:
      "I bridge sophisticated design with clean, production-ready code — across web, mobile, and AI",
    hero_cta_primary: "START NOW",
    hero_cta_secondary: "VIEW STACK",
    hero_tech_stack: "Next.js • Flutter • Express • Laravel",
    seo_title: "Gybran Nauval Yuhandika | Software Engineer",
    seo_description:
      "Engineer crafting fast, accessible, and polished web, mobile, and AI products with Next.js, Flutter, and TypeScript.",
    seo_keywords: [
      { value: "Gybran Nauval Yuhandika" },
      { value: "Gybran Nauval" },
      { value: "Frontend Engineer" },
      { value: "Frontend Developer" },
      { value: "Backend Engineer" },
      { value: "Backend Developer" },
      { value: "FullStack Engineer" },
      { value: "FullStack Developer" },
      { value: "Flutter Engineer" },
      { value: "Flutter Developer" },
      { value: "Mobile Engineer" },
      { value: "AI Engineer" },
      { value: "AI Developer" },
      { value: "Next.js Developer" },
      { value: "TypeScript Developer" },
      { value: "Laravel Developer" },
      { value: "AI Integration" },
      { value: "Portfolio" },
      { value: "Padang Indonesia Developer" },
    ],
    seo_og_image: "/images/og-image.png",
    about_subtitle:
      "I am committed to supporting pioneering teams and technologies. Even in the earliest hours of a venture, we are prepared to invest with conviction.",
    about_portrait: PORTRAIT_URL,
    about_portrait_alt: "Portrait",
    about_location: "Based in Padang, ID",
    contact_kicker: CONTACT.kicker,
    contact_heading: CONTACT.heading,
    contact_body: CONTACT.body,
    contact_email: CONTACT.email,
    contact_whatsapp: CONTACT.whatsapp,
  },
  {
    site: "minimal",
    hero_kicker: "Software Engineer",
    hero_title_lines: [{ value: "Gybran Nauval Yuhandika" }],
    hero_intro:
      "Software Engineer specializing in full-stack web & mobile development with Next.js, React, Flutter, and NestJS.",
    hero_cta_primary: "View projects",
    hero_cta_secondary: "",
    hero_tech_stack: "TypeScript • Next.js • Flutter • NestJS • PostgreSQL",
    seo_title: "Gybran Nauval Yuhandika – Software Engineer",
    seo_description:
      "Software Engineer specializing in full-stack web & mobile development with Next.js, React, Flutter, and NestJS.",
    seo_keywords: [
      { value: "gybran nauval yuhandika" },
      { value: "gybrannauval" },
      { value: "gybran nauval" },
      { value: "gybran yuhandika" },
      { value: "razor322" },
      { value: "software engineer" },
      { value: "full-stack developer" },
      { value: "web developer" },
      { value: "mobile developer" },
      { value: "flutter developer" },
      { value: "next.js developer" },
      { value: "react developer" },
      { value: "portfolio" },
      { value: "padang developer" },
      { value: "indonesia developer" },
    ],
    seo_og_image: "/images/foto.jpg",
    about_subtitle:
      "Gybran Nauval Yuhandika — Software Engineer based in Padang, Indonesia. Specializing in high-performance interfaces and bringing AI into modern product workflows. Operating across the full product lifecycle (UI/UX, Mobile, Web, and Backend infrastructure), with a track record of shipping 7+ production platforms. Agnostic but highly specialized. Orchestrating scalable ecosystems using Next.js, React, Flutter, and NestJS, backed by robust Docker, PostgreSQL, and Prisma environments. I design and build digital products that connect great user experiences with reliable engineering.",
    about_portrait: "/images/light.webp",
    about_portrait_alt: "Gybran Nauval Yuhandika",
    about_location: "Padang, West Sumatra, Indonesia",
    contact_kicker: CONTACT.kicker,
    contact_heading: CONTACT.heading,
    contact_body: CONTACT.body,
    contact_email: CONTACT.email,
    contact_whatsapp: CONTACT.whatsapp,
  },
];

/** The order each portfolio shows the seven shared projects in. */
export const SITE_PROJECTS = {
  v3: [
    "dzikra",
    "raisehand",
    "eztix-id",
    "room-space-booking",
    "emonesia",
    "trolley-petani",
    "catering-management-system",
  ],
  my: [
    "dzikra",
    "raisehand",
    "eztix-id",
    "room-space-booking",
    "emonesia",
    "trolley-petani",
    "catering-management-system",
  ],
  minimal: [
    "dzikra",
    "raisehand",
    "eztix-id",
    "room-space-booking",
    "emonesia",
    "trolley-petani",
    "catering-management-system",
  ],
};

/** The label the minimal portfolio uses for the catering project. */
export const TITLE_OVERRIDES: Record<string, Record<string, string>> = {
  minimal: {
    "catering-management-system": "SEA Catering Management",
  },
};

/**
 * The image path each portfolio uses. The projects are shared, but every
 * portfolio keeps its own assets, so the path differs. The minimal portfolio
 * renders no project image at all, so it gets nothing.
 */
export const IMAGE_OVERRIDES: Record<string, Record<string, string>> = {
  my: {
    dzikra: "/projects/dzikra.webp",
    raisehand: "/projects/raisehand.webp",
    "eztix-id": "/projects/ez2.webp",
    "room-space-booking": "/projects/sir2.webp",
    emonesia: "/projects/emonesia.webp",
    "trolley-petani": "/projects/trolley.webp",
    "catering-management-system": "/projects/cat2.webp",
  },
};

/** The shared project facts the minimal portfolio shows as a period. */
export const PROJECT_PERIODS: Record<string, { start: string; end: string }> = {
  dzikra: { start: "09.2024", end: "12.2024" },
  raisehand: { start: "08.2024", end: "12.2024" },
  "eztix-id": { start: "03.2025", end: "07.2025" },
  "room-space-booking": { start: "09.2023", end: "06.2024" },
  emonesia: { start: "2024", end: "" },
  "trolley-petani": { start: "2024", end: "" },
  "catering-management-system": { start: "2024", end: "" },
};

/** The shared experience facts the minimal portfolio shows as a period. */
export const EXPERIENCE_PERIODS: Record<string, { start: string; end: string }> = {
  "PT. Halcom Inovasi Teknologi": { start: "2026", end: "" },
  "PT. Bejana Investidata Globalindo (Bigio)": { start: "08.2024", end: "12.2024" },
  "PT. Kabau Sirah Semen Padang": { start: "09.2023", end: "06.2024" },
};

/** v3 shows the marquee. The category is the tech matrix group it belongs to. */
export const V3_SKILLS = [
  { name: "TypeScript", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Flutter", category: "" },
  { name: "Laravel", category: "Backend" },
  { name: "Express", category: "" },
  { name: "Supabase", category: "" },
  { name: "Hono", category: "" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "shadcn/ui", category: "" },
  { name: "GSAP", category: "" },
  { name: "Radix UI", category: "" },
  { name: "Figma", category: "" },
  { name: "Firebase", category: "" },
  { name: "Drizzle ORM", category: "" },
  { name: "Better Auth", category: "" },
  { name: "JWT", category: "" },
  { name: "Prisma", category: "" },
  { name: "MySQL", category: "Database" },
  { name: "Docker", category: "Tools" },
  { name: "Vercel", category: "" },
  { name: "GitHub", category: "" },
  { name: "Git", category: "Tools" },
  { name: "Bun", category: "" },
  { name: "OpenAI", category: "" },
  { name: "Claude", category: "" },
  { name: "Gemini", category: "" },
  { name: "MCP", category: "" },
  { name: "OpenCode", category: "" },
];

/** The minimal portfolio tech stack, with its categories. */
export const MINIMAL_SKILLS = [
  { name: "TypeScript", category: "Languages" },
  { name: "JavaScript", category: "Languages" },
  { name: "Dart", category: "Languages" },
  { name: "Python", category: "Languages" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "shadcn/ui", category: "Frontend" },
  { name: "Framer Motion", category: "Frontend" },
  { name: "Flutter", category: "Mobile" },
  { name: "Node.js", category: "Backend & Database" },
  { name: "NestJS", category: "Backend & Database" },
  { name: "PostgreSQL", category: "Backend & Database" },
  { name: "Prisma", category: "Backend & Database" },
  { name: "MySQL", category: "Backend & Database" },
  { name: "Docker", category: "Dev Tools & AI" },
  { name: "Git", category: "Dev Tools & AI" },
  { name: "Cursor", category: "Dev Tools & AI" },
  { name: "Claude", category: "Dev Tools & AI" },
  { name: "Figma", category: "Design" },
];

/** The v3 services marquee. The focus list has no site wide slot, so it goes in the tags. */
export const V3_CAPABILITIES = [
  {
    title: "Frontend Development",
    description: "",
    tags: ["Performance", "Accessibility", "Clean UI", "Great UX"],
  },
  {
    title: "Backend Systems",
    description: "",
    tags: ["Performance", "Accessibility", "Clean UI", "Great UX"],
  },
  {
    title: "Responsive Design",
    description: "",
    tags: ["Performance", "Accessibility", "Clean UI", "Great UX"],
  },
  {
    title: "API Integration",
    description: "",
    tags: ["Performance", "Accessibility", "Clean UI", "Great UX"],
  },
];

/** The MYportfolio terminal commands and their output, which the CMS had only the lines for. */
export const MY_TERMINAL_COMMANDS = [
  {
    text: "git push origin main",
    kind: "command",
    output_for: "",
    delay: 0,
    color_class: "text-ghost-ink",
    bold: true,
    is_cursor: false,
  },
  {
    text: "bun deploy",
    kind: "command",
    output_for: "",
    delay: 0,
    color_class: "text-ghost-ink",
    bold: true,
    is_cursor: false,
  },
];

export const MY_TERMINAL_OUTPUTS = [
  {
    text: "Enumerating objects: 24, done.",
    kind: "output",
    output_for: "git push origin main",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
  {
    text: "Counting objects: 100% (24/24), done.",
    kind: "output",
    output_for: "git push origin main",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
  {
    text: "Compressing source graph with 12 workers...",
    kind: "output",
    output_for: "git push origin main",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
  {
    text: "Writing objects: 100% (14/14), 1.94 KiB | done.",
    kind: "output",
    output_for: "git push origin main",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
  {
    text: "Resolving deltas: 100% (8/8), completed.",
    kind: "output",
    output_for: "git push origin main",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
  {
    text: "To github.com:gybran/portfolio.git",
    kind: "output",
    output_for: "git push origin main",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
  {
    text: "a4d3f5e..7e8b91a  dev -> main",
    kind: "output",
    output_for: "git push origin main",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
  {
    text: "Provisioning edge bundle for personal-portfolio...",
    kind: "output",
    output_for: "bun deploy",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
  {
    text: "Installing runtime graph: Next.js, React, TypeScript",
    kind: "output",
    output_for: "bun deploy",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
  {
    text: "Running static generation pipeline...",
    kind: "output",
    output_for: "bun deploy",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
  {
    text: "✓ Compiled successfully in 3.4s",
    kind: "output",
    output_for: "bun deploy",
    delay: 0,
    color_class: "text-electric-blue",
    bold: false,
    is_cursor: false,
  },
  {
    text: "✓ Generating static pages (5/5)",
    kind: "output",
    output_for: "bun deploy",
    delay: 0,
    color_class: "text-electric-blue",
    bold: false,
    is_cursor: false,
  },
  {
    text: "✓ Edge cache warmed and headers propagated.",
    kind: "output",
    output_for: "bun deploy",
    delay: 0,
    color_class: "text-electric-blue",
    bold: false,
    is_cursor: false,
  },
  {
    text: "Verifying auth handshake and environment secrets...",
    kind: "output",
    output_for: "bun deploy",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
  {
    text: "AI workers online: Claude · OpenAI",
    kind: "output",
    output_for: "bun deploy",
    delay: 0,
    color_class: "text-ignition-orange",
    bold: false,
    is_cursor: false,
  },
  {
    text: "Release health: stable | status: ready-to-ship",
    kind: "output",
    output_for: "bun deploy",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
  {
    text: "Production URL: https://gybrannauval.site/",
    kind: "output",
    output_for: "bun deploy",
    delay: 0,
    color_class: "text-muted-ash",
    bold: false,
    is_cursor: false,
  },
];

/** The minimal portfolio groups the experience by employer. */
export const MINIMAL_COMPANIES = [
  {
    company: "Halcom",
    company_website: "",
    company_icon: "briefcase",
    is_current: true,
    positions: [
      {
        title: "Software Engineer",
        period_start: "2026",
        period_end: "",
        employment_type: "Full-time",
        description:
          ">_ Role: Full-Stack Product Engineer\n>_ Architecture: Orchestrating high-performance, scalable web infrastructure utilizing Next.js App Router, TypeScript, and Prisma ORM backed by PostgreSQL and Dockerized environments.\n>_ Impact: Pioneering AI-integrated workflows and premium UI/UX architectures (inspired by Stripe & Linear) utilizing Framer Motion and Shadcn. Enforcing strict CI/CD pipelines with Conventional Commits to maintain zero-regression deployments.",
        skills: [
          "Next.js",
          "React",
          "TypeScript",
          "Tailwind CSS",
          "shadcn/ui",
          "Framer Motion",
          "PostgreSQL",
          "Prisma",
          "Docker",
        ],
      },
    ],
  },
  {
    company: "PT. Bejana Investidata Globalindo (Bigio)",
    company_website: "",
    company_icon: "briefcase",
    is_current: false,
    positions: [
      {
        title: "Intern Mobile Engineer",
        period_start: "08.2024",
        period_end: "12.2024",
        employment_type: "Internship",
        description:
          ">_ Role: Mobile Engineering Intern\n>_ Architecture: Engineered production-grade Flutter applications utilizing GetX state management and Firebase real-time synchronization.\n>_ Impact: Spearheaded the deployment of 'Raisehand' (Enterprise HR App). Drastically reduced post-release bugs and accelerated feature-to-prototype cycles by institutionalizing rigorous Pull Request templates and strict code-review disciplines across cross-functional pods.",
        skills: [
          "Flutter",
          "Dart",
          "Firebase",
          "REST API",
          "Git",
          "Code Review",
          "Teamwork",
        ],
      },
    ],
  },
  {
    company: "PT. Kabau Sirah Semen Padang",
    company_website: "",
    company_icon: "briefcase",
    is_current: false,
    positions: [
      {
        title: "Intern Full Stack Developer",
        period_start: "09.2023",
        period_end: "06.2024",
        employment_type: "Internship",
        description:
          ">_ Role: Full-Stack Engineering Intern\n>_ Architecture: Architected an end-to-end monolithic internal platform using the Laravel MVC framework and relational MySQL databases.\n>_ Impact: Digitized and centralized corporate asset allocation. Single-handedly managed the entire software development lifecycle (SDLC)—from database schema design to production deployment—delivering a robust meeting room reservation system utilized daily by internal divisions.",
        skills: [
          "Laravel",
          "PHP",
          "MySQL",
          "HTML",
          "CSS",
          "JavaScript",
          "Full Stack",
          "MVC",
        ],
      },
    ],
  },
];

export const MINIMAL_EDUCATION = [
  {
    institution: "Politeknik Negeri Padang",
    degree: "Bachelor of Technology - BTech, Teknologi Informasi",
    gpa: "3.83",
    period_start: "08.2021",
    period_end: "09.2025",
    description:
      ">_ Background: Actively participated in technology-related organizations and competitions. Served as President of Cybertech Student Organization, and competed in national and international events including KMIPN V, SAFE-Network & Maejo University Product Innovation Competition (Thailand), and Mobile App Competition 6.0 (Malaysia). Pursued various online certifications to enhance technical and leadership skills.\n\n>_ Final Project: Built Emonesia — an emotion detection system in social media texts using a fine-tuned IndoBERT NLP model. Integrated the model with a Flutter frontend via REST API to process live data streams from X (Twitter).\n\n>_ Impact: Transformed massive volumes of unstructured public discourse into structured, categorizable emotional insights with exportable CSV reports. The project bridged academic NLP research with a production-ready mobile application.",
    skills: [
      "Flutter",
      "Dart",
      "Firebase",
      "GetX",
      "REST API",
      "IndoBERT",
      "NLP",
      "Next.js",
      "React",
      "TypeScript",
      "Laravel",
      "PHP",
      "MySQL",
      "PostgreSQL",
      "Docker",
    ],
  },
];

export const MINIMAL_CERTIFICATIONS = [
  {
    title: "Belajar Prinsip Pemrograman SOLID",
    issuer: "Dicoding Indonesia",
    issuer_icon: "",
    issue_date: "2024-10-01",
    credential_id: "",
    credential_url: "",
  },
  {
    title: "Memulai Pemrograman dengan Dart",
    issuer: "Dicoding Indonesia",
    issuer_icon: "",
    issue_date: "2024-10-01",
    credential_id: "",
    credential_url: "",
  },
  {
    title: "Belajar GIT untuk Pemula",
    issuer: "CODEOPOLITAN",
    issuer_icon: "",
    issue_date: "2024-08-01",
    credential_id: "",
    credential_url: "",
  },
  {
    title: "Code Generation and Optimization Using IBM Granite",
    issuer: "IBM",
    issuer_icon: "",
    issue_date: "2024-06-01",
    credential_id: "",
    credential_url: "",
  },
  {
    title: "Belajar Membuat Aplikasi Flutter untuk Pemula",
    issuer: "Dicoding Indonesia",
    issuer_icon: "",
    issue_date: "2023-12-01",
    credential_id: "",
    credential_url: "",
  },
  {
    title: "Database Programming with SQL",
    issuer: "Oracle",
    issuer_icon: "",
    issue_date: "2022-07-01",
    credential_id: "",
    credential_url: "",
  },
];

export const MINIMAL_ORGANIZATIONS = [
  {
    company: "Cybertech (Technology & Programming Organization)",
    position: "President",
    period_start: "02.2023",
    period_end: "01.2024",
    description:
      ">_ Focus: Orchestrated a multi-disciplinary technology collective, directing 50+ members across software development, network infrastructure, and multimedia divisions.\n>_ Impact: Cultivated a culture of high-performance engineering and cross-functional collaboration. Spearheaded technical initiatives that secured 2 institutional-level innovation awards, establishing the collective as a premier technical hub.",
    skills: [
      "Technical Leadership",
      "Cross-functional Team Management",
      "Strategic Planning",
      "Public Speaking",
    ],
  },
  {
    company: "Cybertech (Technology & Programming Organization)",
    position: "Information & Communication Staff",
    period_start: "01.2022",
    period_end: "02.2023",
    description:
      ">_ Focus: Managed internal technical dispatch and external organizational branding, acting as the primary liaison for cross-departmental collaboration.\n>_ Impact: Revamped digital outreach strategies, yielding a 25% increase in community engagement. Fostered a robust knowledge-sharing ecosystem that accelerated peer-to-peer technical development.",
    skills: [
      "Developer Relations",
      "Technical Communication",
      "Community Building",
      "Digital Outreach",
    ],
  },
];

export const MINIMAL_LANGUAGES = [
  { name: "Bahasa Indonesia", level: "Native proficiency" },
  { name: "English", level: "Elementary proficiency" },
];

export const MINIMAL_AWARDS = [
  {
    kind: "Secured Funding",
    title: "Vocation Student Creativity Program 2024 - Community Service",
    org: "Ministry of Education, Indonesia",
    year: "2024-05",
    description:
      "> **The Challenge:** Manual administrative processes and lack of digital presence severely limited the accessibility of the M.Ihpan Patient Shelter for marginalized patients seeking temporary housing during medical treatments.\n\n> **Execution:** Engineered a centralized web-based management portal, digitizing patient onboarding and streamlining daily shelter operations.\n\n> **Impact:** Secured competitive national funding (PKM-PM 2024) and significantly improved accessibility for rural patients.",
  },
  {
    kind: "Finalist",
    title: "KMIPN V 2023",
    org: "Politeknik Elektronika Negeri Surabaya",
    year: "2023-08",
    description:
      "> **The Challenge:** Inefficient agricultural supply chains and dominant middlemen severely reduced farmers' profit margins while inflating food prices for consumers.\n\n> **Execution:** Engineered a Flutter-based Android e-commerce ecosystem to bypass traditional distributors. Integrated a QR-based 'Product Tracking' system for seed-to-harvest transparency and real-time harvest push notifications.\n\n> **Impact:** Enabled first-hand, direct-to-consumer (D2C) distribution. The innovation was recognized as a National Finalist in the ICT Innovation category (Cipta Inovasi TIK) among polytechnics nationwide.",
  },
  {
    kind: "Silver Medal (International)",
    title: "SAFE-Network & Maejo University, Thailand",
    org: "International Product Innovation",
    year: "2023-05",
    description:
      "> **The Challenge:** High product price gaps between farmers and consumers, coupled with the lack of secure and reliable platforms for affordable, high-quality organic materials.\n\n> **Execution:** Showcased a full-stack, easy-to-use mobile e-commerce application featuring comprehensive QR product tracking (cultivation to harvest history) and real-time harvest push notifications.\n\n> **Impact:** Awarded the Silver Medal for Product Innovation at an international level, validating the platform's potential to revolutionize D2C (Direct-to-Consumer) agricultural models and empower farmers digitally on a global scale.",
  },
  {
    kind: "Rising Star App",
    title: "Mobile App Competition 6.0 — Sarawak, Malaysia",
    org: "International Business & Prototype",
    year: "2023-04",
    description:
      "> **The Challenge:** Severe information asymmetry in the Malaysian retail sector. Ministry (KPDNHEP) data exposed a massive 57% price disparity for basic commodities across different outlets, leaving consumers blind to fair pricing and struggling with fragmented logistics.\n\n> **Execution:** Architected a localized D2C marketplace prototype to exploit this market gap. Designed core telemetry features including real-time commodity price tracking, integrated delivery routing, and a highly scalable dual-revenue engine (transactional commission & ad-space monetization).\n\n> **Impact:** Crowned \"Rising Star App\" for exceptional commercial viability. Successfully translated a macro-economic vulnerability into a high-efficiency tech solution, proving strong product-market fit and cross-border scalability.",
  },
];

/** The shared profile facts. */
export const PROFILE = {
  name: "Gybran Nauval Yuhandika",
  role: "Design-Driven Software Engineer (Full-Stack, Mobile, AI)",
  location: "Padang, West Sumatra, Indonesia",
  email: "owner@example.com",
  website: "https://gybrannauval.site/",
  avatar_url: PORTRAIT_URL,
  intro:
    "Engineer crafting fast, accessible, and polished web, mobile, and AI products with Next.js, Flutter, and TypeScript.",
  socials: [
    { key: "github", url: "https://github.com/razor322" },
    { key: "linkedin", url: "https://www.linkedin.com/in/gybrannauval1309/" },
    { key: "instagram", url: "https://www.instagram.com/gybranz_32/" },
    { key: "whatsapp", url: "https://wa.me/000000000000" },
    { key: "portfolio", url: "https://bit.ly/portofolio_gybran" },
  ],
  languages: [
    { name: "Bahasa Indonesia", level: "Native proficiency" },
    { name: "English", level: "Elementary proficiency" },
  ],
  documents: [
    { label: "Curriculum Vitae", href: "/documents/CV_ENG.pdf" },
    { label: "Portfolio Deck", href: "https://bit.ly/portofolio_gybran" },
    { label: "Portfolio Web", href: "https://dev-portofolio-gybran.vercel.app/" },
  ],
};
