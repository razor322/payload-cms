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
    <div className="kyos-stat">
      <div className="kyos-stat__top">
        <div className="kyos-stat__title-wrap">
          <span
            className="kyos-stat__bar"
            style={{ backgroundColor: accentColor }}
          />
          <h3 className="kyos-stat__title">{title}</h3>
        </div>
        {icon ? <div className="kyos-stat__icon-chip">{icon}</div> : null}
      </div>
      <div className="kyos-stat__bottom">
        <div className="kyos-stat__value">{value}</div>
        {subtext ? <p className="kyos-stat__subtext">{subtext}</p> : null}
      </div>
    </div>
  );
}
