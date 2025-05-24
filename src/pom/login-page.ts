import { Page } from "@playwright/test"

export class LoginPage {
  constructor(private readonly page: Page) {}

  private readonly emailInput = 'input[formcontrolname="login"]'
  private readonly passwordInput = 'input[formcontrolname="password"]'
  private readonly loginButton = 'button[type="submit"]'
  private readonly inboxSelector = 'div[class*="letters-list__container"]'

  async login(email: string, password: string): Promise<void> {
    await this.page.waitForLoadState('load')

    // Fill in email
    const emailField = this.page.locator(this.emailInput)
    await emailField.waitFor({ state: 'visible', timeout: 15000 })
    await emailField.fill(email)

    // Fill in password
    const passwordField = this.page.locator(this.passwordInput)
    await passwordField.waitFor({ state: 'visible', timeout: 15000 })
    await passwordField.fill(password)

    // Click login button
    await this.page.locator(this.loginButton).click()

    // Wait for either URL change or inbox visibility
    await Promise.race([
      this.page.waitForURL(/\/mailbox\/$/, { timeout: 15000 }),
      this.page.locator(this.inboxSelector).waitFor({ state: 'visible', timeout: 15000 }),
    ])
  }
}
