import { Page } from "@playwright/test"

export class LoginPage {
  private page: Page

  private welcomeButton = 'button:has-text("Вход в Timeweb Mail")'
  private emailInput = 'input[name="login"]'
  private passwordInput = 'input[name="password"]'
  private loginButton = 'button[type="submit"]'
  private inboxSelector = 'div[class*="inbox"]'

  constructor(page: Page) {
    this.page = page
  }

  async navigate() {
    await this.page.goto("https://mail.timeweb.com/mailbox/")
  }

  async login(email: string, password: string) {
    console.log(`Logging in with email: ${email}`)

    const welcomeVisible = await this.page.isVisible(this.welcomeButton)

    if (welcomeVisible) {
      await this.page.click(this.welcomeButton)
    }

    await this.page.waitForSelector(this.emailInput, { timeout: 15000 })
    await this.page.fill(this.emailInput, email)

    await this.page.waitForSelector(this.passwordInput, { timeout: 10000 })
    await this.page.fill(this.passwordInput, password)

    await this.page.waitForSelector(this.loginButton, { timeout: 10000 })
    await this.page.click(this.loginButton)

    await this.page.waitForSelector(this.inboxSelector, { timeout: 15000 })
  }
}
