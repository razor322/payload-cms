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

  const [profile, projects, experiences, capabilities, skills, terminalLines, testimonials, awards] =
    await Promise.all([
      payload.findGlobal({ slug: "profile", depth: 0 }),
      payload.find({ collection: "projects", limit: 200, sort: "sort", depth: 0 }),
      payload.find({ collection: "experiences", limit: 200, sort: "sort", depth: 0 }),
      payload.find({ collection: "capabilities", limit: 200, sort: "sort", depth: 0 }),
      payload.find({ collection: "skills", limit: 500, sort: "sort", depth: 0 }),
      payload.find({ collection: "terminal-lines", limit: 500, sort: "sort", depth: 0 }),
      payload.find({ collection: "testimonials", limit: 200, sort: "sort", depth: 0 }),
      payload.find({ collection: "awards", limit: 200, sort: "sort", depth: 0 }),
    ]);

  const payloadData = toContractPayload(
    {
      profile: profile as unknown as Record<string, unknown>,
      projects: projects.docs as unknown as Record<string, unknown>[],
      experiences: experiences.docs as unknown as Record<string, unknown>[],
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
