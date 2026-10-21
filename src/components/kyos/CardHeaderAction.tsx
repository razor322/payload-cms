import React from "react";

/**
 * The kyos list head: the collection name, the count under it, and the
 * create action on the right, over a 2px ink rule. Lifted from the kyos
 * app's `CardHeaderAction`.
 */
export function CardHeaderAction({
  action,
  subtitle,
  title,
}: {
  action?: React.ReactNode;
  subtitle?: string;
  title: string;
}) {
  return (
    <div className="kyos-list-head">
      <div className="kyos-list-head__row">
        <div>
          <h3 className="kyos-list-head__title">{title}</h3>
          {subtitle ? <p className="kyos-list-head__subtitle">{subtitle}</p> : null}
        </div>
        {action ? <div className="kyos-list-head__actions">{action}</div> : null}
      </div>
    </div>
  );
}

export function EmptyState({
  description,
  icon,
  title = "Nothing here yet",
}: {
  description?: string;
  icon?: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="kyos-empty">
      <div className="kyos-empty__chip">
        {icon ?? (
          <svg
            aria-hidden="true"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M22 12h-6l-2 3h-4l-2-3H2" />
            <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
          </svg>
        )}
      </div>
      <p className="kyos-empty__title">{title}</p>
      {description ? <p className="kyos-empty__text">{description}</p> : null}
    </div>
  );
}
