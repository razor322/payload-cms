"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { experienceInputSchema } from "@/lib/schema";
import { experiencesRepo as repo } from "@/lib/repositories/experiences";
import { fdStr, fdOpt, fdArr, fdNum } from "@/lib/form-parse";

function parse(fd: FormData) {
  return experienceInputSchema.parse({
    ext_id: fdOpt(fd, "ext_id"),
    company: fdStr(fd, "company"),
    position: fdStr(fd, "position"),
    period: fdStr(fd, "period"),
    location: fdStr(fd, "location"),
    type: fdStr(fd, "type"),
    duration: fdStr(fd, "duration"),
    mode: fdStr(fd, "mode"),
    role: fdStr(fd, "role"),
    summary: fdStr(fd, "summary"),
    outcomes: fdArr(fd, "outcomes"),
    stack: fdArr(fd, "stack"),
    sort: fdNum(fd, "sort"),
  });
}

function refresh() {
  revalidatePath("/experiences");
  revalidatePath("/");
}

export async function createExperience(fd: FormData) {
  await requireAdmin();
  await repo.insert(parse(fd));
  refresh();
}
export async function updateExperienceAction(id: string, fd: FormData) {
  await requireAdmin();
  await repo.update(id, parse(fd));
  refresh();
}
export async function deleteExperienceAction(id: string) {
  await requireAdmin();
  await repo.remove(id);
  refresh();
}
export async function reorderExperiences(ids: string[]) {
  await requireAdmin();
  await repo.setOrder(ids);
  refresh();
}
