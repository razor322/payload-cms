import { getPayloadClient } from "@/lib/payload";
import { toContractPayload, type Site } from "@/lib/mappers/payload-contract";

export const dynamic = "force-dynamic";

const SITES: Site[] = ["v3", "my", "minimal"];

export async function GET(request: Request) {
  const url = new URL(request.url);
  const requested = url.searchParams.get("site");
  const site = requested && SITES.includes(requested as Site) ? (requested as Site) : null;
  if (!site) {
    return Response.json(
      { error: "Query param `site` must be one of v3, my, minimal." },
      { status: 400 },
    );
  }

  const payload = await getPayloadClient();

  const [
    profile,
    projects,
    siteProjects,
    siteContent,
    experiences,
    companies,
    capabilities,
    skills,
    terminalLines,
    testimonials,
    awards,
  ] = await Promise.all([
    payload.findGlobal({ slug: "profile", depth: 0 }),
    payload.find({ collection: "projects", limit: 200, sort: "sort", depth: 0 }),
    payload.find({ collection: "site-projects", limit: 500, sort: "sort", depth: 0 }),
    payload.find({ collection: "site-content", limit: 5, depth: 0 }),
    payload.find({ collection: "experiences", limit: 200, sort: "sort", depth: 0 }),
    payload.find({ collection: "companies", limit: 200, sort: "sort", depth: 0 }),
    payload.find({ collection: "capabilities", limit: 200, sort: "sort", depth: 0 }),
    payload.find({ collection: "skills", limit: 500, sort: "sort", depth: 0 }),
    payload.find({ collection: "terminal-lines", limit: 500, sort: "sort", depth: 0 }),
    payload.find({ collection: "testimonials", limit: 200, sort: "sort", depth: 0 }),
    payload.find({ collection: "awards", limit: 200, sort: "sort", depth: 0 }),
  ]);

  const siteContentDoc =
    (siteContent.docs.find(
      (doc) => (doc as unknown as { site?: string }).site === site,
    ) as unknown as Record<string, unknown> | undefined) ?? null;

  const payloadData = toContractPayload(
    {
      profile: profile as unknown as Record<string, unknown>,
      siteContent: siteContentDoc,
      projects: projects.docs as unknown as Record<string, unknown>[],
      siteProjects: siteProjects.docs as unknown as {
        site?: string;
        project: number | { id: number };
        sort?: number;
        featured_override?: boolean | null;
        title_override?: string | null;
        subtitle_override?: string | null;
      }[],
      experiences: experiences.docs as unknown as Record<string, unknown>[],
      companies: companies.docs as unknown as Record<string, unknown>[],
      capabilities: capabilities.docs as unknown as Record<string, unknown>[],
      skills: skills.docs as unknown as Record<string, unknown>[],
      terminal_lines: terminalLines.docs as unknown as Record<string, unknown>[],
      testimonials: testimonials.docs as unknown as Record<string, unknown>[],
      awards: awards.docs as unknown as Record<string, unknown>[],
    },
    site,
  );

  return Response.json(payloadData);
}
