import Link from "next/link";
import { createAward } from "@/actions/catalog";
import { ResourceForm } from "@/components/forms/resource-form";
import { awardFields } from "@/lib/form-fields";

export default function NewAwardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/awards" className="text-sm font-bold uppercase underline">Back</Link>
        <h1 className="text-3xl font-black uppercase">New award</h1>
      </div>
      <ResourceForm action={createAward} fields={awardFields} />
    </div>
  );
}
