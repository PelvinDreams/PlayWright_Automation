import { test, expect, chromium } from "@playwright/test";

function generateText(length: number): string {
  const words = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur",
    "adipiscing", "elit", "sed", "do", "eiusmod", "tempor",
    "incididunt", "ut", "labore", "et", "dolore", "magna",
    "aliqua", "enim", "minim", "veniam",
  ];
  const result = Array.from({ length }, () => words[Math.floor(Math.random() * words.length)]);
  return result.join(" ");
}

test("Send email from support to sales via Timeweb Webmail", async () => {
  const supportEmail = "support@foxeld.com";
  const supportPassword = "Password@1";
  const recipientEmail = "sales@foxeld.com";
  const randomText = generateText(10);

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate and login
  await page.goto("https://mail.timeweb.com");
  console.log("✅ Navigated to Timeweb Webmail");

  await page.fill('input[type="text"]', supportEmail);
  await page.fill('input[type="password"]', supportPassword);
  await page.click('button[type="submit"]');
  console.log("✅ Logged in as support");

  await page.waitForTimeout(3000); // wait for UI to stabilize

  // Click Compose
  await page.waitForSelector(".wm-button.wm-button--primary.inverse.ml", { timeout: 10000 });
  await page.click(".wm-button.wm-button--primary.inverse.ml");
  console.log("✅ Compose window opened");

  // Fill recipient
  await page.waitForSelector(".ng-pristine.ng-valid.ng-touched", { timeout: 10000 });
  await page.fill(".ng-pristine.ng-valid.ng-touched", recipientEmail);

  // Wait for iframe & editor
  const editorFrameLocator = page.frameLocator("#mce_2_ifr");
  await editorFrameLocator.locator("body#tinymce").waitFor({ state: "visible", timeout: 10000 });
  await editorFrameLocator.locator("body#tinymce").fill(randomText);
  console.log("✅ Email body filled");

  // Send the email
  await page.click(".wm-button.wm-button--submit.wm-button--primary");
  console.log(`📤 Email sent to ${recipientEmail}: "${randomText}"`);

  await page.waitForTimeout(3000); // wait for potential toast or confirmation

  await browser.close();
});
