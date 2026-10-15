"use client";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/brut/input";
import { Textarea } from "@/components/brut/textarea";
import { Select } from "@/components/brut/select";
import { Checkbox } from "@/components/brut/checkbox";
import { Button } from "@/components/brut/button";
import { ArrayField } from "@/components/forms/array-field";
import { ImageUpload } from "@/components/forms/image-upload";

export type FieldSpec =
  | { kind: "text"; name: string; label: string; required?: boolean; type?: string }
  | { kind: "textarea"; name: string; label: string }
  | { kind: "number"; name: string; label: string }
  | { kind: "checkbox"; name: string; label: string }
  | { kind: "select"; name: string; label: string; options: { value: string; label: string }[] }
  | { kind: "array"; name: string; label: string; addLabel?: string }
  | { kind: "image"; name: string; label: string };

export type FormDefaults = Record<string, unknown>;

function Submit({ label = "Save" }: { label?: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending}>
      {pending ? "Saving..." : label}
    </Button>
  );
}

function val(defaults: FormDefaults, name: string): string {
  const v = defaults[name];
  return v === null || v === undefined ? "" : String(v);
}

function arr(defaults: FormDefaults, name: string): string[] {
  const v = defaults[name];
  return Array.isArray(v) ? (v as string[]) : [];
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-black uppercase">{label}</span>
      {children}
    </label>
  );
}

export function ResourceForm({
  action,
  fields,
  defaults = {},
  submitLabel,
}: {
  action: (formData: FormData) => void | Promise<void>;
  fields: FieldSpec[];
  defaults?: FormDefaults;
  submitLabel?: string;
}) {
  const isWide = (f: FieldSpec) =>
    f.kind === "textarea" || f.kind === "array" || f.kind === "image";
  const wide = fields.filter(isWide);
  const narrow = fields.filter((f) => !isWide(f));

  return (
    <form action={action} className="flex flex-col gap-4 max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {narrow.map((f) => {
          if (f.kind === "text") {
            return (
              <Field key={f.name} label={f.label}>
                <Input
                  name={f.name}
                  type={f.type ?? "text"}
                  required={f.required}
                  defaultValue={val(defaults, f.name)}
                />
              </Field>
            );
          }
          if (f.kind === "number") {
            return (
              <Field key={f.name} label={f.label}>
                <Input
                  name={f.name}
                  type="number"
                  defaultValue={val(defaults, f.name) || "0"}
                />
              </Field>
            );
          }
          if (f.kind === "select") {
            return (
              <Field key={f.name} label={f.label}>
                <Select name={f.name} defaultValue={val(defaults, f.name)}>
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </Select>
              </Field>
            );
          }
          if (f.kind === "checkbox") {
            return (
              <div key={f.name} className="flex items-end pb-2">
                <Checkbox
                  name={f.name}
                  label={f.label}
                  defaultChecked={Boolean(defaults[f.name])}
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      {wide.map((f) => {
        if (f.kind === "textarea") {
          return (
            <Field key={f.name} label={f.label}>
              <Textarea name={f.name} defaultValue={val(defaults, f.name)} />
            </Field>
          );
        }
        if (f.kind === "array") {
          return (
            <Field key={f.name} label={f.label}>
              <ArrayField
                name={f.name}
                defaultValues={arr(defaults, f.name)}
                addLabel={f.addLabel ?? "Add"}
              />
            </Field>
          );
        }
        if (f.kind === "image") {
          return (
            <Field key={f.name} label={f.label}>
              <ImageUpload name={f.name} defaultUrl={val(defaults, f.name)} />
            </Field>
          );
        }
        return null;
      })}

      <div>
        <Submit label={submitLabel} />
      </div>
    </form>
  );
}
