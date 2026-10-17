import Link from "next/link";
import { notFound } from "next/navigation";
import { testimonialsRepo } from "@/lib/repositories/index";
import { updateTestimonialAction } from "@/actions/catalog";
import { ResourceForm } from "@/components/forms/resource-form";
import { testimonialFields } from "@/lib/form-fields";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const row = await testimonialsRepo.get(id);
  if (!row) notFound();
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/testimonials" className="text-sm font-bold uppercase underline">Back</Link>
        <h1 className="text-3xl font-black uppercase">Edit testimonial</h1>
      </div>
      <ResourceForm action={updateTestimonialAction.bind(null, id)} fields={testimonialFields} defaults={row} />
    </div>
  );
}
