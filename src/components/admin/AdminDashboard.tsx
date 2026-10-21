import React from "react";

import { BarChart, ChartCard } from "@/components/kyos/BarChart";
import { Card, CardContent, CardHeader } from "@/components/kyos/Card";
import { StatCard } from "@/components/kyos/StatCard";
import { getPayloadClient } from "@/lib/payload";

/**
 * The dashboard, built the way the kyos admin builds its own: a row of stat
 * cards, a row with a wide chart and a narrow one, and a row of two lists.
 * The numbers are read from the CMS, so the page says something true about
 * the content instead of counting widgets.
 */

const SITES = [
  { label: "portfolio-v3", site: "v3" },
  { label: "MYportfolio", site: "my" },
  { label: "minimal", site: "minimal" },
];

const CONTENT_COLLECTIONS = [
  "projects",
  "site-projects",
  "experiences",
  "companies",
  "capabilities",
  "skills",
  "terminal-lines",
  "testimonials",
  "awards",
  "section-headers",
  "site-content",
  "education",
  "certifications",
  "organizations",
  "languages",
] as const;

const ACCENTS = ["#ff5a00", "#4a2e83", "#e74c89", "#2d1b54", "#74b9ff", "#FFEAA7"];

export async function AdminDashboard() {
  const payload = await getPayloadClient();
  const adminRoute = "/admin";

  const totals = await Promise.all(
    CONTENT_COLLECTIONS.map(async (collection) => {
      const result = await payload.count({
        collection: collection as never,
        overrideAccess: true,
      });
      return { collection, total: result.totalDocs };
    }),
  );

  const documents = totals.reduce((sum, entry) => sum + entry.total, 0);

  const media = await payload.count({ collection: "media", overrideAccess: true });
  const users = await payload.count({ collection: "users", overrideAccess: true });

  const perSite = await Promise.all(
    SITES.map(async ({ label, site }) => {
      const rows = await payload.find({
        collection: "site-projects",
        depth: 0,
        limit: 0,
        overrideAccess: true,
        where: { site: { equals: site } },
      });
      return { label, value: rows.totalDocs };
    }),
  );

  const byCollection = totals
    .filter((entry) => entry.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, 6)
    .map((entry, index) => ({
      color: ACCENTS[index] ?? "#ff5a00",
      label: entry.collection,
      value: entry.total,
    }));

  const recent = await payload.find({
    collection: "projects",
    depth: 0,
    limit: 6,
    overrideAccess: true,
    sort: "-updatedAt",
  });

  const mediaRows = await payload.find({
    collection: "media",
    depth: 0,
    limit: 6,
    overrideAccess: true,
    sort: "-updatedAt",
  });

  return (
    <div className="kyos-dashboard gutter gutter--left gutter--right">
      <div className="kyos-dashboard__stack">
        <div className="kyos-grid kyos-grid--four">
          <StatCard
            accentColor="#ff5a00"
            icon={
              <svg aria-hidden="true" fill="none" height="18" stroke="#ff5a00" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
              </svg>
            }
            subtext="across the content"
            title="Documents"
            value={documents}
          />
          <StatCard
            accentColor="#4a2e83"
            icon={
              <svg aria-hidden="true" fill="none" height="18" stroke="#4a2e83" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M3 5v14a9 3 0 0 0 18 0V5" />
                <path d="M3 12a9 3 0 0 0 18 0" />
              </svg>
            }
            subtext={`${CONTENT_COLLECTIONS.length} collections`}
            title="Content tables"
            value={CONTENT_COLLECTIONS.length}
          />
          <StatCard
            accentColor="#e74c89"
            icon={
              <svg aria-hidden="true" fill="none" height="18" stroke="#e74c89" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18">
                <rect height="18" rx="2" ry="2" width="18" x="3" y="3" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            }
            subtext="in the library"
            title="Media"
            value={media.totalDocs}
          />
          <StatCard
            accentColor="#2d1b54"
            icon={
              <svg aria-hidden="true" fill="none" height="18" stroke="#2d1b54" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" viewBox="0 0 24 24" width="18">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
            subtext={`${users.totalDocs} signed in`}
            title="Sites"
            value={SITES.length}
          />
        </div>

        <div className="kyos-grid kyos-grid--three">
          <div className="kyos-col-span-2">
            <ChartCard title="Projects composed per site">
              <BarChart bars={perSite.map((row) => ({ ...row, color: "#ff5a00" }))} />
            </ChartCard>
          </div>
          <div className="kyos-col-span-1">
            <ChartCard title="Largest tables">
              <BarChart bars={byCollection} />
            </ChartCard>
          </div>
        </div>

        <div className="kyos-grid kyos-grid--two">
          <Card>
            <CardHeader
              action={
                <a className="kyos-button kyos-button--accent" href={`${adminRoute}/collections/projects`}>
                  Open
                </a>
              }
              subtitle="the last edited"
              title="Projects"
            />
            <CardContent className="kyos-card__content kyos-card__content--flush">
              {recent.docs.length === 0 ? (
                <p className="kyos-card__empty">No projects yet.</p>
              ) : (
                <ul className="kyos-rows">
                  {recent.docs.map((doc) => (
                    <li key={String(doc.id)}>
                      <a
                        className="kyos-row"
                        href={`${adminRoute}/collections/projects/${doc.id}`}
                      >
                        <span className="kyos-row__label">
                          {String((doc as { title?: string }).title ?? doc.id)}
                        </span>
                        <span className="kyos-row__meta">
                          {String((doc as { slug?: string }).slug ?? "")}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader
              action={
                <a className="kyos-button kyos-button--accent" href={`${adminRoute}/collections/media`}>
                  Open
                </a>
              }
              subtitle="the last uploaded"
              title="Media"
            />
            <CardContent className="kyos-card__content kyos-card__content--flush">
              {mediaRows.docs.length === 0 ? (
                <p className="kyos-card__empty">No media yet.</p>
              ) : (
                <ul className="kyos-rows">
                  {mediaRows.docs.map((doc) => (
                    <li key={String(doc.id)}>
                      <a
                        className="kyos-row"
                        href={`${adminRoute}/collections/media/${doc.id}`}
                      >
                        <span className="kyos-row__label">
                          {String((doc as { filename?: string }).filename ?? doc.id)}
                        </span>
                        <span className="kyos-row__meta">
                          {String((doc as { mimeType?: string }).mimeType ?? "")}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
