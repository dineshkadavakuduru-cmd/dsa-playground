import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORT ?? 3000);
const useProdServer = process.env.TEST_SERVER === "prod";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  // Headless Chromium shares one SwiftShader GL context pool. Running several
  // WebGL-heavy pages at once made `page` setup time out intermittently, so the
  // suite runs single-worker (still fully parallel within a file).
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  expect: { timeout: 10_000 },
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    command: useProdServer ? `npx next start -p ${port}` : `npm run dev -- --port ${port}`,
    url: `http://localhost:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
