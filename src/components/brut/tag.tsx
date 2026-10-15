export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-2 py-0.5 text-xs font-bold uppercase"
      style={{ border: "var(--border-brutal)" }}
    >
      {children}
    </span>
  );
}
