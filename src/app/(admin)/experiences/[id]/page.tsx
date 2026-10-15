import Link from "next/link";
import { notFound } from "next/navigation";
import { experiencesRepo } from "@/lib/repositories/experiences";
import { updateExperienceAction } from "@/actions/experiences";
import { ResourceForm } from "@/components/forms/resource-form";
import { experienceFields } from "@/lib/form-fields";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await experiencesRepo.get(id);
  if (!row) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/experiences" className="text-sm font-bold uppercase underline">Back</Link>
        <h1 className="text-3xl font-black uppercase">Edit experience</h1>
      </div>
      <ResourceForm
        action={updateExperienceAction.bind(null, id)}
        fields={experienceFields}
        defaults={row}
      />
    </div>
  );
}
