import Link from "next/link";
import { createTestimonial } from "@/actions/catalog";
import { ResourceForm } from "@/components/forms/resource-form";
import { testimonialFields } from "@/lib/form-fields";

export default function NewTestimonialPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/testimonials" className="text-sm font-bold uppercase underline">Back</Link>
        <h1 className="text-3xl font-black uppercase">New testimonial</h1>
      </div>
      <ResourceForm action={createTestimonial} fields={testimonialFields} />
    </div>
  );
}
