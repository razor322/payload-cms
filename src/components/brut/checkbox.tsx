export function Checkbox({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="flex items-center gap-2 text-sm font-bold uppercase">
      <input
        type="checkbox"
        {...props}
        className="h-5 w-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{ accentColor: "var(--accent)", border: "var(--border-brutal)" }}
      />
      {label}
    </label>
  );
}
