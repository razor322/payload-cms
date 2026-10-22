import React from "react";

/**
 * The reference's status badge: an 8px radius, a 2px ink border and a small
 * shadow. The variant names the meaning, not the colour, so a caller says
 * "destructive" rather than "red".
 */
export const BADGE_VARIANTS = [
  "default",
  "secondary",
  "destructive",
  "info",
  "outline",
  "purple",
] as const;

export type BadgeVariant = (typeof BADGE_VARIANTS)[number];

export function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
}) {
  return <span className={`pa-badge pa-badge--${variant}`}>{children}</span>;
}

export default Badge;
