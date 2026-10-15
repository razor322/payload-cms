import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full px-3 py-2 bg-background text-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      style={{ border: "var(--border-brutal)" }}
    />
  );
}
