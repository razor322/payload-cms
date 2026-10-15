import { testimonialsRepo } from "@/lib/repositories/index";
import { EntityList } from "@/components/forms/entity-list";
import { deleteTestimonialAction, reorderTestimonials } from "@/actions/catalog";

export default async function TestimonialsPage() {
  const rows = await testimonialsRepo.list();
  return (
    <EntityList
      title="Testimonials"
      basePath="/testimonials"
      rows={rows}
      entityLabel="testimonial"
      onDelete={deleteTestimonialAction}
      onReorder={reorderTestimonials}
      columns={[
        { header: "Site", get: (r) => String(r.site) },
        { header: "Name", get: (r) => String(r.name) },
        { header: "Role", get: (r) => String(r.role) },
      ]}
    />
  );
}
