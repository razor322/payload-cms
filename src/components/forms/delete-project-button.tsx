"use client";
import { useTransition } from "react";
import { ConfirmButton } from "@/components/brut/confirm";
import { deleteProjectAction } from "@/actions/projects";

export function DeleteProjectButton({ id }: { id: string }) {
  const [, start] = useTransition();
  return (
    <ConfirmButton
      label="Delete"
      confirmLabel="Delete this project"
      onConfirm={() => start(() => void deleteProjectAction(id))}
    />
  );
}
