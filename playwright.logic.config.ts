import { defineConfig } from "@playwright/test";

// Server-free / browser-free config for pure algorithm regression tests.
// No webServer: specs matched here must not use the `page` fixture.
export default defineConfig({
  testDir: "./tests",
  testMatch: [
    "**/structures-logic.spec.ts",
    "**/edge-cases-logic.spec.ts",
    "**/stage-isolation.spec.ts",
  ],
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: "list",
});
