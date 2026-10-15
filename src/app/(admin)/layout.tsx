import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { logout } from "../(auth)/actions";

const nav = [
  ["Projects", "/projects"], ["Experiences", "/experiences"],
  ["Skills", "/skills"], ["Capabilities", "/capabilities"],
  ["Headers", "/headers"], ["Profile", "/profile"],
  ["Testimonials", "/testimonials"], ["Awards", "/awards"],
] as const;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();
  return (
    <div className="min-h-screen bg-background">
      <header
        className="flex flex-wrap items-center gap-3 px-6 py-4 bg-background"
        style={{ borderBottom: "var(--border-brutal)" }}
      >
        <Link href="/" className="font-black uppercase tracking-tight">
          Portfolio Admin
        </Link>
        <nav className="flex flex-wrap gap-2">
          {nav.map(([label, href]) => (
            <Link key={href} href={href}
              className="px-2 py-1 text-xs font-bold uppercase"
              style={{ border: "var(--border-brutal)" }}>
              {label}
            </Link>
          ))}
        </nav>
        <span className="ml-auto flex items-center gap-3 text-xs">
          <span className="opacity-70">{user.email}</span>
          <form action={logout}>
            <button className="px-2 py-1 font-bold uppercase"
              style={{ border: "var(--border-brutal)" }}>
              Sign out
            </button>
          </form>
        </span>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}
