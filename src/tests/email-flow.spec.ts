import { test, expect } from "@playwright/test";
import { SupportMailbox } from "../pom/email-sender";
import { SalesMailbox } from "../pom/inbox-page"; // adjust if SalesMailbox is elsewhere
import { generateText } from "../utils/generateText";

test("Send email from Support to Sales and verify receipt", async ({ browser }) => {
  const supportEmail = "support@foxeld.com";
  const supportPassword = "Password@1";
  const salesEmail = "sales@foxeld.com";
  const salesPassword = "Password@1";
  const message = generateText(10); // Random message for uniqueness

  console.log("Launching support browser context...");
  const supportContext = await browser.newContext();
  const supportPage = await supportContext.newPage();
  const supportMailbox = new SupportMailbox(supportPage);

  console.log("Support logging in and sending email...");
  await supportMailbox.goto();
  await supportMailbox.login(supportEmail, supportPassword);
  await supportMailbox.sendEmail(salesEmail, message);
  await supportContext.close();

  console.log("Launching sales browser context...");
  const salesContext = await browser.newContext();
  const salesPage = await salesContext.newPage();
  const salesMailbox = new SalesMailbox(salesPage);

  console.log("Sales logging in and reading email...");
  await salesMailbox.goto();
  await salesMailbox.login(salesEmail, salesPassword);
  const emailContent = await salesMailbox.getLatestEmailContent();

  console.log("Verifying email content...");
  expect(emailContent).toContain(message);

  await salesContext.close();
});
