export function Empty({
  message = "Nothing here yet.",
  action,
}: { message?: string; action?: React.ReactNode }) {
  return (
    <div
      className="p-10 flex flex-col items-center gap-4 text-center bg-background"
      style={{ border: "var(--border-brutal)", boxShadow: "var(--shadow-brutal)" }}
    >
      <p className="font-black uppercase">{message}</p>
      {action}
    </div>
  );
}
