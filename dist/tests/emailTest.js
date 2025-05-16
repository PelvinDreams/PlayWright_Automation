"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const LoginPage_1 = require("../pom/LoginPage");
const emailHelper_1 = require("../utils/emailHelper");
const loginUrl = "https://mail.timeweb.com/mailbox/";
const salesEmail = "sales@foxeld.com";
const salesPassword = "Password@1";
const expectedContent = "This is a test email content"; // Adjust this to match the actual content
(0, test_1.test)("Verify email content in mailbox", async ({ page }) => {
    const loginPage = new LoginPage_1.LoginPage(page);
    // 1. Opens the page
    await page.goto(loginUrl);
    // 2. Logins into mailbox
    await loginPage.login(salesEmail, salesPassword);
    // 3. Checks whether we have unread emails
    const hasUnreadEmails = await (0, emailHelper_1.checkForUnreadEmails)(page);
    (0, test_1.expect)(hasUnreadEmails).toBeTruthy();
    // 4. If we have one, it parses the text content from that email
    const emailContent = await (0, emailHelper_1.getEmailContent)(page);
    // 5. Then we asserting that text content matches with one which sent from other mail.
    (0, test_1.expect)(emailContent).toContain(expectedContent);
});
