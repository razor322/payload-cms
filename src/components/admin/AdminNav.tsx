import { PREFERENCE_KEYS } from "payload/shared";
import { groupNavItems, EntityType } from "@payloadcms/ui/shared";
import React from "react";

import { AdminNavClient } from "./AdminNavClient";

type Props = {
  payload?: {
    config?: {
      collections?: unknown[];
      globals?: unknown[];
    };
  };
  permissions?: Parameters<typeof groupNavItems>[1];
  visibleEntities?: { collections: string[]; globals: string[] };
  i18n?: Parameters<typeof groupNavItems>[2];
  req?: {
    user?: { collection?: string; id?: string | number };
    payload?: {
      find: (args: Record<string, unknown>) => Promise<{ docs?: unknown[] }>;
    };
  };
};

export async function AdminNav({ payload, permissions, visibleEntities, i18n, req }: Props) {
  const config = payload?.config;

  if (!config) return null;

  const collections = (config.collections ?? []) as Array<{
    slug: string;
    admin?: { hidden?: boolean };
  }>;
  const globals = (config.globals ?? []) as Array<{ slug: string }>;
  const visible = visibleEntities ?? { collections: [], globals: [] };

  const groups = groupNavItems(
    [
      ...collections
        .filter(({ slug }) => visible.collections.includes(slug))
        .map((entity) => ({
          entity: entity as never,
          type: EntityType.collection,
        })),
      ...globals
        .filter(({ slug }) => visible.globals.includes(slug))
        .map((entity) => ({
          entity: entity as never,
          type: EntityType.global,
        })),
    ],
    permissions as never,
    i18n as never,
  );

  let navPreferences: { groups?: Record<string, { open?: boolean }>; open?: boolean } | null =
    null;
  if (req?.user?.collection && req.payload) {
    const found = await req.payload.find({
      collection: "payload-preferences",
      depth: 0,
      limit: 1,
      pagination: false,
      req,
      where: {
        and: [
          { key: { equals: PREFERENCE_KEYS.NAV } },
          { "user.relationTo": { equals: req.user.collection } },
          { "user.value": { equals: req.user.id } },
        ],
      },
    });
    const value = (found?.docs?.[0] as { value?: unknown } | undefined)?.value;
    navPreferences = (value as { groups?: Record<string, { open?: boolean }>; open?: boolean }) ?? null;
  }

  return (
    <AdminNavClient
      groups={groups}
      initialNavOpen={Boolean(navPreferences?.open)}
      navPreferences={navPreferences}
    />
  );
}

export default AdminNav;
