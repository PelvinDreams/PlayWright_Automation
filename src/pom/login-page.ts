import { Page } from "@playwright/test";

export class LoginPage {
  private page: Page;

  // ✅ Update selectors based on real page structure
  private emailInput = 'input[name="login"]'; // Replace if actual selector is different
  private passwordInput = 'input[name="password"]'; // Check if #password is valid; adjust if needed
  private loginButton = 'button[type="submit"]';
  private inboxSelector = 'div[class*="inbox"]'; // Update if inbox structure differs

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/");
  }

  async login(email: string, password: string) {
    console.log(`Logging in with email: ${email}`);

    // Wait for email field to appear
    await this.page.waitForSelector(this.emailInput, { timeout: 15000 });
    await this.page.fill(this.emailInput, email);

    // Wait for password field to appear
    await this.page.waitForSelector(this.passwordInput, { timeout: 10000 });
    await this.page.fill(this.passwordInput, password);

    // Wait and click the login button
    await this.page.waitForSelector(this.loginButton, { timeout: 10000 });
    await this.page.click(this.loginButton);

    // Wait for inbox page after login
    await this.page.waitForSelector(this.inboxSelector, { timeout: 15000 });
  }
}
