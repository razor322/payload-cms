import Link from "next/link";
import { notFound } from "next/navigation";
import { awardsRepo } from "@/lib/repositories/index";
import { updateAwardAction } from "@/actions/catalog";
import { ResourceForm } from "@/components/forms/resource-form";
import { awardFields } from "@/lib/form-fields";

export default async function EditAwardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await awardsRepo.get(id);
  if (!row) notFound();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/awards" className="text-sm font-bold uppercase underline">Back</Link>
        <h1 className="text-3xl font-black uppercase">Edit award</h1>
      </div>
      <ResourceForm action={updateAwardAction.bind(null, id)} fields={awardFields} defaults={row} />
    </div>
  );
}
