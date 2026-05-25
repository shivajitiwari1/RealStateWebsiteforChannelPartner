import { createInterface } from "readline";
import bcrypt from "bcryptjs";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_PATH = join(__dirname, "..", "data", "admin.json");

const rl = createInterface({ input: process.stdin, output: process.stdout });

rl.question("Enter admin password: ", async (password) => {
  if (!password || password.length < 6) {
    console.error("Password must be at least 6 characters.");
    rl.close();
    process.exit(1);
  }

  const hash = await bcrypt.hash(password, 10);
  const config = JSON.parse(readFileSync(DATA_PATH, "utf-8"));
  config.passwordHash = hash;
  writeFileSync(DATA_PATH, JSON.stringify(config, null, 2), "utf-8");

  console.log("✅ Admin password set successfully. You can now log in at /admin/login");
  rl.close();
});
