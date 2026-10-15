import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/lib/repositories/projects";
import { updateProjectAction } from "@/actions/projects";
import { ProjectForm } from "@/components/forms/project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/projects" className="text-sm font-bold uppercase underline">
          Back
        </Link>
        <h1 className="text-3xl font-black uppercase">Edit project</h1>
      </div>
      <ProjectForm
        action={updateProjectAction.bind(null, id)}
        defaults={project}
      />
    </div>
  );
}
