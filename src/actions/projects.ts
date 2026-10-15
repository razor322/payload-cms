"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { projectInputSchema } from "@/lib/schema";
import * as repo from "@/lib/repositories/projects";

function parse(formData: FormData) {
  return projectInputSchema.parse({
    slug: formData.get("slug"),
    title: formData.get("title"),
    role: formData.get("role") ?? "",
    subtitle: formData.get("subtitle") || undefined,
    description: formData.get("description") ?? "",
    impact: formData.get("impact") || undefined,
    highlights: formData.getAll("highlights").map(String).filter(Boolean),
    tech: formData.getAll("tech").map(String).filter(Boolean),
    github: formData.get("github") ?? "",
    live: formData.get("live") ?? "",
    image_url: formData.get("image_url") ?? "",
    featured: formData.get("featured") === "on",
    year: formData.get("year") ?? "",
    category: formData.get("category") || undefined,
    status: formData.get("status") || undefined,
    sort: Number(formData.get("sort") ?? 0),
  });
}

export async function createProject(formData: FormData) {
  await requireAdmin();
  await repo.insertProject(parse(formData));
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function updateProjectAction(id: string, formData: FormData) {
  await requireAdmin();
  await repo.updateProject(id, parse(formData));
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function deleteProjectAction(id: string) {
  await requireAdmin();
  await repo.deleteProject(id);
  revalidatePath("/projects");
  revalidatePath("/");
}

export async function reorderProjects(ids: string[]) {
  await requireAdmin();
  await repo.setProjectOrder(ids);
  revalidatePath("/projects");
}
