export function Loading({ label = "Loading" }: { label?: string }) {
  return (
    <div
      className="p-6 text-sm font-bold uppercase bg-background"
      style={{ border: "var(--border-brutal)" }}
      aria-busy="true"
    >
      {label}...
    </div>
  );
}
