import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["json", { outputFile: "test-results/playwright-report.json" }],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  projects: [
    // QA Playground
    {
      name: "qa-playground-chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://www.qaplayground.com",
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
      },
      testMatch: /qa-playground/,
    },
    {
      name: "qa-playground-firefox",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: "https://www.qaplayground.com",
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
      },
      testMatch: /qa-playground/,
    },
    {
      name: "qa-playground-webkit",
      use: {
        ...devices["Desktop Safari"],
        baseURL: "https://www.qaplayground.com",
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
      },
      testMatch: /qa-playground/,
    },
    // Conduit UI
    {
      name: "conduit-ui-chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL: "https://demo.realworld.show",
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
      },
      testMatch: /conduit\/ui/,
    },
    {
      name: "conduit-ui-firefox",
      use: {
        ...devices["Desktop Firefox"],
        baseURL: "https://demo.realworld.show",
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
      },
      testMatch: /conduit\/ui/,
    },
    {
      name: "conduit-ui-webkit",
      use: {
        ...devices["Desktop Safari"],
        baseURL: "https://demo.realworld.show",
        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
      },
      testMatch: /conduit\/ui/,
    },
    // Conduit API
    {
      name: "conduit-api",
      use: {
        baseURL:
          process.env.CONDUIT_API_BASE_URL || "https://api.realworld.show/api/",
      },
      testMatch: /conduit\/api/,
    },
    // Conduit integration
    {
      name: "conduit-integration-chromium",
      use: {
        ...devices["Desktop Chrome"],
        baseURL:
          process.env.CONDUIT_UI_BASE_URL || "https://demo.realworld.show",
      },
      testMatch: /conduit\/integration/,
    },
    // Jsonplaceholder API
    {
      name: "jsonplaceholder-api",
      use: {
        baseURL:
          process.env.API_BASE_URL || "https://jsonplaceholder.typicode.com",
      },
      testMatch: /jsonplaceholder/,
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
