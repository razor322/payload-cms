"use server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth";
import { headerInputSchema, profileInputSchema } from "@/lib/schema";
import { headersRepo } from "@/lib/repositories/index";
import { saveProfile } from "@/lib/repositories/profile";
import { fdStr } from "@/lib/form-parse";

export async function saveHeader(fd: FormData) {
  await requireAdmin();
  const row = headerInputSchema.parse({
    site: fdStr(fd, "site") || "all",
    section: fdStr(fd, "section"),
    left_kicker: fdStr(fd, "left_kicker"),
    left_title: fdStr(fd, "left_title"),
    middle_kicker: fdStr(fd, "middle_kicker"),
    middle_title: fdStr(fd, "middle_title"),
    right_kicker: fdStr(fd, "right_kicker"),
    right_title: fdStr(fd, "right_title"),
  });
  await headersRepo.upsert(row, "site,section");
  revalidatePath("/headers");
  revalidatePath("/");
}

export async function deleteHeaderAction(id: string) {
  await requireAdmin();
  await headersRepo.remove(id);
  revalidatePath("/headers");
}

export async function saveProfileAction(fd: FormData) {
  await requireAdmin();
  const socials: Record<string, string> = {};
  for (const key of ["linkedin", "github", "instagram", "whatsapp", "twitter"]) {
    const v = fdStr(fd, `socials_${key}`);
    if (v) socials[key] = v;
  }
  const row = profileInputSchema.parse({
    name: fdStr(fd, "name"),
    role: fdStr(fd, "role"),
    location: fdStr(fd, "location"),
    email: fdStr(fd, "email"),
    website: fdStr(fd, "website"),
    avatar_url: fdStr(fd, "avatar_url"),
    intro: fdStr(fd, "intro"),
    socials,
  });
  await saveProfile(row);
  revalidatePath("/profile");
  revalidatePath("/");
}
