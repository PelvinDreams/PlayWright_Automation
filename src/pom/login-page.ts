import { Page, expect } from "@playwright/test";

export class LoginPage {
  constructor(private readonly page: Page) {}

  private readonly emailInput = 'input[formcontrolname="login"]';
  private readonly passwordInput = 'input[formcontrolname="password"]';
  private readonly loginButton = 'button[type="submit"]';
  private readonly inboxSelector = 'div[class*="letters-list__container"]';

  async login(email: string, password: string): Promise<void> {
    // Wait for full page load
    await this.page.waitForLoadState("load");

    // Wait for and fill in email field
    const emailField = this.page.locator(this.emailInput);
    await expect(emailField).toBeVisible({ timeout: 15000 });
    await emailField.fill(email);

    // Wait for and fill in password field
    const passwordField = this.page.locator(this.passwordInput);
    await expect(passwordField).toBeVisible({ timeout: 15000 });
    await passwordField.fill(password);

    // Click the login button
    const loginBtn = this.page.locator(this.loginButton);
    await expect(loginBtn).toBeVisible({ timeout: 10000 });
    await loginBtn.click();

    
    await Promise.race([
      this.page.waitForURL(/\/mailbox(\/)?$/, { timeout: 15000 }),
      this.page.locator(this.inboxSelector).waitFor({ state: "visible", timeout: 15000 }),
    ]);
  }
}
