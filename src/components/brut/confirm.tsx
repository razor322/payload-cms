"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";

export function ConfirmButton({
  label, confirmLabel = "Confirm", onConfirm,
}: { label: string; confirmLabel?: string; onConfirm: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Button type="button" variant="danger" onClick={() => setOpen(true)}>
        {label}
      </Button>
      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-background p-6 max-w-sm w-full flex flex-col gap-4"
            style={{ border: "var(--border-brutal)", boxShadow: "var(--shadow-brutal)" }}
          >
            <p className="font-bold">{confirmLabel}?</p>
            <div className="flex gap-3 justify-end">
              <Button type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="danger"
                onClick={() => {
                  setOpen(false);
                  onConfirm();
                }}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
