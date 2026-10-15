export function Card({ children, className = "" }: {
  children: React.ReactNode; className?: string;
}) {
  return (
    <div
      className={`p-6 bg-background ${className}`}
      style={{ border: "var(--border-brutal)", boxShadow: "var(--shadow-brutal)" }}
    >
      {children}
    </div>
  );
}
