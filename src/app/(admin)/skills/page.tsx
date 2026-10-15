import { skillsRepo } from "@/lib/repositories/index";
import { EntityList } from "@/components/forms/entity-list";
import { deleteSkillAction, reorderSkills } from "@/actions/catalog";

export default async function SkillsPage() {
  const rows = await skillsRepo.list();
  return (
    <EntityList
      title="Skills"
      basePath="/skills"
      rows={rows}
      entityLabel="skill"
      onDelete={deleteSkillAction}
      onReorder={reorderSkills}
      columns={[
        { header: "Site", get: (r) => String(r.site) },
        { header: "Category", get: (r) => String(r.category) },
        { header: "Name", get: (r) => String(r.name) },
      ]}
    />
  );
}
