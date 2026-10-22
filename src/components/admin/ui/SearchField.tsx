"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

/**
 * The reference keeps the search in the card head, beside the action. Payload
 * keeps it in its own row inside the list controls. This writes the same
 * `search` query param Payload reads, debounced, and keeps the other params,
 * so the list still filters through Payload and only the place it sits
 * changes. Payload also resets the page, because a search narrows the list.
 */
export function SearchField({
  placeholder = "Search",
}: {
  placeholder?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const current = params.get("search") ?? "";
  const [value, setValue] = React.useState(current);
  const [lastPushed, setLastPushed] = React.useState(current);

  // A navigation from elsewhere rewrites the query, so the field follows it.
  if (current !== lastPushed && current !== value) {
    setLastPushed(current);
    setValue(current);
  }

  React.useEffect(() => {
    if (value === lastPushed) return;
    const timer = setTimeout(() => {
      setLastPushed(value);
      const next = new URLSearchParams(params.toString());
      if (value) next.set("search", value);
      else next.delete("search");
      next.set("page", "1");
      router.replace(`${pathname}?${next.toString()}`);
    }, 300);
    return () => clearTimeout(timer);
  }, [value, lastPushed, params, pathname, router]);

  return (
    <div className="pa-search">
      <svg
        aria-hidden="true"
        className="pa-search__icon"
        fill="none"
        height="16"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        width="16"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input
        aria-label={placeholder}
        className="pa-search__input"
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        type="search"
        value={value}
      />
    </div>
  );
}

export default SearchField;
