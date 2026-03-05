import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{ts,tsx}",
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      on("task", {
        writeJsonReport({ filename, data }: { filename: string; data: unknown }) {
          const reportsDir = path.join(__dirname, "cypress", "reports");
          if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
          }

          const filePath = path.join(reportsDir, filename);
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
          return null;
        },
      });

      return config;
    },
  },
});
