import { cn } from "@/lib/utils";

export function Select({
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full px-3 py-2 bg-background text-sm font-bold uppercase",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      style={{ border: "var(--border-brutal)" }}
    >
      {children}
    </select>
  );
}
