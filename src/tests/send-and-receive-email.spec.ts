import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/login-page";
import { EmailSender } from "../pom/email-sender";
import { checkForUnreadEmails, getEmailContent } from "../utils/email-helper";

const loginUrl = "https://mail.timeweb.com/mailbox/";
const senderEmail = "sales@foxeld.com";
const senderPassword = "Password@1";
const recipientEmail = "support@foxeld.com";
const recipientPassword = "Password@2";

const subject = "Test Email Subject";
const body = "This is a test email content";

test("Send email from sales to support and verify receipt", async ({
  page,
}) => {
  // LOGIN as sender
  const senderLogin = new LoginPage(page);
  await page.goto(loginUrl);
  await senderLogin.login(senderEmail, senderPassword);

  // SEND email
  const emailSender = new EmailSender(page);
  await emailSender.sendEmail(recipientEmail, subject, body);

  // LOG OUT (or open new context) – You may need to implement logout if same session
  await page.context().clearCookies();
  await page.reload();

  // LOGIN as recipient
  const recipientLogin = new LoginPage(page);
  await page.goto(loginUrl);
  await recipientLogin.login(recipientEmail, recipientPassword);

  // VERIFY receipt
  const hasUnread = await checkForUnreadEmails(page);
  expect(hasUnread).toBeTruthy();

  const content = await getEmailContent(page);
  expect(content).toContain(body);
});
