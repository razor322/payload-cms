import React from "react";

/**
 * A label on the left, a value on the right, the way the reference's detail
 * panels read. Used on the account page and the profile global.
 */
export function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="pa-info-row">
      <span className="pa-info-row__label">{label}</span>
      <span className="pa-info-row__value">{value}</span>
    </div>
  );
}

export default InfoRow;
