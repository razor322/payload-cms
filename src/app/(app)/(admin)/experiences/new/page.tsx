import Link from "next/link";
import { createExperience } from "@/actions/experiences";
import { ResourceForm } from "@/components/forms/resource-form";
import { experienceFields } from "@/lib/form-fields";

export default function NewExperiencePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/experiences" className="text-sm font-bold uppercase underline">Back</Link>
        <h1 className="text-3xl font-black uppercase">New experience</h1>
      </div>
      <ResourceForm action={createExperience} fields={experienceFields} />
    </div>
  );
}
