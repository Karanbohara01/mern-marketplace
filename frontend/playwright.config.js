import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "http://localhost:5173", // Set this to match your frontend server
    headless: true, // Run tests in headless mode
    screenshot: "on", // Capture screenshots on test failure
    trace: "on", // Enable tracing to debug test failures
  },
  testDir: "./tests", // Specify the directory where your test files are located
});
