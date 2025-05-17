import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/login-page";
import { checkForUnreadEmails, getEmailContent } from "../utils/email-helper";

const loginUrl = "https://mail.timeweb.com/mailbox/";
const salesEmail = "sales@foxeld.com";
const salesPassword = "Password@1";
const expectedContent = "This is a test email content";

test("Verify email content in mailbox", async ({ page }) => {
  const loginPage = new LoginPage(page);

  console.log("Navigating to login URL...");
  await page.goto(loginUrl);

  console.log("Logging in...");
  await loginPage.login(salesEmail, salesPassword);

  console.log("Checking for unread emails...");
  const hasUnreadEmails = await checkForUnreadEmails(page);
  expect(hasUnreadEmails).toBeTruthy();

  console.log("Reading email content...");
  const emailContent = await getEmailContent(page);

  console.log("Validating email content...");
  expect(emailContent).toContain(expectedContent);
});
