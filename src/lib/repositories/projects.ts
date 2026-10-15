import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { projectInputSchema, type ProjectInput } from "@/lib/schema";

export async function listProjects() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("projects").select("*").order("sort", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function getProject(id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("projects").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data;
}

export async function insertProject(input: ProjectInput) {
  const supabase = createAdminClient();
  const row = projectInputSchema.parse(input);
  const { data, error } = await supabase.from("projects").insert(row).select().single();
  if (error) throw error;
  return data;
}

export async function updateProject(id: string, input: ProjectInput) {
  const supabase = createAdminClient();
  const row = projectInputSchema.parse(input);
  const { data, error } = await supabase
    .from("projects").update(row).eq("id", id).select().single();
  if (error) throw error;
  return data;
}

export async function deleteProject(id: string) {
  const supabase = createAdminClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw error;
}

export async function setProjectOrder(ids: string[]) {
  const supabase = createAdminClient();
  await Promise.all(
    ids.map((id, index) =>
      supabase.from("projects").update({ sort: index }).eq("id", id),
    ),
  );
}
