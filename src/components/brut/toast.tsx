"use client";
import { useEffect } from "react";

export function Toast({ message, onClose }: {
  message: string | null; onClose: () => void;
}) {
  useEffect(() => {
    if (!message) return;
    const id = window.setTimeout(onClose, 3500);
    return () => window.clearTimeout(id);
  }, [message, onClose]);

  if (!message) return null;
  return (
    <div
      role="status"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-background"
      style={{ border: "var(--border-brutal)", boxShadow: "var(--shadow-brutal)" }}
    >
      <span className="text-sm font-bold">{message}</span>
      <button
        onClick={onClose}
        aria-label="Dismiss"
        className="font-black"
      >
        x
      </button>
    </div>
  );
}
