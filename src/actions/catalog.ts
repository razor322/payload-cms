"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { skillInputSchema, capabilityInputSchema, testimonialInputSchema, awardInputSchema } from "@/lib/schema";
import { skillsRepo, capabilitiesRepo, testimonialsRepo, awardsRepo } from "@/lib/repositories/index";
import { fdStr, fdArr, fdNum } from "@/lib/form-parse";

function done(path: string) {
  revalidatePath(path);
  revalidatePath("/");
}

/* ── Skills ── */
function skillParse(fd: FormData) {
  return skillInputSchema.parse({
    site: fdStr(fd, "site") || "all",
    category: fdStr(fd, "category"),
    name: fdStr(fd, "name"),
    icon_key: fdStr(fd, "icon_key"),
    sort: fdNum(fd, "sort"),
  });
}
export async function createSkill(fd: FormData) {
  await requireAdmin();
  await skillsRepo.insert(skillParse(fd));
  done("/skills");
}
export async function updateSkillAction(id: string, fd: FormData) {
  await requireAdmin();
  await skillsRepo.update(id, skillParse(fd));
  done("/skills");
}
export async function deleteSkillAction(id: string) {
  await requireAdmin();
  await skillsRepo.remove(id);
  done("/skills");
}
export async function reorderSkills(ids: string[]) {
  await requireAdmin();
  await skillsRepo.setOrder(ids);
  done("/skills");
}

/* ── Capabilities ── */
function capabilityParse(fd: FormData) {
  return capabilityInputSchema.parse({
    site: fdStr(fd, "site") || "all",
    title: fdStr(fd, "title"),
    description: fdStr(fd, "description"),
    tags: fdArr(fd, "tags"),
    sort: fdNum(fd, "sort"),
  });
}
export async function createCapability(fd: FormData) {
  await requireAdmin();
  await capabilitiesRepo.insert(capabilityParse(fd));
  done("/capabilities");
}
export async function updateCapabilityAction(id: string, fd: FormData) {
  await requireAdmin();
  await capabilitiesRepo.update(id, capabilityParse(fd));
  done("/capabilities");
}
export async function deleteCapabilityAction(id: string) {
  await requireAdmin();
  await capabilitiesRepo.remove(id);
  done("/capabilities");
}
export async function reorderCapabilities(ids: string[]) {
  await requireAdmin();
  await capabilitiesRepo.setOrder(ids);
  done("/capabilities");
}

/* ── Testimonials ── */
function testimonialParse(fd: FormData) {
  return testimonialInputSchema.parse({
    site: fdStr(fd, "site") || "all",
    name: fdStr(fd, "name"),
    role: fdStr(fd, "role"),
    quote: fdStr(fd, "quote"),
    avatar_url: fdStr(fd, "avatar_url"),
    sort: fdNum(fd, "sort"),
  });
}
export async function createTestimonial(fd: FormData) {
  await requireAdmin();
  await testimonialsRepo.insert(testimonialParse(fd));
  done("/testimonials");
}
export async function updateTestimonialAction(id: string, fd: FormData) {
  await requireAdmin();
  await testimonialsRepo.update(id, testimonialParse(fd));
  done("/testimonials");
}
export async function deleteTestimonialAction(id: string) {
  await requireAdmin();
  await testimonialsRepo.remove(id);
  done("/testimonials");
}
export async function reorderTestimonials(ids: string[]) {
  await requireAdmin();
  await testimonialsRepo.setOrder(ids);
  done("/testimonials");
}

/* ── Awards ── */
function awardParse(fd: FormData) {
  return awardInputSchema.parse({
    site: fdStr(fd, "site") || "all",
    kind: fdStr(fd, "kind"),
    title: fdStr(fd, "title"),
    org: fdStr(fd, "org"),
    year: fdStr(fd, "year"),
    description: fdStr(fd, "description"),
    sort: fdNum(fd, "sort"),
  });
}
export async function createAward(fd: FormData) {
  await requireAdmin();
  await awardsRepo.insert(awardParse(fd));
  done("/awards");
}
export async function updateAwardAction(id: string, fd: FormData) {
  await requireAdmin();
  await awardsRepo.update(id, awardParse(fd));
  done("/awards");
}
export async function deleteAwardAction(id: string) {
  await requireAdmin();
  await awardsRepo.remove(id);
  done("/awards");
}
export async function reorderAwards(ids: string[]) {
  await requireAdmin();
  await awardsRepo.setOrder(ids);
  done("/awards");
}
