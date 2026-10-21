import React from "react";

/**
 * The kyos card: a cream ground, a 2px ink border, a 16px radius and the
 * base hard shadow. Lifted from the kyos app's `Card` and `SectionCard`.
 *
 * The admin routes carry no Tailwind, so every kyos component is written
 * with the classes the admin stylesheet defines.
 */
export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`pa-card ${className}`}>{children}</div>;
}

/**
 * The card head, as the kyos `SectionCard` writes it: an icon chip, a title
 * and a subtitle, over a 2px ink rule.
 */
export function CardHeader({
  action,
  icon,
  subtitle,
  title,
}: {
  action?: React.ReactNode;
  icon?: React.ReactNode;
  subtitle?: string;
  title: string;
}) {
  return (
    <div className="pa-card__head">
      <div className="pa-card__head-main">
        {icon ? <div className="pa-card__icon-chip">{icon}</div> : null}
        <div className="pa-card__head-text">
          <h3 className="pa-card__title">{title}</h3>
          {subtitle ? <p className="pa-card__subtitle">{subtitle}</p> : null}
        </div>
      </div>
      {action ? <div className="pa-card__head-actions">{action}</div> : null}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className || "pa-card__content"}>{children}</div>;
}
