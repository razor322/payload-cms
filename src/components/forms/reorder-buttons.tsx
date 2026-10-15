"use client";
import { useTransition } from "react";
import { Button } from "@/components/brut/button";
import { reorderProjects } from "@/actions/projects";

export function ReorderButtons({
  ids,
  index,
}: {
  ids: string[];
  index: number;
}) {
  const [pending, start] = useTransition();

  function move(to: number) {
    const next = ids.slice();
    const [item] = next.splice(index, 1);
    next.splice(Math.max(0, Math.min(to, next.length)), 0, item);
    start(() => void reorderProjects(next));
  }

  return (
    <div className="flex gap-1">
      <Button type="button" aria-label="Move up" disabled={pending || index === 0} onClick={() => move(index - 1)}>
        ↑
      </Button>
      <Button type="button" aria-label="Move down" disabled={pending || index === ids.length - 1} onClick={() => move(index + 1)}>
        ↓
      </Button>
    </div>
  );
}
