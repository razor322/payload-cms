export function reorder<T>(list: readonly T[], from: number, to: number): T[] {
  const next = list.slice();
  if (next.length === 0) return next;
  const f = Math.max(0, Math.min(from, next.length - 1));
  const t = Math.max(0, Math.min(to, next.length - 1));
  const [item] = next.splice(f, 1);
  next.splice(t, 0, item);
  return next;
}
