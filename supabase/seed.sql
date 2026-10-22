-- Seed content mirrored from the three portfolio sites (Phase 4).
--
-- This is the dev flavour: the contact address is a placeholder. The public
-- flavour is the same rows with the owner's real address, and the app seed
-- writes it from the environment (SEED_PROFILE=public, OWNER_EMAIL).

insert into profile (name, role, location, email, website, intro)
values (
  'Gybran Nauval Yuhandika',
  'Design-Driven Software Engineer (Full-Stack, Mobile, AI)',
  'Padang, Sumatra Barat, Indonesia',
  'owner@example.com',
  'https://gybrannauval.site/',
  'Engineer crafting fast, accessible, and polished web, mobile, and AI products with Next.js, Flutter, and TypeScript.'
);

insert into section_headers
  (site, section, left_kicker, left_title, middle_kicker, middle_title, right_kicker, right_title)
values
  ('my','capability','From','Design.','CRAFT','Build.','TO CODE','Ship.'),
  ('my','skills','HOW','Code.','IT''S','Ships.','BUILT','Fast.'),
  ('my','projects','SELECTED','Works.','SHIPPED','Products.','PROVEN','Impact.'),
  ('my','experience','CAREER','Roles.','LOG','Built.','HISTORY','Shipped.'),
  ('my','about','WHO','Code.','AM','Design.','I','Me.');

insert into projects
  (slug, title, role, subtitle, description, impact, highlights, tech, github, live, image_url, featured, year, category, status, sort)
values
  ('dzikra','Dzikra','Mobile Developer','Habit & worship mobile app',
   'Production mobile app on Google Play Store, built to help users maintain daily worship habits with gentle routine tracking and consistency-focused UX.',
   'Live on Play Store with Firebase backend, real-time sync, and notification-driven habit loops designed for high-mobility users.',
   ARRAY['Live on Google Play Store with Firebase backend and real-time sync.','Notification-driven habit loops designed for high-mobility users.','Gentle routine tracking and consistency-focused UX for daily worship.','Built with Flutter, Dart, Firebase, and GetX architecture.'],
   ARRAY['Flutter','Dart','Firebase','GetX'],
   'https://play.google.com/store/apps/details?id=id.bigio.dzikra&hl=en',
   'https://play.google.com/store/apps/details?id=id.bigio.dzikra&hl=en',
   '/images/projects/bks.webp', true, '2024', 'Mobile App', 'Live (Google Play Store)', 0),
  ('raisehand','Raisehand','Mobile Engineer','Internal attendance system',
   'Production employee attendance app for Inovasi360 and Bigio, featuring GPS-based check-in, push notifications, and automated leave request workflows.',
   'Deployed on Google Play Store and used daily for location-verified attendance tracking.',
   ARRAY['Production employee attendance app for Inovasi360 and Bigio.','Features GPS-based check-in and location-verified attendance tracking.','Push notifications and automated leave request workflows in a single app.','Deployed on Google Play Store and used daily across the organization.'],
   ARRAY['Flutter','Dart','Firebase','GetX'],
   'https://play.google.com/store/apps/details?id=id.inovasi360.attendapp&hl=en&pli=1',
   'https://play.google.com/store/apps/details?id=id.inovasi360.attendapp&hl=en&pli=1',
   '/images/projects/atms.webp', true, '2024', 'Mobile App', 'Live (Google Play Store)', 1),
  ('eztix-id','Eztix.id','Full-Stack Developer','Ticket booking platform',
   'Web booking platform for browsing events, reviewing ticket details, and reserving with Firebase-backed auth.',
   'Brings customer booking and admin management into one event operations product.',
   ARRAY['Web booking platform for browsing events and reviewing ticket details.','Reserving tickets with Firebase-backed authentication.','Brings customer booking and admin management into one operations product.','Responsive Next.js & Tailwind CSS frontend with REST API backend.'],
   ARRAY['Next.js','Firebase','Tailwind CSS','TypeScript','Node.js','REST API'],
   'https://eztix.id/','https://eztix.id/',
   '/images/projects/melon.webp', true, '2025', 'Web Application', 'Live', 2),
  ('room-space-booking','Room and Space Booking Website','Full-Stack Developer','Enterprise reservation system',
   'Booking system with authentication, user management, and CRUD workflows for room reservation operations.',
   'Built to help teams manage availability, booking flow, and administration in one place.',
   ARRAY['Booking system with authentication, user management, and CRUD workflows.','Built to help internal teams manage availability and room administration.','Full-stack implementation from database schema design to responsive UI.','Developed using Laravel MVC architecture, PHP, MySQL, and Tailwind CSS.'],
   ARRAY['Laravel','PHP','MySQL','Tailwind CSS'],
   '#','#',
   '/images/projects/bks.webp', false, '2024', 'Web Application', 'Live (Internal / Enterprise)', 3),
  ('emonesia','Emonesia','AI / Mobile Developer','AI sentiment analysis platform',
   'Emotion detection app powered by IndoBERT NLP model, analyzing social media conversations from X (Twitter) by keyword and time range with structured reporting.',
   'Transforms unstructured public conversation data into categorized emotional insights with downloadable CSV reports.',
   ARRAY['Emotion detection app powered by IndoBERT NLP model analyzing X (Twitter) data.','Filters conversations by keyword and time range with structured reporting.','Transforms unstructured public data into categorized emotional insights.','Provides downloadable CSV reports with Flutter frontend and REST API backend.'],
   ARRAY['Flutter','Dart','Firebase','GetX','REST API','IndoBERT NLP'],
   'https://github.com/razor322/emonesia','https://github.com/razor322/emonesia',
   '/images/projects/emr.webp', true, '2024', 'AI / Machine Learning', 'Case Study', 4),
  ('trolley-petani','Trolley Petani','Mobile Developer','Agri-commerce mobile app',
   'Lightweight e-commerce app connecting customers directly with produce from local farmers and ranchers, built with Flutter.',
   'Awarded Rising Star recognition at the UNIMAS international competition.',
   ARRAY['Lightweight e-commerce app connecting customers directly with local farmers.','Awarded Rising Star recognition at the UNIMAS international competition.','Clear value proposition focused on agricultural impact potential.','Cross-platform mobile application built with Flutter.'],
   ARRAY['Flutter','Dart'],
   'https://github.com/razor322/trolley-v2','https://github.com/razor322/trolley-v2',
   '/images/projects/outfithaven.webp', false, '2024', 'Mobile App', 'Case Study', 5),
  ('catering-management-system','Catering Management System','Full-Stack Developer','Operations dashboard',
   'Management system for orders, inventory, and customer relationships in catering workflow.',
   'Combines service operations into one product surface for smoother day-to-day management.',
   ARRAY['Management system for orders, inventory, and customer relationships.','Combines service operations into one product surface.','Modern UI built with Next.js, shadcn/ui, and TypeScript.','Backend services developed with Node.js and Express.'],
   ARRAY['Next.js','shadcn/ui','TypeScript','Node.js','Express'],
   'https://github.com/razor322/sea-catering','https://github.com/razor322/sea-catering',
   '/images/projects/dbauto.webp', false, '2025', 'Web Application', 'Case Study', 6);

