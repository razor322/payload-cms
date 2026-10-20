"use client";

import { useAuth, useConfig, useTranslation } from "@payloadcms/ui";
import { getTranslation } from "@payloadcms/translations";
import { usePathname } from "next/navigation";
import React from "react";

type EntityLike = {
  slug: string;
  labels?: { singular?: unknown; plural?: unknown };
  label?: unknown;
};

const titleFromPath = (
  pathname: string,
  adminRoute: string,
  collections: EntityLike[],
  globals: EntityLike[],
  i18n: unknown,
): string => {
  const rest = pathname.slice(adminRoute.length);
  const parts = rest.split("/").filter(Boolean);

  if (parts.length === 0) return "Dashboard";

  if (parts[0] === "collections" && parts[1]) {
    const entity = collections.find((c) => c.slug === parts[1]);
    const label = entity?.labels?.plural ?? entity?.label ?? entity?.slug;
    return typeof label === "string"
      ? label
      : String(
          getTranslation(
            label as Parameters<typeof getTranslation>[0],
            i18n as Parameters<typeof getTranslation>[1],
          ),
        );
  }

  if (parts[0] === "globals" && parts[1]) {
    const entity = globals.find((g) => g.slug === parts[1]);
    const label = entity?.label ?? entity?.slug;
    return typeof label === "string"
      ? label
      : String(
          getTranslation(
            label as Parameters<typeof getTranslation>[0],
            i18n as Parameters<typeof getTranslation>[1],
          ),
        );
  }

  if (parts[0] === "account") return "Account";

  return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
};

export function AdminHeader() {
  const { user } = useAuth();
  const { config } = useConfig();
  const { i18n } = useTranslation();
  const pathname = usePathname();

  const title = titleFromPath(
    pathname,
    config.routes.admin,
    (config.collections ?? []) as EntityLike[],
    (config.globals ?? []) as EntityLike[],
    i18n,
  );

  const name =
    (user && typeof user === "object" && "name" in user && (user.name as string)) ||
    (user && typeof user === "object" && "email" in user && (user.email as string)) ||
    "";
  const initial = name ? name.charAt(0).toUpperCase() : "A";
  const role = (user as { role?: string } | null)?.role ?? "Administrator";

  return (
    <header className="admin-header">
      <h1 className="admin-header__title">{title}</h1>
      <div className="admin-header__user" title={name || "Account"}>
        <span className="admin-header__avatar" aria-hidden="true">
          {initial}
        </span>
        <span className="admin-header__user-text">
          <span className="admin-header__user-name">{name || "Account"}</span>
          <span className="admin-header__user-role">{role}</span>
        </span>
      </div>
    </header>
  );
}
