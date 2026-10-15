import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "danger";

export function Button({
  variant = "secondary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const bg =
    variant === "primary" ? "var(--accent)"
    : variant === "danger" ? "#ff2d2d"
    : "var(--background)";
  return (
    <button
      {...props}
      className={cn(
        "px-4 py-2 font-black uppercase text-sm tracking-tight",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50",
        className,
      )}
      style={{
        border: "var(--border-brutal)",
        boxShadow: "var(--shadow-brutal)",
        background: bg,
        color: variant === "danger" ? "#fff" : "var(--foreground)",
      }}
    />
  );
}
