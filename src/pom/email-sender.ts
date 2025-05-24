// import { Page, expect } from "@playwright/test";
imp

export class SupportMailbox {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("https://mail.timeweb.com");
  }

  async login(email: string, password: string) {
    // Wait for visible input fields instead of placeholder
    await this.page.waitForSelector('input[type="text"]', { timeout: 10000 });
    await this.page.fill('input[type="text"]', email);
    await this.page.fill('input[type="password"]', password);

    await this.page.getByRole("button", { name: /login/i }).click(); // Case-insensitive match
    await this.page.waitForURL("**/mailbox/", { timeout: 15000 });
  }

  async sendEmail(to: string, message: string) {
    await this.page.waitForSelector(".wm-button.wm-button--primary.inverse.ml", { timeout: 10000 });
    await this.page.click(".wm-button.wm-button--primary.inverse.ml");

    await this.page.waitForSelector(".ng-pristine.ng-valid.ng-touched", { timeout: 10000 });
    await this.page.fill(".ng-pristine.ng-valid.ng-touched", to);

    const editorFrame = this.page.frameLocator("#mce_2_ifr");
    await editorFrame.locator("body#tinymce").waitFor({ state: "visible" });
    await editorFrame.locator("body#tinymce").fill(message);

    await this.page.click(".wm-button.wm-button--submit.wm-button--primary");
  }
}
