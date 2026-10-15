"use client";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/brut/input";
import { Textarea } from "@/components/brut/textarea";
import { Button } from "@/components/brut/button";
import { ImageUpload } from "@/components/forms/image-upload";

const socialKeys = ["linkedin", "github", "instagram", "whatsapp", "twitter"] as const;

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending}>
      {pending ? "Saving..." : "Save profile"}
    </Button>
  );
}

function F({ label, name, value, type = "text" }: {
  label: string; name: string; value: string; type?: string;
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-black uppercase">{label}</span>
      <Input name={name} type={type} defaultValue={value} />
    </label>
  );
}

export function ProfileForm({
  action,
  defaults = {},
}: {
  action: (fd: FormData) => void | Promise<void>;
  defaults?: Record<string, unknown>;
}) {
  const s = (k: string) => (defaults[k] == null ? "" : String(defaults[k]));
  const socials = (defaults.socials ?? {}) as Record<string, string>;
  return (
    <form action={action} className="flex flex-col gap-4 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <F label="Name" name="name" value={s("name")} />
        <F label="Role" name="role" value={s("role")} />
        <F label="Location" name="location" value={s("location")} />
        <F label="Email" name="email" value={s("email")} type="email" />
        <F label="Website" name="website" value={s("website")} />
      </div>
      <label className="flex flex-col gap-1">
        <span className="text-xs font-black uppercase">Avatar</span>
        <ImageUpload name="avatar_url" defaultUrl={s("avatar_url")} />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs font-black uppercase">Intro</span>
        <Textarea name="intro" defaultValue={s("intro")} />
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {socialKeys.map((k) => (
          <F key={k} label={k} name={`socials_${k}`} value={socials[k] ?? ""} />
        ))}
      </div>
      <div>
        <Submit />
      </div>
    </form>
  );
}