insert into experiences
  (ext_id, company, position, period, location, type, duration, mode, role, summary, outcomes, stack, sort)
values
  ('EXP-003','PT. Halcom Inovasi Teknologi','Software Developer','JAN 2026 — PRESENT','Padang, West Sumatra','Full-time','6 months','On-site','Full-stack Developer',
   'Delivering tailor-made web applications using a modern stack. Collaborating with developer teams to accelerate client delivery through rapid prototyping, modern UI components, and optimized AI workflows.',
   ARRAY['Collaborated with a developer team to build custom web applications, utilizing Laravel for robust APIs and Next.js for high-performance frontends.','Created highly interactive designs and prototypes using modern UI components and animation libraries to secure project alignment and early client sign-offs.','Leveraged AI agents to accelerate development cycles by an estimated 20%, establishing structured upfront planning and precise execution for faster workflows.'],
   ARRAY['Next.js','Laravel','PostgreSQL','Tailwind CSS','AI Integration','Docker'], 0),
  ('EXP-002','PT. Bejana Investidata Globalindo (Bigio)','Intern Mobile Engineer','AUG 24 — DEC 24','Malang, East Java','Internship','5 months','On-site','Mobile Engineering',
   'Shipped mobile products with cross-functional teams, enforcing code review discipline and production-ready delivery standards.',
   ARRAY['Translated product requirements into Flutter implementations alongside designers and product managers, reducing feature-to-prototype cycle time.','Enforced code review practices that reduced post-release bug reports and improved team code quality.','Launched a production mobile app (Raisehand) now used for daily employee attendance across the organization.'],
   ARRAY['Flutter','Dart','Firebase','REST API','Git'], 1),
  ('EXP-001','PT. Kabau Sirah Semen Padang','Intern Full Stack Developer','SEP 23 — JUN 24','Padang, West Sumatra','Internship','10 months','On-site','Full Stack Development',
   'Built reservation and booking systems with Laravel, handling full-stack delivery from database design to production deployment over 10 months.',
   ARRAY['Developed a meeting room reservation system from scratch — database schema, REST API, authentication, and responsive UI — used daily by internal teams.','Executed full development lifecycle across design, implementation, and testing using Laravel MVC architecture and MySQL.','Delivered API integrations and booking features through cross-team collaboration, shipping production code over a 10-month engagement.'],
   ARRAY['Laravel','PHP','MySQL','HTML','CSS','JavaScript'], 2);

