import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./src/tests",
  timeout: 60000,
  retries: 1,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: "https://mail.timeweb.com/mailbox/",
  },
  projects: [{ name: "Chromium", use: { browserName: "chromium" } }],
})
