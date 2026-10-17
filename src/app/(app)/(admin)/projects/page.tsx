import Link from "next/link";
import { listProjects } from "@/lib/repositories/projects";
import { Table, Thead, Th, Td, Tr } from "@/components/brut/table";
import { Badge } from "@/components/brut/badge";
import { Button } from "@/components/brut/button";
import { Empty } from "@/components/states/empty";
import { ReorderButtons } from "@/components/forms/reorder-buttons";
import { DeleteProjectButton } from "@/components/forms/delete-project-button";

export default async function ProjectsPage() {
  const projects = await listProjects();
  const ids = projects.map((p) => p.id);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-black uppercase">Projects</h1>
        <Link href="/projects/new">
          <Button variant="primary">New project</Button>
        </Link>
      </div>

      {projects.length === 0 ? (
        <Empty
          message="No projects yet."
          action={
            <Link href="/projects/new">
              <Button variant="primary">Create the first</Button>
            </Link>
          }
        />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Order</Th>
              <Th>Title</Th>
              <Th>Slug</Th>
              <Th>Year</Th>
              <Th>Featured</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <tbody>
            {projects.map((p, index) => (
              <Tr key={p.id}>
                <Td>
                  <ReorderButtons ids={ids} index={index} />
                </Td>
                <Td>{p.title}</Td>
                <Td>{p.slug}</Td>
                <Td>{p.year}</Td>
                <Td>{p.featured ? <Badge>Featured</Badge> : null}</Td>
                <Td>
                  <div className="flex gap-2">
                    <Link href={`/projects/${p.id}`}>
                      <Button type="button">Edit</Button>
                    </Link>
                    <DeleteProjectButton id={p.id} />
                  </div>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
