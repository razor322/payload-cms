/**
 * Sets the admin password.
 *
 * The password comes from the environment, so it never sits in the
 * repository. Payload hashes the value on save.
 *
 * Usage: bun scripts/set-admin-password.ts
 */
import "./load-env";

import { getPayload } from "payload";

import config from "../src/payload.config";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!email || !password) {
  console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD, then run this again.");
  process.exit(1);
}

const payload = await getPayload({ config });

const users = await payload.find({
  collection: "users",
  where: { email: { equals: email } },
  limit: 1,
});

const user = users.docs[0];
if (!user) {
  console.error(`No user with the email ${email}.`);
  process.exit(1);
}

await payload.update({
  collection: "users",
  id: user.id,
  data: { password },
});

console.log(`password updated for ${email}`);

process.exit(0);
