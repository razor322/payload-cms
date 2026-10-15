"use client";
import { useState } from "react";
import { Input } from "@/components/brut/input";
import { Button } from "@/components/brut/button";
import { reorder } from "@/lib/reorder";

export function ArrayField({
  name,
  defaultValues = [],
  placeholder = "value",
  addLabel = "Add",
}: {
  name: string;
  defaultValues?: string[];
  placeholder?: string;
  addLabel?: string;
}) {
  const [items, setItems] = useState<string[]>(defaultValues);

  return (
    <div className="flex flex-col gap-2">
      {items.map((value, i) => (
        <div key={i} className="flex items-center gap-2">
          <Input
            name={name}
            value={value}
            placeholder={placeholder}
            onChange={(e) =>
              setItems((prev) => {
                const next = prev.slice();
                next[i] = e.target.value;
                return next;
              })
            }
          />
          <Button
            type="button"
            aria-label="Move up"
            onClick={() => setItems((prev) => reorder(prev, i, i - 1))}
            disabled={i === 0}
          >
            ↑
          </Button>
          <Button
            type="button"
            aria-label="Move down"
            onClick={() => setItems((prev) => reorder(prev, i, i + 1))}
            disabled={i === items.length - 1}
          >
            ↓
          </Button>
          <Button
            type="button"
            variant="danger"
            aria-label="Remove"
            onClick={() =>
              setItems((prev) => prev.filter((_, idx) => idx !== i))
            }
          >
            x
          </Button>
        </div>
      ))}
      <div>
        <Button type="button" onClick={() => setItems((prev) => [...prev, ""])}>
          {addLabel}
        </Button>
      </div>
    </div>
  );
}
