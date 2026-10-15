import { experiencesRepo } from "@/lib/repositories/experiences";
import { Table, Thead, Th, Td, Tr } from "@/components/brut/table";
import { Empty } from "@/components/states/empty";
import { RowActions } from "@/components/forms/row-actions";
import { deleteExperienceAction, reorderExperiences } from "@/actions/experiences";

export default async function ExperiencesPage() {
  const rows = await experiencesRepo.list();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-black uppercase">Experiences</h1>
        <a href="/experiences/new">+ New</a>
      </div>
      {rows.length === 0 ? (
        <Empty message="No experiences yet." />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Actions</Th>
              <Th>Company</Th>
              <Th>Position</Th>
              <Th>Period</Th>
            </Tr>
          </Thead>
          <tbody>
            {rows.map((r, index) => (
              <Tr key={r.id}>
                <Td>
                  <RowActions
                    id={r.id}
                    ids={rows.map((x) => x.id)}
                    index={index}
                    editHref={`/experiences/${r.id}`}
                    onDelete={deleteExperienceAction}
                    onReorder={reorderExperiences}
                    entityLabel="experience"
                  />
                </Td>
                <Td>{r.company}</Td>
                <Td>{r.position}</Td>
                <Td>{r.period}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
