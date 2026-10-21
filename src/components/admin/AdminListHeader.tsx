import React from "react";

import { CardHeaderAction } from "@/components/admin/ui/CardHeaderAction";

/**
 * The list head, as the kyos admin writes it: the collection name, the
 * document count under it, and the create action on the right, over a 2px
 * ink rule. Payload renders this slot above the list controls, and the
 * stylesheet joins the three parts into one card.
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
  limit,
  newDocumentURL,
}: {
  collectionConfig?: { labels?: { plural?: unknown; singular?: unknown } };
  data?: { page?: number; totalDocs?: number };
  hasCreatePermission?: boolean;
  i18n?: I18n;
  limit?: number;
  newDocumentURL?: string;
}) {
  const title =
    firstString(collectionConfig?.labels?.plural) ||
    firstString(collectionConfig?.labels?.singular) ||
    "List";

  const total = typeof data?.totalDocs === "number" ? data.totalDocs : undefined;
  const page = data?.page ?? 1;
  const size = limit ?? 10;
  const from = total ? Math.min((page - 1) * size + 1, total) : 0;
  const to = total ? Math.min(page * size, total) : 0;

  return (
    <div className="list-header-slot">
      <CardHeaderAction
        action={
          hasCreatePermission && newDocumentURL ? (
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
          ) : undefined
        }
        subtitle={total === undefined ? undefined : `${total} in the list, showing ${from} to ${to}`}
        title={title}
      />
    </div>
  );
}

export default AdminListHeader;
