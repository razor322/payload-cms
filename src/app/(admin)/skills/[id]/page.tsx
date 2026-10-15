import Link from "next/link";
import { notFound } from "next/navigation";
import { skillsRepo } from "@/lib/repositories/index";
import { updateSkillAction } from "@/actions/catalog";
import { ResourceForm } from "@/components/forms/resource-form";
import { skillFields } from "@/lib/form-fields";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await skillsRepo.get(id);
  if (!row) notFound();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/skills" className="text-sm font-bold uppercase underline">Back</Link>
        <h1 className="text-3xl font-black uppercase">Edit skill</h1>
      </div>
      <ResourceForm action={updateSkillAction.bind(null, id)} fields={skillFields} defaults={row} />
    </div>
  );
}
