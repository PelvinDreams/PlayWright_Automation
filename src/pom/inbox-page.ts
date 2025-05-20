import { Page } from "@playwright/test"

export class InboxPage {
  constructor(private readonly page: Page) {}

  private readonly inboxSelector = ".inbox-list"
  private readonly unreadEmailSelector = ".email-item.unread"
  private readonly emailContentSelector = ".email-content"

  async hasUnreadEmails(): Promise<boolean> {
    await this.page.waitForSelector(this.inboxSelector, { timeout: 10000 })
    const unreadEmails = await this.page.$$(this.unreadEmailSelector)
    return unreadEmails.length > 0
  }

  async readFirstUnreadEmail(): Promise<string> {
    const firstUnreadEmail = await this.page.$(this.unreadEmailSelector)
    if (!firstUnreadEmail) throw new Error("No unread emails found.")

    await firstUnreadEmail.scrollIntoViewIfNeeded()
    await firstUnreadEmail.click()

    await this.page.waitForSelector(this.emailContentSelector, { timeout: 10000 })
    const content = await this.page.textContent(this.emailContentSelector)
    return content?.trim() ?? ""
  }
}
