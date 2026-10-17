import { login } from "../actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-background">
      <form
        action={login}
        className="w-full max-w-sm bg-background p-8 flex flex-col gap-4"
        style={{ border: "var(--border-brutal)", boxShadow: "var(--shadow-brutal)" }}
      >
        <h1 className="text-2xl font-black uppercase tracking-tight">Admin Login</h1>
        {error ? (
          <p role="alert" className="text-sm" style={{ color: "crimson" }}>
            {error === "not_admin" ? "This account is not allowed." : "Wrong email or password."}
          </p>
        ) : null}
        <label className="flex flex-col gap-1 text-sm font-bold uppercase">
          Email
          <input name="email" type="email" required autoComplete="email"
            className="px-3 py-2 bg-background"
            style={{ border: "var(--border-brutal)" }} />
        </label>
        <label className="flex flex-col gap-1 text-sm font-bold uppercase">
          Password
          <input name="password" type="password" required autoComplete="current-password"
            className="px-3 py-2 bg-background"
            style={{ border: "var(--border-brutal)" }} />
        </label>
        <button type="submit"
          className="px-4 py-2 font-black uppercase"
          style={{ border: "var(--border-brutal)", boxShadow: "var(--shadow-brutal)", background: "var(--accent)", color: "var(--foreground)" }}>
          Sign in
        </button>
      </form>
    </main>
  );
}
