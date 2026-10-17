import Link from "next/link";
import { createSkill } from "@/actions/catalog";
import { ResourceForm } from "@/components/forms/resource-form";
import { skillFields } from "@/lib/form-fields";

export default function NewSkillPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/skills" className="text-sm font-bold uppercase underline">Back</Link>
        <h1 className="text-3xl font-black uppercase">New skill</h1>
      </div>
      <ResourceForm action={createSkill} fields={skillFields} />
    </div>
  );
}
