import { Page } from "@playwright/test";

export class LoginPage {
  private page: Page;
  private emailInput = '#login';
  private passwordInput = '#password';
  private loginButton = 'button[type="submit"]';
  private inboxSelector = 'div[class*="inbox"]';

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/");
  }

  async login(email: string, password: string) {
    console.log(`Logging in with email: ${email}`);
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);

   
    await this.page.waitForSelector(this.inboxSelector, { timeout: 10000 });
  }
}
