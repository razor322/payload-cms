import { awardsRepo } from "@/lib/repositories/index";
import { EntityList } from "@/components/forms/entity-list";
import { deleteAwardAction, reorderAwards } from "@/actions/catalog";

export default async function AwardsPage() {
  const rows = await awardsRepo.list();
  return (
    <EntityList
      title="Awards"
      basePath="/awards"
      rows={rows}
      entityLabel="award"
      onDelete={deleteAwardAction}
      onReorder={reorderAwards}
      columns={[
        { header: "Site", get: (r) => String(r.site) },
        { header: "Title", get: (r) => String(r.title) },
        { header: "Org", get: (r) => String(r.org) },
        { header: "Year", get: (r) => String(r.year) },
      ]}
    />
  );
}
