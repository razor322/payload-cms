/**
 * Loads .env.local into process.env.
 *
 * Imported for its side effect, and it must come before the Payload config,
 * because the config reads the environment while it is evaluated.
 */
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { Client } from "pg";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const file = resolve(root, ".env.local");

if (existsSync(file)) {
  for (const line of readFileSync(file, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const at = trimmed.indexOf("=");
    if (at < 1) continue;
    const key = trimmed.slice(0, at).trim();
    const value = trimmed
      .slice(at + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

/**
 * The Supabase session pooler caps the client connections at its pool size
 * (15), which the seed and the dev server together can reach. The direct host
 * has no cap, so use it when the pooler is in the URI and the direct host
 * answers. The pooler stays the fallback.
 */
async function preferDirectDatabase() {
  const uri = process.env.DATABASE_URI;
  if (!uri) return;
  const url = new URL(uri);
  if (!url.hostname.includes("pooler.supabase.com")) return;
  const ref = url.username.split(".")[1];
  if (!ref) return;

  const direct = new URL(uri);
  direct.hostname = `db.${ref}.supabase.co`;
  direct.port = "5432";
  direct.username = "postgres";

  const client = new Client({
    connectionString: direct.toString(),
    connectionTimeoutMillis: 10000,
  });
  try {
    await client.connect();
    await client.end();
    process.env.DATABASE_URI = direct.toString();
    console.log(`[env] using the direct database host, not the pooler`);
  } catch (error) {
    await client.end().catch(() => {});
    console.log(
      `[env] direct database host unreachable (${(error as Error).message}), staying on the pooler`,
    );
  }
}

await preferDirectDatabase();
