export function isAdminEmail(
  email: string | null | undefined,
  adminEmail: string | undefined,
): boolean {
  if (!email || !adminEmail) return false;
  return email.trim().toLowerCase() === adminEmail.trim().toLowerCase();
}
