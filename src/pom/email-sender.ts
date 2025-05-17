import { Page } from "@playwright/test";

export class EmailSender {
  private page: Page;

  private composeButton = 'button:has-text("Compose")';
  private toInput = 'input[name="to"]';
  private subjectInput = 'input[name="subject"]';
  private bodyTextarea = 'textarea[name="body"]';
  private sendButton = 'button:has-text("Send")';
  private confirmationText = "text=Message sent"; // Adjust based on actual UI

  constructor(page: Page) {
    this.page = page;
  }

  async sendEmail(to: string, subject: string, body: string) {
    console.log(`Sending email to ${to} with subject "${subject}"`);

    await this.page.waitForSelector(this.composeButton, { timeout: 10000 });
    await this.page.click(this.composeButton);

    await this.page.fill(this.toInput, to);
    await this.page.fill(this.subjectInput, subject);
    await this.page.fill(this.bodyTextarea, body);

    await this.page.click(this.sendButton);
    await this.page.waitForSelector(this.confirmationText, { timeout: 5000 });
  }
}
