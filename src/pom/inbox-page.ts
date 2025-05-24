import { Page } from "@playwright/test";

export class SalesMailbox {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto("https://mail.timeweb.com/mailbox/");
  }

  async login(email: string, password: string) {
    await this.page.getByPlaceholder("E-mail").fill(email);
    await this.page.getByPlaceholder("Password").fill(password);
    await this.page.getByRole("button", { name: "Login" }).click();
    await this.page.waitForURL("**/mailbox/");
  }

  async getLatestEmailContent(): Promise<string> {
    // Wait for inbox to load
    await this.page.waitForSelector('[data-testid="message-subject"]', { timeout: 15000 });

    // Open latest email
    await this.page.locator('[data-testid="message-subject"]').first().click();

    // Wait for email body and return its text
    const bodyLocator = this.page.locator('[data-testid="message-body"], [contenteditable="true"]');
    await bodyLocator.waitFor({ timeout: 10000 });
    return bodyLocator.textContent();
  }
}
