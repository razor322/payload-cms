type Sited = { site?: string };

/**
 * Picks the rows a site consumes.
 *
 * A shared row (site "all") is used unless a row for this site carries the same
 * key, in which case the site row replaces it. Rows for other sites are dropped.
 */
export function resolveForSite<T extends Sited>(
  docs: T[],
  site: string,
  keyFn: (doc: T) => string,
): T[] {
  const byKey = new Map<string, T>();

  for (const doc of docs) {
    const siteValue = doc.site ?? "all";
    if (siteValue !== "all" && siteValue !== site) continue;

    const key = keyFn(doc);
    const current = byKey.get(key);
    if (!current || siteValue === site) {
      byKey.set(key, doc);
    }
  }

  return Array.from(byKey.values());
}
