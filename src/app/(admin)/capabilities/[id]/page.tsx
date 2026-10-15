import Link from "next/link";
import { notFound } from "next/navigation";
import { capabilitiesRepo } from "@/lib/repositories/index";
import { updateCapabilityAction } from "@/actions/catalog";
import { ResourceForm } from "@/components/forms/resource-form";
import { capabilityFields } from "@/lib/form-fields";

export default async function EditCapabilityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await capabilitiesRepo.get(id);
  if (!row) notFound();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/capabilities" className="text-sm font-bold uppercase underline">Back</Link>
        <h1 className="text-3xl font-black uppercase">Edit capability</h1>
      </div>
      <ResourceForm action={updateCapabilityAction.bind(null, id)} fields={capabilityFields} defaults={row} />
    </div>
  );
}
