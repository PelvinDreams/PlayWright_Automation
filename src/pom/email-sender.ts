import { Page, expect } from "@playwright/test";

export class SupportMailbox {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://mail.timeweb.com", { waitUntil: "load", timeout: 20000 });
    await this.page.waitForLoadState("domcontentloaded");
  }

  async login(email: string, password: string) {
    await this.page.waitForSelector('input[type="text"]', { timeout: 10000 });
    await this.page.fill('input[type="text"]', email);

    await this.page.waitForSelector('input[type="password"]', { timeout: 10000 });
    await this.page.fill('input[type="password"]', password);

    const loginButton = this.page.locator('button:has-text("Login")'); // More robust than getByRole
    await expect(loginButton).toBeVisible({ timeout: 10000 });
    await loginButton.click();

    await this.page.waitForURL("**/mailbox/**", { timeout: 20000 });
  }

  async sendEmail(to: string, message: string) {
    // Wait for Compose button and click
    const composeButton = this.page.locator(".wm-button.wm-button--primary.inverse.ml");
    await expect(composeButton).toBeVisible({ timeout: 15000 });
    await composeButton.click();

    // Fill recipient field
    const recipientInput = this.page.locator('input[placeholder*="To"]'); // more stable than ng-* classes
    await expect(recipientInput).toBeVisible({ timeout: 10000 });
    await recipientInput.fill(to);

    // Fill message in iframe
    const editorFrame = this.page.frameLocator("#mce_2_ifr");
    await editorFrame.locator("body#tinymce").waitFor({ state: "visible" });
    await editorFrame.locator("body#tinymce").fill(message);

    // Send email
    const sendButton = this.page.locator(".wm-button.wm-button--submit.wm-button--primary");
    await expect(sendButton).toBeVisible({ timeout: 10000 });
    await sendButton.click();
  }
}
