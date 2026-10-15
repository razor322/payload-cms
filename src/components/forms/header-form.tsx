"use client";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/brut/input";
import { Select } from "@/components/brut/select";
import { Button } from "@/components/brut/button";

const siteOptions = ["all", "v3", "my", "minimal"];
const sections = ["capability", "skills", "projects", "experience", "about"];

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" disabled={pending}>
      {pending ? "Saving..." : "Save header"}
    </Button>
  );
}

function F({ label, name, value }: { label: string; name: string; value: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-black uppercase">{label}</span>
      <Input name={name} defaultValue={value} />
    </label>
  );
}

export function HeaderForm({
  action,
  defaults = {},
  lockKeys = false,
}: {
  action: (fd: FormData) => void | Promise<void>;
  defaults?: Record<string, unknown>;
  lockKeys?: boolean;
}) {
  const s = (k: string) => (defaults[k] == null ? "" : String(defaults[k]));
  return (
    <form action={action} className="flex flex-col gap-4 max-w-2xl">
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-xs font-black uppercase">Site</span>
          <Select name="site" defaultValue={s("site") || "all"} disabled={lockKeys}>
            {siteOptions.map((o) => (
              <option key={o} value={o}>{o}</option>
            ))}
          </Select>
          {lockKeys ? <input type="hidden" name="site" value={s("site")} /> : null}
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs font-black uppercase">Section</span>
          {lockKeys ? (
            <>
              <Input value={s("section")} disabled readOnly />
              <input type="hidden" name="section" value={s("section")} />
            </>
          ) : (
            <Select name="section" defaultValue={s("section") || "projects"}>
              {sections.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </Select>
          )}
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <F label="Left kicker" name="left_kicker" value={s("left_kicker")} />
        <F label="Left title" name="left_title" value={s("left_title")} />
        <F label="Middle kicker" name="middle_kicker" value={s("middle_kicker")} />
        <F label="Middle title" name="middle_title" value={s("middle_title")} />
        <F label="Right kicker" name="right_kicker" value={s("right_kicker")} />
        <F label="Right title" name="right_title" value={s("right_title")} />
      </div>
      <div>
        <Submit />
      </div>
    </form>
  );
}
