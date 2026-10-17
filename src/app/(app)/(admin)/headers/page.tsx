import { headersRepo } from "@/lib/repositories/index";
import { HeaderForm } from "@/components/forms/header-form";
import { saveHeader } from "@/actions/site";
import { DeleteHeaderButton } from "@/components/forms/delete-header-button";

export default async function HeadersPage() {
  const rows = await headersRepo.list();
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl font-black uppercase">Section headers</h1>
      {rows.map((r) => (
        <div
          key={String(r.id)}
          className="p-6 flex flex-col gap-4"
          style={{ border: "var(--border-brutal)", boxShadow: "var(--shadow-brutal)" }}
        >
          <HeaderForm action={saveHeader} defaults={r} lockKeys />
          <div className="self-start">
            <DeleteHeaderButton id={String(r.id)} />
          </div>
        </div>
      ))}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-black uppercase">Add header</h2>
        <HeaderForm action={saveHeader} />
      </div>
    </div>
  );
}
