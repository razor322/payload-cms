/**
 * Dev launcher.
 *
 * Next 16 refuses to start a second dev server for the same project: it holds
 * an exclusive lock on .next/dev/lock and aborts when it cannot acquire it.
 * The port is not the real problem, Next already moves to the next free port.
 * Two dev servers on one project would corrupt the shared .next cache.
 *
 * This wrapper turns that hard error into a fallback:
 *   - it picks a free port itself and passes it to Next
 *   - it records the pid and port in .next/dev/launcher.json
 *   - on the next run, if that pid is still alive it reuses that server
 *     (exit 0) instead of failing
 */
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
// Kept outside .next because Next rewrites that directory on startup.
const STATE_FILE = resolve(ROOT, ".dev-server.json");
const DEFAULT_PORT = Number(process.env.PORT) || 3000;

function isAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function readState() {
  if (!existsSync(STATE_FILE)) return null;
  try {
    const state = JSON.parse(readFileSync(STATE_FILE, "utf8"));
    return isAlive(state.pid) ? state : null;
  } catch {
    return null;
  }
}

function isFree(port) {
  return new Promise((resolve) => {
    const server = createServer();
    server.once("error", () => resolve(false));
    server.once("listening", () => server.close(() => resolve(true)));
    // No host argument: binds :: like Next does, so an IPv6 dual-stack listener
    // on the same port is detected as taken.
    server.listen(port);
  });
}

async function findFreePort(start) {
  for (let port = start; port < start + 100; port += 1) {
    if (await isFree(port)) return port;
  }
  return start;
}

const running = readState();

if (running) {
  const url = `http://localhost:${running.port}`;
  console.log(`\n  Dev server is already running for this project.`);
  console.log(`  Reusing it: ${url}\n`);
  console.log(`  Stop it first with: taskkill /PID ${running.pid} /F\n`);
  process.exit(0);
}

const nextBin = resolve(ROOT, "node_modules/next/dist/bin/next");

function writeState(pid, port) {
  mkdirSync(dirname(STATE_FILE), { recursive: true });
  writeFileSync(
    STATE_FILE,
    JSON.stringify({ pid, port, startedAt: new Date().toISOString() }),
    "utf8",
  );
}

const cleanup = () => {
  try {
    writeFileSync(STATE_FILE, JSON.stringify({ pid: 0, port: 0 }), "utf8");
  } catch {
    // best effort
  }
};

/**
 * Starts Next on the given port. Resolves with the child once it has been up
 * for a moment, so a bind failure can be retried on the next free port.
 */
function startOn(port) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [nextBin, "dev", ...process.argv.slice(2)], {
      cwd: ROOT,
      stdio: "inherit",
      env: { ...process.env, PORT: String(port) },
    });

    writeState(child.pid, port);

    let settled = false;
    const startupTimer = setTimeout(() => {
      settled = true;
      resolve(child);
    }, 3000);

    child.on("exit", (code, signal) => {
      if (!settled) {
        clearTimeout(startupTimer);
        cleanup();
        reject(new Error(`next dev exited on port ${port} (code ${code}, signal ${signal})`));
        return;
      }
      cleanup();
      process.exit(signal ? 1 : (code ?? 0));
    });
  });
}

let child;
let lastError;
let searchFrom = DEFAULT_PORT;
for (let attempt = 0; attempt < 5; attempt += 1) {
  const port = await findFreePort(searchFrom);
  try {
    child = await startOn(port);
    break;
  } catch (error) {
    lastError = error;
    // Move past this port, the next attempt must not pick it again.
    searchFrom = port + 1;
  }
}

if (!child) {
  console.error(`[dev] Could not start a dev server on a free port. ${lastError?.message ?? ""}`);
  process.exit(1);
}

process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
