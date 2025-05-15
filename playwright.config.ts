import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,
  use: {
    headless: false, // Change to true to run without a browser window
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
