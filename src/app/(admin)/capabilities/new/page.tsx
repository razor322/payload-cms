import Link from "next/link";
import { createCapability } from "@/actions/catalog";
import { ResourceForm } from "@/components/forms/resource-form";
import { capabilityFields } from "@/lib/form-fields";

export default function NewCapabilityPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/capabilities" className="text-sm font-bold uppercase underline">Back</Link>
        <h1 className="text-3xl font-black uppercase">New capability</h1>
      </div>
      <ResourceForm action={createCapability} fields={capabilityFields} />
    </div>
  );
}
