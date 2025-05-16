"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginPage = void 0;
class LoginPage {
    page;
    emailInput;
    passwordInput;
    loginButton;
    constructor(page) {
        this.page = page;
        this.emailInput = this.page.locator('input[name="login"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.loginButton = this.page.locator('button[type="submit"]');
    }
    async navigateToLoginPage() {
        await this.page.goto("https://mail.timeweb.com/mailbox/");
    }
    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
    async isLoggedIn() {
        // Check if a specific element that appears after login is present
        return await this.page.locator('div[class*="mailbox"]').isVisible();
    }
}
exports.LoginPage = LoginPage;