insert into capabilities (site, title, description, tags, sort)
values
  ('my','Web Development','Building fast, responsive, and search-optimized web applications using Next.js and React. Every component is structured for scalability and polished with micro-animations for a premium feel.',ARRAY['PERFORMANCE','PRECISION','SCALABILITY'],0),
  ('my','Mobile Development','Delivering Flutter products that feel native, not ported. Focused on smooth rendering, consistent behavior, and experiences users actually want to return to.',ARRAY['CONSISTENCY','RELIABILITY','USABILITY'],1),
  ('my','AI Integration','Bringing AI into products so it earns its place. From model integration to prompt shaping — making intelligence feel like a feature, not a footnote.',ARRAY['ACCURACY','INTEGRATION','CLARITY'],2);

insert into skills (site, category, name, icon_key, sort)
values
  ('my','Core Infrastructure','TypeScript','ts',0),
  ('my','Core Infrastructure','React','react-js',1),
  ('my','Core Infrastructure','Next.js','nextjs',2),
  ('my','Core Infrastructure','Flutter','flutter',3),
  ('my','Core Infrastructure','Laravel','laravel',4),
  ('my','Core Infrastructure','Express','expressjs',5),
  ('my','Core Infrastructure','Supabase','supabase',6),
  ('my','Core Infrastructure','Hono','hono',7),
  ('my','UI & Interaction','Tailwind CSS','tailwindcss',0),
  ('my','UI & Interaction','shadcn/ui','shadcn-ui',1),
  ('my','UI & Interaction','GSAP','gsap',2),
  ('my','UI & Interaction','Radix UI','radix-ui',3),
  ('my','UI & Interaction','Figma','figma',4),
  ('my','Data & Auth','Supabase','supabase',0),
  ('my','Data & Auth','Firebase','firebase',1),
  ('my','Data & Auth','Drizzle ORM','drizzle-orm',2),
  ('my','Data & Auth','Better Auth','better-auth',3),
  ('my','Data & Auth','JWT','jwt',4),
  ('my','Data & Auth','Prisma','prisma',5),
  ('my','Data & Auth','MySQL','mysql',6),
  ('my','Cloud & DevOps','Docker','docker',0),
  ('my','Cloud & DevOps','Vercel','veercel',1),
  ('my','Cloud & DevOps','GitHub','github',2),
  ('my','Cloud & DevOps','Git','git',3),
  ('my','Cloud & DevOps','Bun','bun',4),
  ('my','AI & Intelligence','OpenAI','openai',0),
  ('my','AI & Intelligence','Claude','claude',1),
  ('my','AI & Intelligence','Gemini','gemini',2),
  ('my','AI & Intelligence','MCP','mcp-model-context-protocol',3),
  ('my','AI & Intelligence','OpenCode','opencode',4);

insert into terminal_lines (site, text, delay, color_class, bold, is_cursor, sort)
values
  ('my','Initializing telemetry sequence...',0,'text-muted-ash',false,false,0),
  ('my','Mounting core infrastructures...',200,'text-muted-ash',false,false,1),
  ('my','[TS, React, Next, Flutter, Laravel, Postgres]',500,'text-ghost-ink',true,false,2),
  ('my','[OK] Core modules loaded into memory.',800,'text-electric-blue',false,false,3),
  ('my','Mapping ecosystem nodes (UI, Data, DevOps, AI)...',1100,'text-muted-ash',false,false,4),
  ('my','Connecting to 25+ remote clusters...',1400,'text-muted-ash',false,false,5),
  ('my','Security handshake verified via Auth & JWT.',1700,'text-ignition-orange',false,false,6),
  ('my','AI integration models [Claude, OpenAI] spun up.',2000,'text-ignition-orange',false,false,7),
  ('my','All systems nominal. Ready to ship.',2400,'text-ghost-ink',true,false,8),
  ('my','',2700,'text-muted-ash',false,true,9);
