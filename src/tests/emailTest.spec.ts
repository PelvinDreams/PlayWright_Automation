import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/LoginPage";
import { checkForUnreadEmails, getEmailContent } from "../utils/emailHelper";

const loginUrl = "https://mail.timeweb.com/mailbox/";
const salesEmail = "sales@foxeld.com";
const salesPassword = "Password@1";
const expectedContent = "This is a test email content"; 

test("Verify email content in mailbox", async ({ page }) => {
  const loginPage = new LoginPage(page);


  await page.goto(loginUrl);


  await loginPage.login(salesEmail, salesPassword);


  const hasUnreadEmails = await checkForUnreadEmails(page);
  expect(hasUnreadEmails).toBeTruthy();


  const emailContent = await getEmailContent(page);


  expect(emailContent).toContain(expectedContent);
});
