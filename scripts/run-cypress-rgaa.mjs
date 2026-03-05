import { spawn } from "node:child_process";

const isWindows = process.platform === "win32";

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForServer(url, timeoutMs = 120000) {
  const startedAt = Date.now();

  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url, { method: "GET" });
      if (response.ok) {
        return;
      }
    } catch {
      // ignore until timeout
    }

    await wait(1000);
  }

  throw new Error(`Server did not become ready in time: ${url}`);
}

function spawnCommand(command, options = {}) {
  return spawn(command, {
    stdio: "inherit",
    shell: true,
    windowsHide: true,
    ...options,
  });
}

async function run() {
  let devProcess = null;

  try {
    let serverReady = false;
    try {
      await waitForServer("http://localhost:3000", 3000);
      serverReady = true;
    } catch {
      serverReady = false;
    }

    if (!serverReady) {
      devProcess = spawnCommand("npm run dev:webpack");
      await waitForServer("http://localhost:3000");
    }

    const cypressExitCode = await new Promise((resolve) => {
      const cypressProcess = spawnCommand("npm run test:rgaa");

      cypressProcess.on("close", (code) => {
        resolve(code ?? 1);
      });
    });

    process.exitCode = cypressExitCode;
  } finally {
    if (isWindows && devProcess?.pid) {
      await new Promise((resolve) => {
        const killer = spawn("taskkill", ["/PID", String(devProcess.pid), "/T", "/F"], {
          stdio: "ignore",
          shell: false,
        });
        killer.on("close", () => resolve());
        killer.on("error", () => resolve());
      });
    } else if (devProcess) {
      devProcess.kill("SIGTERM");
    }
  }
}

try {
  await run();
} catch (error) {
  console.error(error);
  process.exit(1);
}
