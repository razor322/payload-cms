import { getTranslation } from "@payloadcms/translations";
import React from "react";

import { SearchField } from "@/components/admin/ui/SearchField";

/**
 * The list head, as the reference writes it: the collection name and the count
 * on the left, the search and the create action on the right, over a 2px ink
 * rule. Payload renders this slot inside the list card, and its own search row
 * is hidden so this is the only one.
 */
type I18n = Record<string, unknown> & { language?: string };

const firstString = (value: unknown): string => {
  if (typeof value === "string") return value;
  if (value && typeof value === "object") {
    for (const candidate of Object.values(value)) {
      if (typeof candidate === "string") return candidate;
    }
  }
  return "";
};

export function AdminListHeader({
  collectionConfig,
  data,
  hasCreatePermission,
  i18n,
  limit,
  newDocumentURL,
}: {
  collectionConfig?: {
    labels?: { plural?: unknown; singular?: unknown };
    slug?: string;
  };
  data?: { page?: number; totalDocs?: number };
  hasCreatePermission?: boolean;
  i18n?: I18n;
  limit?: number;
  newDocumentURL?: string;
}) {
  const rawTitle = collectionConfig?.labels?.plural ?? collectionConfig?.labels?.singular;
  const title =
    firstString(rawTitle) ||
    (rawTitle
      ? String(getTranslation(rawTitle as never, i18n as never))
      : "") ||
    "List";

  const total = typeof data?.totalDocs === "number" ? data.totalDocs : undefined;
  const page = data?.page ?? 1;
  const size = limit ?? 10;
  const from = total ? Math.min((page - 1) * size + 1, total) : 0;
  const to = total ? Math.min(page * size, total) : 0;

  return (
    <div className="list-header-slot">
      <div className="pa-list-head">
        <div className="pa-list-head__row">
          <div className="pa-list-head__text">
            <h2 className="pa-list-head__title">{title}</h2>
            {total === undefined ? null : (
              <p className="pa-list-head__subtitle">
                {`${total} in the list, showing ${from} to ${to}`}
              </p>
            )}
          </div>
          <div className="pa-list-head__actions">
            <SearchField placeholder={`Search ${title.toLowerCase()}`} />
            {hasCreatePermission && newDocumentURL ? (
              <a className="pa-button pa-button--accent" href={newDocumentURL}>
                <svg
                  aria-hidden="true"
                  fill="none"
                  height="16"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  width="16"
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
                New
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminListHeader;
