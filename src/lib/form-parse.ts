/** FormData readers shared by all domain action parsers. */
export const fdStr = (fd: FormData, name: string) => String(fd.get(name) ?? "");
export const fdOpt = (fd: FormData, name: string) => {
  const v = fd.get(name);
  const s = v === null ? "" : String(v).trim();
  return s === "" ? undefined : s;
};
export const fdArr = (fd: FormData, name: string) =>
  fd.getAll(name).map(String).map((s) => s.trim()).filter(Boolean);
export const fdNum = (fd: FormData, name: string) => Number(fd.get(name) ?? 0);
export const fdBool = (fd: FormData, name: string) =>
  fd.get(name) === "on" || fd.get(name) === "true";
