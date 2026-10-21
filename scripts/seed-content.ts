/**
 * Seeds the per-site content from the portfolio repos into the CMS.
 *
 * The shared facts (the seven projects, the three experiences, the profile)
 * are updated in place. The site scoped rows are replaced, so the script can
 * run again after a content change in a portfolio repo.
 *
 * Usage: bun scripts/seed-content.ts
 */
import "./load-env";

import { getPayload } from "payload";

import config from "../src/payload.config";
import {
  EXPERIENCE_PERIODS,
  MINIMAL_AWARDS,
  MINIMAL_CERTIFICATIONS,
  MINIMAL_COMPANIES,
  MINIMAL_EDUCATION,
  MINIMAL_LANGUAGES,
  MINIMAL_ORGANIZATIONS,
  MY_TERMINAL_COMMANDS,
  MY_TERMINAL_OUTPUTS,
  PROFILE,
  PROJECT_PERIODS,
  SITE_CONTENT,
  SITE_PROJECTS,
  TITLE_OVERRIDES,
  V3_CAPABILITIES,
  V3_SKILLS,
  MINIMAL_SKILLS,
} from "./seed-data";

const payload = await getPayload({ config });

const count = { created: 0, deleted: 0, updated: 0 };

const rowsOf = async (collection: string, site: string) => {
  const result = await payload.find({
    collection,
    limit: 500,
    depth: 0,
    where: { site: { equals: site } },
  });
  return result.docs;
};

const clearSite = async (collection: string, site: string) => {
  const rows = await rowsOf(collection, site);
  for (const row of rows) {
    await payload.delete({ collection, id: row.id });
    count.deleted++;
  }
};

const create = async (collection: string, data: Record<string, unknown>) => {
  await payload.create({ collection, data });
  count.created++;
};

const replaceSite = async (
  collection: string,
  site: string,
  rows: Record<string, unknown>[],
) => {
  await clearSite(collection, site);
  for (const row of rows) {
    await create(collection, { ...row, site });
  }
};

// --- site content ------------------------------------------------------------

for (const content of SITE_CONTENT) {
  await replaceSite("site-content", content.site, [content]);
}

// --- the project list per site ----------------------------------------------

const projects = await payload.find({ collection: "projects", limit: 100, depth: 0 });
const projectId = new Map(projects.docs.map((doc) => [doc.slug as string, doc.id]));

for (const [site, slugs] of Object.entries(SITE_PROJECTS)) {
  await clearSite("site-projects", site);
  for (const [index, slug] of slugs.entries()) {
    const id = projectId.get(slug);
    if (!id) throw new Error(`unknown project slug: ${slug}`);
    const override = TITLE_OVERRIDES[site]?.[slug];
    await create("site-projects", {
      site,
      project: id,
      sort: index,
      featured_override: site === "v3" ? null : false,
      title_override: override ?? "",
    });
  }
}

// --- skills and capabilities -------------------------------------------------

await replaceSite(
  "skills",
  "v3",
  V3_SKILLS.map((skill, index) => ({ ...skill, sort: index })),
);
await replaceSite(
  "skills",
  "minimal",
  MINIMAL_SKILLS.map((skill, index) => ({ ...skill, sort: index })),
);

await replaceSite(
  "capabilities",
  "v3",
  V3_CAPABILITIES.map((capability, index) => ({
    ...capability,
    tags: capability.tags.map((value) => ({ value })),
    sort: index,
  })),
);

// --- the terminal commands the CMS only had the lines for --------------------

const myTerminal = await rowsOf("terminal-lines", "my");
const myMaxSort = myTerminal.reduce(
  (max, row) => Math.max(max, (row.sort as number) ?? 0),
  0,
);
for (const row of myTerminal) {
  if ((row.kind as string) !== "line") {
    await payload.delete({ collection: "terminal-lines", id: row.id });
    count.deleted++;
  }
}

let sort = myMaxSort + 1;
for (const command of MY_TERMINAL_COMMANDS) {
  await create("terminal-lines", { ...command, site: "my", sort: sort++ });
}
for (const output of MY_TERMINAL_OUTPUTS) {
  await create("terminal-lines", { ...output, site: "my", sort: sort++ });
}

// --- the minimal only domains -----------------------------------------------

await replaceSite(
  "companies",
  "minimal",
  MINIMAL_COMPANIES.map((company, index) => ({
    ...company,
    positions: company.positions.map((position) => ({
      ...position,
      skills: position.skills.map((value) => ({ value })),
    })),
    sort: index,
  })),
);

await replaceSite(
  "education",
  "minimal",
  MINIMAL_EDUCATION.map((row, index) => ({
    ...row,
    skills: row.skills.map((value) => ({ value })),
    sort: index,
  })),
);

await replaceSite(
  "certifications",
  "minimal",
  MINIMAL_CERTIFICATIONS.map((row, index) => ({ ...row, sort: index })),
);

await replaceSite(
  "organizations",
  "minimal",
  MINIMAL_ORGANIZATIONS.map((row, index) => ({
    ...row,
    skills: row.skills.map((value) => ({ value })),
    sort: index,
  })),
);

await replaceSite(
  "languages",
  "minimal",
  MINIMAL_LANGUAGES.map((row, index) => ({ ...row, sort: index })),
);

await replaceSite(
  "awards",
  "minimal",
  MINIMAL_AWARDS.map((row, index) => ({ ...row, sort: index })),
);

// --- the shared facts --------------------------------------------------------

for (const project of projects.docs) {
  const period = PROJECT_PERIODS[project.slug as string];
  if (!period) continue;
  if (
    project.period_start === period.start &&
    project.period_end === period.end
  ) {
    continue;
  }
  await payload.update({
    collection: "projects",
    id: project.id,
    data: { period_start: period.start, period_end: period.end },
  });
  count.updated++;
}

const experiences = await payload.find({
  collection: "experiences",
  limit: 100,
  depth: 0,
});
for (const experience of experiences.docs) {
  const period = EXPERIENCE_PERIODS[experience.company as string];
  if (!period) continue;
  if (
    experience.period_start === period.start &&
    experience.period_end === period.end
  ) {
    continue;
  }
  await payload.update({
    collection: "experiences",
    id: experience.id,
    data: { period_start: period.start, period_end: period.end },
  });
  count.updated++;
}

await payload.updateGlobal({
  slug: "profile",
  data: PROFILE,
});
count.updated++;

console.log(
  `seeded: ${count.created} created, ${count.deleted} deleted, ${count.updated} updated`,
);

process.exit(0);
