import React from "react";

/**
 * The reference's progress bar: a 16px rail with a 2px ink border and a
 * yellow fill. The value is a percentage, so a caller can pass a ratio it
 * already computes.
 */
export function Progress({ value }: { value: number }) {
  const clamped = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div
      aria-valuemax={100}
      aria-valuemin={0}
      aria-valuenow={clamped}
      className="pa-progress"
      role="progressbar"
    >
      <div className="pa-progress__fill" style={{ width: `${clamped}%` }} />
    </div>
  );
}

export default Progress;
