"use client";
import { useTransition } from "react";
import { ConfirmButton } from "@/components/brut/confirm";
import { deleteHeaderAction } from "@/actions/site";

export function DeleteHeaderButton({ id }: { id: string }) {
  const [, start] = useTransition();
  return (
    <ConfirmButton
      label="Delete"
      confirmLabel="Delete this header"
      onConfirm={() => start(() => void deleteHeaderAction(id))}
    />
  );
}
