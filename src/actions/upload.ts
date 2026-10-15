"use server";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";

export async function uploadProjectImage(formData: FormData): Promise<string> {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    throw new Error("No file provided");
  }
  if (!file.type.startsWith("image/")) {
    throw new Error("Not an image");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image too large (max 5MB)");
  }
  const supabase = createAdminClient();
  const ext = file.name.split(".").pop() ?? "webp";
  const path = `projects/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage
    .from("portfolio")
    .upload(path, file, { contentType: file.type, upsert: false });
  if (error) throw error;
  const { data } = supabase.storage.from("portfolio").getPublicUrl(path);
  return data.publicUrl;
}
