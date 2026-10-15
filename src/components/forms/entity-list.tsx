import { Table, Thead, Th, Td, Tr } from "@/components/brut/table";
import { Empty } from "@/components/states/empty";
import { RowActions } from "@/components/forms/row-actions";

export type Column = { header: string; get: (row: Record<string, unknown>) => React.ReactNode };

export function EntityList({
  title,
  basePath,
  rows,
  columns,
  onDelete,
  onReorder,
  entityLabel,
}: {
  title: string;
  basePath: string;
  rows: Record<string, unknown>[];
  columns: Column[];
  onDelete: (id: string) => Promise<void>;
  onReorder: (ids: string[]) => Promise<void>;
  entityLabel: string;
}) {
  const ids = rows.map((r) => String(r.id));
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-black uppercase">{title}</h1>
        <a href={`${basePath}/new`} className="font-black uppercase underline">
          + New
        </a>
      </div>
      {rows.length === 0 ? (
        <Empty message={`No ${entityLabel}s yet.`} />
      ) : (
        <Table>
          <Thead>
            <Tr>
              <Th>Actions</Th>
              {columns.map((c) => (
                <Th key={c.header}>{c.header}</Th>
              ))}
            </Tr>
          </Thead>
          <tbody>
            {rows.map((r, index) => (
              <Tr key={String(r.id)}>
                <Td>
                  <RowActions
                    id={String(r.id)}
                    ids={ids}
                    index={index}
                    editHref={`${basePath}/${r.id}`}
                    onDelete={onDelete}
                    onReorder={onReorder}
                    entityLabel={entityLabel}
                  />
                </Td>
                {columns.map((c) => (
                  <Td key={c.header}>{c.get(r)}</Td>
                ))}
              </Tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
