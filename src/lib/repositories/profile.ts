import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { profileInputSchema, type ProfileInput } from "@/lib/schema";

export async function getProfile() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("profile").select("*").order("updated_at", { ascending: true }).limit(1).maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveProfile(input: ProfileInput) {
  const supabase = createAdminClient();
  const row = profileInputSchema.parse(input);
  const existing = await getProfile();
  if (existing) {
    const { error } = await supabase
      .from("profile").update({ ...row, updated_at: new Date().toISOString() }).eq("id", existing.id);
    if (error) throw error;
    return;
  }
  const { error } = await supabase.from("profile").insert(row);
  if (error) throw error;
}
