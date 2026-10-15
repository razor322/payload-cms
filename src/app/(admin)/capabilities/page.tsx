import { capabilitiesRepo } from "@/lib/repositories/index";
import { EntityList } from "@/components/forms/entity-list";
import { deleteCapabilityAction, reorderCapabilities } from "@/actions/catalog";

export default async function CapabilitiesPage() {
  const rows = await capabilitiesRepo.list();
  return (
    <EntityList
      title="Capabilities"
      basePath="/capabilities"
      rows={rows}
      entityLabel="capability"
      onDelete={deleteCapabilityAction}
      onReorder={reorderCapabilities}
      columns={[
        { header: "Site", get: (r) => String(r.site) },
        { header: "Title", get: (r) => String(r.title) },
        {
          header: "Tags",
          get: (r) => (Array.isArray(r.tags) ? (r.tags as string[]).join(", ") : ""),
        },
      ]}
    />
  );
}
