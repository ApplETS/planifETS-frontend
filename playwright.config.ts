import { defineConfig, devices } from '@playwright/test';

// Use process.env.PORT by default and fallback to port 3000
const PORT = process.env.PORT || 3000;

// Set webServer.url and use.baseURL with the location of the WebServer respecting the correct set port
const baseURL = `http://localhost:${PORT}`;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  // Look for files with the .spec.js or .e2e.js extension
  testMatch: '*.@(spec|e2e).?(c|m)[jt]s?(x)',
  // Timeout per test
  timeout: 60 * 1000,
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  // Reporter to use. See https://playwright.dev/docs/test-reporters
  reporter: process.env.CI ? 'github' : 'list',
  retries: process.env.CI ? 2 : 0,
  // Use more workers in CI
  workers: process.env.CI ? '100%' : undefined,
  // Limit failures in CI to fail fast
  maxFailures: process.env.CI ? 10 : undefined,
  // Enable fully parallel execution
  fullyParallel: true,
  expect: {
    // Set timeout for async expect matchers
    timeout: 30 * 1000,
  },

  // Run your local dev server before starting the tests:
  // https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
  webServer: {
    command: process.env.CI ? `yarn start -- -p ${PORT}` : 'yarn run dev',
    url: baseURL,
    timeout: 2 * 60 * 1000,
    reuseExistingServer: !process.env.CI,
  },

  // Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions.
  use: {
    // Use baseURL so to make navigations relative.
    // More information: https://playwright.dev/docs/api/class-testoptions#test-options-base-url
    baseURL,

    // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
    trace: process.env.CI ? 'on-first-retry' : undefined,

    // Record videos only on first retry to save time
    video: process.env.CI ? 'on-first-retry' : undefined,

    // Take screenshots only on failure
    screenshot: 'only-on-failure',

    // Reduce action timeout in CI for faster failure detection
    actionTimeout: process.env.CI ? 15 * 1000 : 0,

    // Increase navigation timeout slightly
    navigationTimeout: process.env.CI ? 30 * 1000 : 30 * 1000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // Run Firefox tests only locally, not in CI
    ...(!process.env.CI
      ? [{
        name: 'firefox',
        use: { ...devices['Desktop Firefox'] },
      }]
      : []),
  ],

});
