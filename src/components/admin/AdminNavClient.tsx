"use client";

import { Link, NavGroup, NavToggler, useNav } from "@payloadcms/ui";
import { EntityType } from "@payloadcms/ui/shared";
import { useConfig } from "@payloadcms/ui";
import { useTranslation } from "@payloadcms/ui";
import { getTranslation } from "@payloadcms/translations";
import { formatAdminURL } from "payload/shared";
import { usePathname } from "next/navigation";
import React from "react";

import { AdminLogo } from "./AdminLogo";
import { AdminLogout } from "./AdminLogout";

type NavEntity = {
  label: unknown;
  slug: string;
  type: EntityType;
};

type NavGroupData = {
  label: string;
  entities: NavEntity[];
};

type Props = {
  groups: NavGroupData[];
  navPreferences: { groups?: Record<string, { open?: boolean }>; open?: boolean } | null;
};

const baseClass = "nav";

const labelFor = (label: unknown, i18n: unknown): string => {
  if (typeof label === "string") return label;
  if (typeof label === "object" && label !== null) {
    return String(
      getTranslation(
        label as Parameters<typeof getTranslation>[0],
        i18n as Parameters<typeof getTranslation>[1],
      ),
    );
  }
  return String(label ?? "");
};

const markFor = (label: string): string => {
  const word = label.replace(/[^a-zA-Z0-9 ]/g, "").trim();
  const parts = word.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};
export function AdminNavClient({ groups, navPreferences }: Props) {
  const { navOpen, hydrated, shouldAnimate, navRef, setNavOpen } = useNav();
  const { config } = useConfig();
  const { i18n } = useTranslation();
  const pathname = usePathname();

  // On the narrow layout the sidebar is a rail that opens over the content,
  // so it closes again on every navigation and on Escape.
  const firstRender = React.useRef(true);

  React.useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (window.matchMedia("(max-width: 1440px)").matches) setNavOpen(false);
  }, [pathname, setNavOpen]);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (window.matchMedia("(max-width: 1440px)").matches) setNavOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setNavOpen]);

  const adminRoute = config.routes.admin;

  const isCollapsed = hydrated && !navOpen;

  // Payload sizes the layout grid from these classes, so the sidebar keeps
  // its column and its mobile drawer behaviour.
  const className = [
    baseClass,
    "admin-nav",
    navOpen ? `${baseClass}--nav-open` : "",
    shouldAnimate ? `${baseClass}--nav-animate` : "",
    hydrated ? `${baseClass}--nav-hydrated` : "",
    isCollapsed ? "admin-nav--collapsed" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <aside className={className}>
      <div className={`${baseClass}__scroll`} ref={navRef as React.Ref<HTMLDivElement>}>
        <div className="admin-nav__top">
          <AdminLogo />
          <NavToggler className="admin-nav__toggler" />
        </div>

        <nav className={`${baseClass}__wrap admin-nav__links`}>
          {groups.map((group) => (
            <NavGroup
              isOpen={navPreferences?.groups?.[group.label]?.open}
              key={group.label}
              label={group.label}
            >
              {group.entities.map((entity, i) => {
                const text = labelFor(entity.label, i18n);
                let href = "";
                let id = "";
                if (entity.type === EntityType.collection) {
                  href = formatAdminURL({
                    adminRoute,
                    path: `/collections/${entity.slug}`,
                  });
                  id = `nav-${entity.slug}`;
                }
                if (entity.type === EntityType.global) {
                  href = formatAdminURL({
                    adminRoute,
                    path: `/globals/${entity.slug}`,
                  });
                  id = `nav-global-${entity.slug}`;
                }

                const isActive =
                  pathname.startsWith(href) &&
                  ["/", undefined].includes(pathname[href.length]);

                const content = (
                  <React.Fragment>
                    <span className="admin-nav__mark" aria-hidden="true">
                      {markFor(text)}
                    </span>
                    <span className="admin-nav__link-label">{text}</span>
                  </React.Fragment>
                );

                if (pathname === href) {
                  return (
                    <div
                      className={`${baseClass}__link admin-nav__link admin-nav__link--active`}
                      id={id}
                      key={i}
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <Link
                    aria-label={text}
                    className={`${baseClass}__link admin-nav__link${
                      isActive ? " admin-nav__link--active" : ""
                    }`}
                    data-tooltip={text}
                    href={href}
                    id={id}
                    key={i}
                    prefetch={false}
                    title={text}
                  >
                    {content}
                  </Link>
                );
              })}
            </NavGroup>
          ))}
        </nav>

        <div className={`${baseClass}__controls admin-nav__controls`}>
          <AdminLogout />
        </div>
      </div>
    </aside>
  );
}
