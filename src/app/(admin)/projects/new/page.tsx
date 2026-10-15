import Link from "next/link";
import { createProject } from "@/actions/projects";
import { ProjectForm } from "@/components/forms/project-form";

export default function NewProjectPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/projects" className="text-sm font-bold uppercase underline">
          Back
        </Link>
        <h1 className="text-3xl font-black uppercase">New project</h1>
      </div>
      <ProjectForm action={createProject} />
    </div>
  );
}
