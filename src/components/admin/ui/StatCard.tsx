import React from "react";

/**
 * The kyos stat card: an accent bar, a small caps title, an icon chip, the
 * value and an optional subtext. Lifted from the kyos app's `StatCard`.
 */
export function StatCard({
  accentColor,
  icon,
  subtext,
  title,
  value,
}: {
  accentColor: string;
  icon?: React.ReactNode;
  subtext?: string;
  title: string;
  value: React.ReactNode;
}) {
  return (
    <div className="pa-stat">
      <div className="pa-stat__top">
        <div className="pa-stat__title-wrap">
          <span
            className="pa-stat__bar"
            style={{ backgroundColor: accentColor }}
          />
          <h3 className="pa-stat__title">{title}</h3>
        </div>
        {icon ? <div className="pa-stat__icon-chip">{icon}</div> : null}
      </div>
      <div className="pa-stat__bottom">
        <div className="pa-stat__value">{value}</div>
        {subtext ? <p className="pa-stat__subtext">{subtext}</p> : null}
      </div>
    </div>
  );
}
