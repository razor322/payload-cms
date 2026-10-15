export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  );
}

export function Thead({ children }: { children: React.ReactNode }) {
  return <thead className="text-left">{children}</thead>;
}

export function Th({ children }: { children: React.ReactNode }) {
  return (
    <th
      className="px-3 py-2 font-black uppercase text-xs"
      style={{ borderBottom: "var(--border-brutal)" }}
    >
      {children}
    </th>
  );
}

export function Td({ children }: { children: React.ReactNode }) {
  return (
    <td
      className="px-3 py-2 align-middle"
      style={{ borderBottom: "1px solid var(--foreground)" }}
    >
      {children}
    </td>
  );
}

export function Tr({ children }: { children: React.ReactNode }) {
  return <tr className="hover:bg-secondary/60">{children}</tr>;
}
