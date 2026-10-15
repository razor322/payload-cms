# Phase 5 — Brut Component Set Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A small neobrutalist primitive set + the three data states, all keyboard-accessible with visible focus.

**Architecture:** `src/components/brut` holds presentational primitives with no data logic. `src/components/states` holds Empty/Loading/Error. Every interactive element relies on the tokens from Phase 1. Only components needing state/handlers get `"use client"`.

**Tech Stack:** React, Tailwind CSS v4, TypeScript.

## Global Constraints

- Wireframe border: `--border-brutal`; hard shadow: `--shadow-brutal`; radius 0.
- Visible focus on every control; never `outline: none` without a replacement.
- Keyboard operable (Enter/Space for buttons, Escape closes dialogs).
- Dial ENERGY 3 / RHYTHM 2 / MOTION 1: bold visuals, motion only as state feedback.

---

### Task 1: Button + Tag + Badge

**Files:**
- Create: `src/components/brut/button.tsx`, `tag.tsx`, `badge.tsx`

**Interfaces:**
- Consumes: tokens, `cn`.
- Produces: `Button` (variants primary/secondary/danger), `Tag`, `Badge`.

- [ ] **Step 1: Write `Button`**

`src/components/brut/button.tsx`:

```tsx
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "danger";

export function Button({
  variant = "secondary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  const bg =
    variant === "primary" ? "var(--accent)"
    : variant === "danger" ? "#ff2d2d"
    : "var(--background)";
  return (
    <button
      {...props}
      className={cn(
        "px-4 py-2 font-black uppercase text-sm tracking-tight",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        "active:translate-x-[2px] active:translate-y-[2px] disabled:opacity-50",
        className,
      )}
      style={{
        border: "var(--border-brutal)",
        boxShadow: "var(--shadow-brutal)",
        background: bg,
        color: variant === "danger" ? "#fff" : "var(--foreground)",
      }}
    />
  );
}
```

- [ ] **Step 2: Write `Tag` and `Badge`**

`src/components/brut/tag.tsx`:

```tsx
export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="inline-block px-2 py-0.5 text-xs font-bold uppercase"
      style={{ border: "var(--border-brutal)" }}
    >
      {children}
    </span>
  );
}
```

`src/components/brut/badge.tsx`:

