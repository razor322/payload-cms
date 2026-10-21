import React from "react";

/**
 * The kyos bar chart, without the chart library. A two pixel ink axis, a
 * dashed cloud grid, fog ticks, and bars in the kyos accents with a 2px ink
 * stroke and a 6px top radius. The numbers are the CMS counts, so the chart
 * is drawn from a plain array.
 */
export function BarChart({
  bars,
  height = 280,
}: {
  bars: { color: string; label: string; value: number }[];
  height?: number;
}) {
  const top = Math.max(...bars.map((bar) => bar.value), 1);
  const steps = 4;

  return (
    <div className="kyos-chart">
      <div className="kyos-chart__plot" style={{ height }}>
        <div className="kyos-chart__axis">
          {Array.from({ length: steps + 1 }, (_, index) => (
            <span key={index}>{Math.round((top / steps) * (steps - index))}</span>
          ))}
        </div>
        <div className="kyos-chart__area">
          <div className="kyos-chart__grid">
            {Array.from({ length: steps + 1 }, (_, index) => (
              <span
                key={index}
                className={
                  index === steps ? "kyos-chart__grid-line kyos-chart__grid-line--base" : "kyos-chart__grid-line"
                }
              />
            ))}
          </div>
          <div className="kyos-chart__bars">
            {bars.map((bar) => {
              const percent = top === 0 ? 0 : (bar.value / top) * 100;
              return (
                <div className="kyos-chart__bar-wrap" key={bar.label}>
                  <span className="kyos-chart__bar-value">{bar.value}</span>
                  <div
                    className="kyos-chart__bar"
                    style={{
                      backgroundColor: bar.color,
                      height: `${Math.max(percent, 1)}%`,
                    }}
                    title={`${bar.label}: ${bar.value}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="kyos-chart__labels">
        <div className="kyos-chart__labels-spacer" />
        <div className="kyos-chart__labels-row">
          {bars.map((bar) => (
            <div className="kyos-chart__label" key={bar.label}>
              {bar.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * The kyos chart card: a card with a small caps title over a cloud rule and
 * the chart under it.
 */
export function ChartCard({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="kyos-chart-card">
      <h3 className="kyos-chart-card__title">{title}</h3>
      <div className="kyos-chart-card__body">{children}</div>
    </div>
  );
}
