export function Badge({ children, tone = "accent" }: {
  children: React.ReactNode; tone?: "accent" | "muted";
}) {
  return (
    <span
      className="inline-block px-2 py-0.5 text-[11px] font-black uppercase"
      style={{
        border: "var(--border-brutal)",
        background: tone === "accent" ? "var(--accent)" : "transparent",
      }}
    >
      {children}
    </span>
  );
}