```tsx
export function Badge({ children, tone = "accent" }: {
  children: React.ReactNode; tone?: "accent" | "muted";
}) {
  return (
    <span
      className="inline-block px-2 py-0.5 text-[11px] font-black uppercase"
      style={{
        border: "var(--border-brutal)",
        background: tone === "accent" ? "var(--accent)" : "transparent",
      }}
    >
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Verify render**

Render each on the dashboard temporarily; confirm borders, shadow, focus ring.
Stop dev server after.

- [ ] **Step 4: Commit**

```bash
git add src/components/brut/button.tsx src/components/brut/tag.tsx src/components/brut/badge.tsx
git commit -m "feat: brut button, tag, badge"
```

---

### Task 2: Inputs

**Files:**
- Create: `src/components/brut/input.tsx`, `textarea.tsx`, `select.tsx`, `checkbox.tsx`

**Interfaces:**
- Consumes: tokens, `cn`.
- Produces: `Input`, `Textarea`, `Select`, `Checkbox`.

- [ ] **Step 1: Write `Input` and `Textarea`**

`src/components/brut/input.tsx`:

```tsx
import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full px-3 py-2 bg-background text-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
        className,
      )}
      style={{ border: "var(--border-brutal)" }}
    />
  );
}
```

`src/components/brut/textarea.tsx`: same shape using `<textarea>` and
`className="min-h-28 w-full ..."`.

- [ ] **Step 2: Write `Select` and `Checkbox`**

`src/components/brut/select.tsx`: a styled `<select>`; `src/components/brut/checkbox.tsx`:
an `<input type="checkbox">` with `accent-color: var(--accent)` and a bold label slot.

- [ ] **Step 3: Verify**

Tab through each input; confirm a visible focus outline.
Stop dev server after.

- [ ] **Step 4: Commit**

```bash
git add src/components/brut/input.tsx src/components/brut/textarea.tsx src/components/brut/select.tsx src/components/brut/checkbox.tsx
git commit -m "feat: brut inputs"
```

---

### Task 3: Card + Table

**Files:**
- Create: `src/components/brut/card.tsx`, `table.tsx`

**Interfaces:**
- Consumes: tokens.
- Produces: `Card`, `Table` (with `Thead`/`Tbody` styling via props).

- [ ] **Step 1: Write `Card`**

`src/components/brut/card.tsx`:

```tsx
export function Card({ children, className = "" }: {
  children: React.ReactNode; className?: string;
}) {
  return (
    <div
      className={`p-6 bg-background ${className}`}
      style={{ border: "var(--border-brutal)", boxShadow: "var(--shadow-brutal)" }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Write `Table`**

`src/components/brut/table.tsx`: a thin wrapper that renders
`<table className="w-full border-collapse text-sm">` and applies
`border: var(--border-brutal)` to cells via a shared class, plus a bold header.

- [ ] **Step 3: Verify**

Render a sample table; confirm borders and hover states.
Stop dev server after.

- [ ] **Step 4: Commit**

```bash
git add src/components/brut/card.tsx src/components/brut/table.tsx
git commit -m "feat: brut card and table"
```

---

### Task 4: Toast + Confirm

**Files:**
- Create: `src/components/brut/toast.tsx`, `confirm.tsx`

**Interfaces:**
- Consumes: tokens.
- Produces: `Toast` (presentational) and `ConfirmButton` (client, Escape-closable dialog).

- [ ] **Step 1: Write `Toast`**

`src/components/brut/toast.tsx`: a fixed bottom-right box that shows a message
and a close button; accepts `message: string | null` and `onClose`.

- [ ] **Step 2: Write `ConfirmButton`**

`src/components/brut/confirm.tsx` (`"use client"`):

```tsx
"use client";
import { useEffect, useState } from "react";
import { Button } from "./button";

export function ConfirmButton({
  label, confirmLabel = "Confirm", onConfirm,
}: { label: string; confirmLabel?: string; onConfirm: () => void }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <Button type="button" variant="danger" onClick={() => setOpen(true)}>{label}</Button>
      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6"
             role="dialog" aria-modal="true">
          <div className="bg-background p-6 max-w-sm w-full flex flex-col gap-4"
               style={{ border: "var(--border-brutal)", boxShadow: "var(--shadow-brutal)" }}>
            <p className="font-bold">{confirmLabel}?</p>
            <div className="flex gap-3 justify-end">
              <Button type="button" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="button" variant="danger"
                      onClick={() => { setOpen(false); onConfirm(); }}>Yes</Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
```

- [ ] **Step 3: Verify**

Open the dialog, press Escape, confirm it closes; Tab reaches both buttons.
Stop dev server after.

- [ ] **Step 4: Commit**

```bash
git add src/components/brut/toast.tsx src/components/brut/confirm.tsx
git commit -m "feat: brut toast and confirm"
```

---

### Task 5: Data states

**Files:**
- Create: `src/components/states/empty.tsx`, `loading.tsx`, `error.tsx`

**Interfaces:**
- Consumes: tokens.
- Produces: `Empty`, `Loading`, `ErrorState`.

- [ ] **Step 1: Write the three**

`empty.tsx`: a bordered box with a message and an optional action child.
`loading.tsx`: a bordered box with the text "Loading" (text, no spinner lib).
`error.tsx`: a bordered box, red tone, message + retry child.

- [ ] **Step 2: Verify**

Render all three in a row on the dashboard temporarily.
Stop dev server after.

- [ ] **Step 3: Commit**

```bash
git add src/components/states/
git commit -m "feat: empty, loading, error states"
```

---

### Task 6: Verify Phase 5

- [ ] **Step 1: Build + tests**

Run: `bun run build` then `bun test`
Expected: clean.

- [ ] **Step 2: Keyboard + focus pass**

Tab through every primitive on a scratch page; confirm visible focus and that
buttons activate with Enter/Space.

- [ ] **Step 3: Mark roadmap**

Tick Phase 5 boxes in `docs/ROADMAP.md`.

- [ ] **Step 4: Commit**

```bash
git add docs/ROADMAP.md
git commit -m "docs: mark phase 5 complete"
```
