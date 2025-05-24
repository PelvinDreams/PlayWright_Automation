import { Page } from "@playwright/test"

export class EmailReader {
  constructor(private readonly page: Page) {}

  private readonly unreadEmailSelector = 'div:has-text("Unread")' // customize
  private readonly emailContentSelector = 'div.email-body' // customize this too

  async hasUnreadEmail(): Promise<boolean> {
    return this.page.locator(this.unreadEmailSelector).isVisible().catch(() => false)
  }

  async getEmailContent(): Promise<string> {
    const content = await this.page.locator(this.emailContentSelector).innerText()
    return content.trim()
  }

  /**
   * Returns the latest email's subject and body.
   */
  async getLatestEmail(): Promise<{ subject: string; body: string }> {
    await this.page.waitForSelector(this.unreadEmailSelector, { timeout: 15000 })
    const firstUnread = await this.page.locator(this.unreadEmailSelector).first()
    await firstUnread.click()
    await this.page.waitForSelector(this.emailContentSelector, { timeout: 10000 })
    // Try to get subject from common selectors
    let subject = ''
    if (await this.page.locator('h1').first().isVisible().catch(() => false)) {
      subject = (await this.page.locator('h1').first().textContent())?.trim() ?? ''
    } else if (await this.page.locator('.email-subject').first().isVisible().catch(() => false)) {
      subject = (await this.page.locator('.email-subject').first().textContent())?.trim() ?? ''
    }
    const body = (await this.page.locator(this.emailContentSelector).first().textContent())?.trim() ?? ''
    return { subject, body }
  }
}
