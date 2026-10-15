"use client";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/brut/input";
import { Textarea } from "@/components/brut/textarea";
import { Checkbox } from "@/components/brut/checkbox";
import { Button } from "@/components/brut/button";
import { ArrayField } from "@/components/forms/array-field";
import { ImageUpload } from "@/components/forms/image-upload";

type Row = {
  slug: string; title: string; role: string; subtitle: string | null;
  description: string; impact: string | null; highlights: string[] | null;
  tech: string[] | null; github: string; live: string; image_url: string;
  featured: boolean; year: string; category: string | null;
  status: string | null; sort: number;
};

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-black uppercase">{label}</span>
      {children}
    </label>
  );
}

export function ProjectForm({
  action,
  defaults,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaults?: Row;
}) {
  return (
    <form action={action} className="flex flex-col gap-4 max-w-3xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Slug">
          <Input name="slug" defaultValue={defaults?.slug} required />
        </Field>
        <Field label="Title">
          <Input name="title" defaultValue={defaults?.title} required />
        </Field>
        <Field label="Role">
          <Input name="role" defaultValue={defaults?.role} />
        </Field>
        <Field label="Subtitle">
          <Input name="subtitle" defaultValue={defaults?.subtitle ?? ""} />
        </Field>
      </div>

      <Field label="Description">
        <Textarea name="description" defaultValue={defaults?.description} />
      </Field>
      <Field label="Impact">
        <Textarea name="impact" defaultValue={defaults?.impact ?? ""} />
      </Field>

      <Field label="Highlights">
        <ArrayField name="highlights" defaultValues={defaults?.highlights ?? []} addLabel="Add highlight" />
      </Field>
      <Field label="Tech">
        <ArrayField name="tech" defaultValues={defaults?.tech ?? []} addLabel="Add tech" />
      </Field>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="GitHub">
          <Input name="github" defaultValue={defaults?.github} />
        </Field>
        <Field label="Live">
          <Input name="live" defaultValue={defaults?.live} />
        </Field>
        <Field label="Year">
          <Input name="year" defaultValue={defaults?.year} />
        </Field>
        <Field label="Category">
          <Input name="category" defaultValue={defaults?.category ?? ""} />
        </Field>
        <Field label="Status">
          <Input name="status" defaultValue={defaults?.status ?? ""} />
        </Field>
        <Field label="Sort">
          <Input name="sort" type="number" defaultValue={String(defaults?.sort ?? 0)} />
        </Field>
      </div>

      <Field label="Image">
        <ImageUpload name="image_url" defaultUrl={defaults?.image_url ?? ""} />
      </Field>

      <Checkbox name="featured" label="Featured" defaultChecked={defaults?.featured ?? false} />

      <div>
        <Submit />
      </div>
    </form>
  );
}
