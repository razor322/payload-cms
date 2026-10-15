# Phase 3 — Supabase Wiring + Auth Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Working login restricted to one email, a session-refreshing middleware, a guarded admin shell, and the two Supabase clients.

**Architecture:** `@supabase/ssr` provides the cookie-based server client. Middleware refreshes the session and gates on the admin email. A service-role client is created lazily for writes (used from Phase 6). `requireAdmin()` is the guard every protected action and layout calls.

**Tech Stack:** Next.js App Router, `@supabase/ssr`, `@supabase/supabase-js`, Server Actions.

## Global Constraints

- Service-role key is server-only; never `NEXT_PUBLIC_`.
- No `/api` route; auth uses Server Actions.
- `requireAdmin()` reuses `isAdminEmail` from Phase 2.
- Signups disabled in Supabase (done in the dashboard, Phase 4 setup).

---

### Task 1: Cookie server client

**Files:**
- Create: `src/lib/supabase/server.ts`

**Interfaces:**
- Consumes: env `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Produces: `createServerClient()` (async, returns a Supabase client bound to request cookies).

- [ ] **Step 1: Write the client**

`src/lib/supabase/server.ts`:

```ts
import { createServerClient as createSSRClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createServerClient() {
  const cookieStore = await cookies();
  return createSSRClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // called from a Server Component; middleware handles refresh
          }
        },
      },
    },
  );
}
```

- [ ] **Step 2: Type-check**

Run: `bun run build`
Expected: no type errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/supabase/server.ts
git commit -m "feat: supabase cookie server client"
```

---

### Task 2: Service-role client

**Files:**
- Create: `src/lib/supabase/admin.ts`

**Interfaces:**
- Consumes: env `SUPABASE_SERVICE_ROLE_KEY`.
- Produces: `createAdminClient(): SupabaseClient`.

- [ ] **Step 1: Write the client**

`src/lib/supabase/admin.ts`:

```ts
import "server-only";
import { createClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase admin env vars");
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
```

- [ ] **Step 2: Install `server-only`**

```bash
bun add server-only
```

- [ ] **Step 3: Type-check**

Run: `bun run build`
Expected: pass.

- [ ] **Step 4: Commit**

```bash
git add src/lib/supabase/admin.ts package.json bun.lock
git commit -m "feat: supabase service-role client"
```

---

### Task 3: Auth guard helper

**Files:**
- Create: `src/lib/auth.ts`

**Interfaces:**
- Consumes: `createServerClient`, `isAdminEmail`.
- Produces: `getAdminUser()` and `requireAdmin()`.

- [ ] **Step 1: Write the guard**

`src/lib/auth.ts`:

```ts
import "server-only";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth-predicate";

export async function getAdminUser() {
  const supabase = await createServerClient();
  const { data } = await supabase.auth.getUser();
  const user = data.user;
  if (!user || !isAdminEmail(user.email, process.env.ADMIN_EMAIL)) {
    return null;
  }
  return user;
}

export async function requireAdmin() {
  const user = await getAdminUser();
  if (!user) redirect("/login");
  return user;
}
```

- [ ] **Step 2: Type-check**

Run: `bun run build`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/lib/auth.ts
git commit -m "feat: admin guard helpers"
```

---

### Task 4: Middleware

**Files:**
- Create: `src/middleware.ts`

**Interfaces:**
- Consumes: `@supabase/ssr`, `isAdminEmail`.
- Produces: session refresh on every request + redirect of non-admins away from `(admin)` routes.

- [ ] **Step 1: Write the middleware**

`src/middleware.ts`:

```ts
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/auth-predicate";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data } = await supabase.auth.getUser();
  const user = data.user;
  const isAdmin = !!user && isAdminEmail(user.email, process.env.ADMIN_EMAIL);
  const path = request.nextUrl.pathname;

  if (path === "/login") {
    if (isAdmin) return NextResponse.redirect(new URL("/", request.url));
    return response;
  }
  if (!isAdmin) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
```

- [ ] **Step 2: Type-check**

Run: `bun run build`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add src/middleware.ts
git commit -m "feat: session refresh + admin gate middleware"
```

---

### Task 5: Login actions

**Files:**
- Create: `src/app/(auth)/actions.ts`

**Interfaces:**
- Consumes: `createServerClient`, `isAdminEmail`.
- Produces: `login(formData)` and `logout()` Server Actions.

- [ ] **Step 1: Write the actions**

`src/app/(auth)/actions.ts`:

```ts
"use server";
import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/auth-predicate";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!isAdminEmail(email, process.env.ADMIN_EMAIL)) {
    redirect("/login?error=not_admin");
  }

  const supabase = await createServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect("/login?error=invalid");
  redirect("/");
}

export async function logout() {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
```

- [ ] **Step 2: Type-check**

Run: `bun run build`
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(auth)/actions.ts"
git commit -m "feat: login and logout server actions"
```

---

### Task 6: Login page

**Files:**
- Create: `src/app/(auth)/login/page.tsx`

**Interfaces:**
- Consumes: `login` from `(auth)/actions`.
- Produces: the `/login` screen.

- [ ] **Step 1: Write the page**

`src/app/(auth)/login/page.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify it renders**

Run: `bun dev`, visit http://localhost:3000/login.
Expected: neobrutalist login card. Stop the server.

- [ ] **Step 3: Commit**

```bash
git add "src/app/(auth)/login/page.tsx"
git commit -m "feat: login page"
```

---

### Task 7: Guarded admin shell

**Files:**
- Create: `src/app/(admin)/layout.tsx`
- Create: `src/app/(admin)/page.tsx`
- Modify: `src/app/layout.tsx` (verify root layout only)

**Interfaces:**
- Consumes: `requireAdmin`, `logout`.
- Produces: the authenticated shell wrapping all admin routes.

- [ ] **Step 1: Write the shell layout**

`src/app/(admin)/layout.tsx`:

```tsx
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
```

- [ ] **Step 2: Write the dashboard placeholder**

`src/app/(admin)/page.tsx`:

```tsx
export default function DashboardPage() {
  return <h1 className="text-3xl font-black uppercase">Dashboard</h1>;
}
```

- [ ] **Step 3: Verify the gate**

Setup: create the admin user in Supabase, fill `.env.local`. Run `bun dev`.
- Visit `/` unauthenticated → redirected to `/login`.
- Log in with the admin email → reach `/` and see the shell.
- Sign out → back to `/login`.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(admin)/layout.tsx" "src/app/(admin)/page.tsx"
git commit -m "feat: guarded admin shell"
```

---

### Task 8: Verify Phase 3

- [ ] **Step 1: Build + tests**

Run: `bun run build` then `bun test`
Expected: clean build, green tests.

- [ ] **Step 2: Mark roadmap**

Tick Phase 3 boxes in `docs/ROADMAP.md`.

- [ ] **Step 3: Commit**

```bash
git add docs/ROADMAP.md
git commit -m "docs: mark phase 3 complete"
```
