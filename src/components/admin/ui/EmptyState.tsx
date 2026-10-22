import React from "react";

/**
 * The reference's empty state: a dashed cloud card, an icon chip and a line
 * that says why it is empty. A title alone tells the user nothing, so the
 * description names the cause or the next step.
 */
export function EmptyState({
  description,
  title,
}: {
  description?: string;
  title: string;
}) {
  return (
    <div className="pa-empty">
      <div aria-hidden="true" className="pa-empty__chip">
        <svg
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
      </div>
      <p className="pa-empty__title">{title}</p>
      {description ? <p className="pa-empty__text">{description}</p> : null}
    </div>
  );
}

export default EmptyState;
