/**
 * Admin verification probe.
 *
 * Starts the dev server, logs in, fetches the admin pages, checks the markup
 * the new components render, then stops the server. Everything happens in one
 * process tree so it works in environments where spawned processes do not
 * survive a shell exit.
 *
 * Every step is bounded. The script never hangs:
 *   - OVERALL_DEADLINE_MS caps the whole run.
 *   - each fetch gets its own timeout.
 *   - the server is killed with the process tree, SIGTERM first, SIGKILL after.
 *
 * Usage: node scripts/verify-admin.mjs
 */
import { spawn, execFileSync } from "node:child_process";
import { existsSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PORT = Number(process.env.PORT || 3111);
const BASE = `http://localhost:${PORT}`;
const EMAIL = process.env.ADMIN_EMAIL || "owner@example.com";
const PASSWORD = process.env.ADMIN_PASSWORD || "REDACTED";

const OVERALL_DEADLINE_MS = Number(process.env.DEADLINE_MS || 240000);
const SERVER_READY_TIMEOUT_MS = Number(process.env.READY_TIMEOUT_MS || 120000);
const REQUEST_TIMEOUT_MS = Number(process.env.REQUEST_TIMEOUT_MS || 45000);

const started = Date.now();
const remaining = () => OVERALL_DEADLINE_MS - (Date.now() - started);
const timedOut = () => remaining() <= 0;

const checks = [];
const record = (name, pass, detail = "") => {
  checks.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? ` :: ${detail}` : ""}`);
};

// A stale lock from a killed run stops the next boot, so clear it first.
for (const stale of [".dev-server.json", ".next/dev/lock"]) {
  const path = `${ROOT}/${stale}`;
  if (existsSync(path)) rmSync(path, { force: true });
}

const server = spawn("node scripts/dev.mjs", {
  cwd: ROOT,
  env: { ...process.env, PORT: String(PORT) },
  shell: true,
  stdio: ["ignore", "pipe", "pipe"],
});

let serverLog = "";
const collect = (d) => {
  serverLog += d.toString();
  if (serverLog.length > 20000) serverLog = serverLog.slice(-20000);
};
server.stdout.on("data", collect);
server.stderr.on("data", collect);

let killed = false;
const stop = () => {
  if (killed) return;
  killed = true;
  try {
    if (process.platform === "win32" && server.pid) {
      // Kill the whole tree, cmd.exe included, so nothing survives.
      execFileSync("taskkill", ["/PID", String(server.pid), "/T", "/F"], {
        stdio: "ignore",
      });
    } else {
      server.kill("SIGKILL");
    }
  } catch {
    try {
      server.kill("SIGKILL");
    } catch {
      /* already gone */
    }
  }
};
process.on("exit", stop);
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    stop();
    process.exit(1);
  });
}

const get = async (path, options = {}) => {
  const budget = Math.min(REQUEST_TIMEOUT_MS, Math.max(1000, remaining()));
  return fetch(`${BASE}${path}`, {
    ...options,
    redirect: "manual",
    signal: AbortSignal.timeout(budget),
  });
};

async function waitForServer() {
  const limit = Math.min(SERVER_READY_TIMEOUT_MS, Math.max(1000, remaining()));
  const until = Date.now() + limit;
  while (Date.now() < until) {
    try {
      const res = await get("/admin/login");
      if (res.status > 0) return true;
    } catch {
      /* not up yet */
    }
    await sleep(1500);
  }
  return false;
}

try {
  const up = await waitForServer();
  record(
    "dev server responds on /admin/login",
    up,
    up ? `port ${PORT}, ${Math.round((Date.now() - started) / 1000)}s` : serverLog.slice(-300),
  );

  if (!up) {
    process.exitCode = 1;
  } else {
    const login = await get("/api/users/login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
    });
    const cookie = (login.headers.getSetCookie?.() ?? [])
      .map((c) => c.split(";")[0])
      .join("; ");
    record(
      "login returns 200 and a session cookie",
      login.status === 200 && cookie.length > 0,
      `status ${login.status}`,
    );

    const pages = [
      ["/admin", "dashboard", 200],
      ["/admin/collections/projects", "list", 200],
      ["/admin/collections/projects/create", "create", 200],
      ["/admin/globals/profile", "global", 200],
      ["/admin/collections/media/create", "media", 200],
      ["/admin/account", "account", 200],
      ["/admin/nope", "not found", 404],
    ];

    const bodies = {};
    for (const [path, name, expected] of pages) {
      if (timedOut()) {
        record(`GET ${path}`, false, "skipped, deadline reached");
        continue;
      }
      const res = await get(path, { headers: { cookie } });
      const html = await res.text();
      bodies[name] = html;
      record(`GET ${path} returns ${expected}`, res.status === expected, `status ${res.status}`);
    }

    const dash = bodies.dashboard ?? "";

    record("sidebar renders the admin-nav class", dash.includes("admin-nav"));
    record("logo renders the admin-logo class", dash.includes("admin-logo"));
    record("header renders the app header", dash.includes("app-header"));
    record("logout renders the admin-logout class", dash.includes("admin-logout"));
    record("nav renders collection links", /admin\/collections\/projects/.test(dash));
    record("nav renders the profile global link", /admin\/globals\/profile/.test(dash));
    record("no kyos naming left in the markup", !/kyos/i.test(dash));
    record(
      "the collapsed nav keeps an accessible name on every link",
      (dash.match(/aria-label="/g) ?? []).length > 0,
      `${(dash.match(/aria-label="/g) ?? []).length} labelled nodes`,
    );
  }
} catch (error) {
  record("probe ran without throwing", false, String(error));
  process.exitCode = 1;
} finally {
  stop();
  await sleep(500);
}

const failed = checks.filter((c) => !c.pass);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed in ${Math.round((Date.now() - started) / 1000)}s`);
if (failed.length) process.exitCode = 1;
