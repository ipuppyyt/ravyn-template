#!/usr/bin/env node

const { spawn } = require("child_process");
const waitOn = require("wait-on");
const { version } = require("../../../package.json");

// Start Vite dev server
const vite = spawn("vite", [], {
  stdio: "inherit",
  shell: true,
});

vite.on("error", (err) => {
  console.error("Failed to start Vite:", err);
  process.exit(1);
});

// Wait for Vite server to be ready
waitOn({
  resources: ["http://localhost:8181"],
  timeout: 30000,
})
  .then(() => {
    // Start Electron after Vite is ready
    const electron = spawn("electron", ["."], {
      env: { ...process.env, NODE_ENV: "development" },
      stdio: "inherit",
      shell: true,
    });

    electron.on("spawn", () => {
      console.clear();
      console.log("\x1b[36m%s\x1b[0m", `🚀  RAVYN ${version}`);
      console.log("\x1b[36m%s\x1b[0m", "🛠   Mode: Development");
      console.log("\x1b[36m%s\x1b[0m", "🔥  Hot Reload: Enabled\n");
    });

    electron.on("close", (code) => {
      if (code !== 0) {
        console.clear();
        console.error("\x1b[31m%s\x1b[0m", `💀  Ravyn ${version}`);
        console.error("\x1b[31m%s\x1b[0m", `💀  App Terminated`);
        process.exit();
      }
    });

    electron.on("error", (err) => {
      console.error("Failed to start Electron:", err);
      process.exit(1);
    });

    // Cleanup when processes exit
    const cleanup = () => {
      vite.kill();
      electron.kill();
    };

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("exit", cleanup);
  })
  .catch((err) => {
    console.error("Error waiting for Vite:", err);
    vite.kill();
    process.exit(1);
  });
