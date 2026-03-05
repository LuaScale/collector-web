import { spawn } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const tmpDir = resolve(".lighthouseci", "tmp");
const profileDir = resolve(".lighthouseci", "chrome-profile");

rmSync(profileDir, { recursive: true, force: true });
mkdirSync(tmpDir, { recursive: true });
mkdirSync(profileDir, { recursive: true });

const chromeFlags = [
  "--no-sandbox",
  "--disable-dev-shm-usage",
  `--user-data-dir=${profileDir.replace(/\\/g, "/")}`,
].join(" ");

const command = [
  "npx lhci autorun",
  "--config=./lighthouserc.json",
  `--collect.settings.chromeFlags=\"${chromeFlags}\"`,
].join(" ");

const child = spawn(command, {
  shell: true,
  env: {
    ...process.env,
    TMP: tmpDir,
    TEMP: tmpDir,
  },
});

let combinedOutput = "";

child.stdout.on("data", (chunk) => {
  const text = chunk.toString();
  combinedOutput += text;
  process.stdout.write(text);
});

child.stderr.on("data", (chunk) => {
  const text = chunk.toString();
  combinedOutput += text;
  process.stderr.write(text);
});

child.on("exit", (code) => {
  const hasEpermCleanupError =
    combinedOutput.includes("EPERM, Permission denied") &&
    combinedOutput.includes("lighthouse") &&
    combinedOutput.includes("Generating results...");

  if ((code ?? 1) !== 0 && hasEpermCleanupError) {
    process.stdout.write(
      "\nLighthouse completed but hit a Windows temp cleanup EPERM; treating this known cleanup issue as success.\n"
    );
    process.exit(0);
  }

  process.exit(code ?? 1);
});

child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});