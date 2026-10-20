"use client";

import { Link, LogOutIcon } from "@payloadcms/ui";
import { useConfig } from "@payloadcms/ui";
import { useTranslation } from "@payloadcms/ui";
import { formatAdminURL } from "payload/shared";
import React from "react";

export function AdminLogout({ tabIndex = 0 }: { tabIndex?: number }) {
  const { t } = useTranslation();
  const { config } = useConfig();
  const adminRoute = config.routes.admin;
  const logoutRoute = config.admin.routes.logout;

  return (
    <Link
      aria-label={t("authentication:logOut")}
      className="admin-logout"
      href={formatAdminURL({ adminRoute, path: logoutRoute })}
      prefetch={false}
      tabIndex={tabIndex}
      title={t("authentication:logOut")}
    >
      <LogOutIcon />
      <span className="admin-logout__label">{t("authentication:logOut")}</span>
    </Link>
  );
}
