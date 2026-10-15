import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

/** Generic CRUD over a table, all writes via the service-role client. */
export function makeRepo(table: string, orderColumn = "sort") {
  return {
    async list() {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order(orderColumn, { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
    async get(id: string) {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    async insert(row: Record<string, unknown>) {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from(table)
        .insert(row)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    async update(id: string, row: Record<string, unknown>) {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from(table)
        .update(row)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    async remove(id: string) {
      const supabase = createAdminClient();
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
    },
    async setOrder(ids: string[]) {
      const supabase = createAdminClient();
      await Promise.all(
        ids.map((id, index) =>
          supabase.from(table).update({ [orderColumn]: index }).eq("id", id),
        ),
      );
    },
    async upsert(row: Record<string, unknown>, onConflict: string) {
      const supabase = createAdminClient();
      const { data, error } = await supabase
        .from(table)
        .upsert(row, { onConflict })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
  };
}
