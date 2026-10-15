import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "min-h-28 w-full px-3 py-2 bg-background text-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      style={{ border: "var(--border-brutal)" }}
    />
  );
}
