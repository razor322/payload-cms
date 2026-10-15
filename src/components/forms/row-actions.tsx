"use client";
import { useTransition } from "react";
import { Button } from "@/components/brut/button";
import { ConfirmButton } from "@/components/brut/confirm";

export function RowActions({
  id,
  ids,
  index,
  editHref,
  onDelete,
  onReorder,
  entityLabel = "item",
}: {
  id: string;
  ids: string[];
  index: number;
  editHref: string;
  onDelete: (id: string) => Promise<void>;
  onReorder: (ids: string[]) => Promise<void>;
  entityLabel?: string;
}) {
  const [pending, start] = useTransition();

  function move(to: number) {
    const next = ids.slice();
    const [item] = next.splice(index, 1);
    next.splice(Math.max(0, Math.min(to, next.length)), 0, item);
    start(() => void onReorder(next));
  }

  return (
    <div className="flex items-center gap-1">
      <Button type="button" aria-label="Move up" disabled={pending || index === 0} onClick={() => move(index - 1)}>
        ↑
      </Button>
      <Button type="button" aria-label="Move down" disabled={pending || index === ids.length - 1} onClick={() => move(index + 1)}>
        ↓
      </Button>
      <a href={editHref}>
        <Button type="button">Edit</Button>
      </a>
      <ConfirmButton
        label="Delete"
        confirmLabel={`Delete this ${entityLabel}`}
        onConfirm={() => start(() => void onDelete(id))}
      />
    </div>
  );
}
