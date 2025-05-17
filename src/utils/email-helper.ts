import { Page } from "@playwright/test";

const INBOX_SELECTOR = ".inbox-list";
const UNREAD_EMAIL_SELECTOR = ".email-item.unread";
const EMAIL_CONTENT_SELECTOR = ".email-content";

export async function checkForUnreadEmails(page: Page): Promise<boolean> {
  try {
    await page.waitForSelector(INBOX_SELECTOR, { timeout: 10000 });

    const unreadEmails = await page.$$(UNREAD_EMAIL_SELECTOR);
    console.log(`Found ${unreadEmails.length} unread email(s).`);
    return unreadEmails.length > 0;
  } catch (error) {
    console.error("Error checking for unread emails:", error);
    return false;
  }
}

export async function getEmailContent(page: Page): Promise<string> {
  try {
    const firstUnreadEmail = await page.$(UNREAD_EMAIL_SELECTOR);
    if (!firstUnreadEmail) {
      console.log("No unread emails found.");
      return "";
    }

    await firstUnreadEmail.scrollIntoViewIfNeeded();
    await firstUnreadEmail.click();

    await page.waitForSelector(EMAIL_CONTENT_SELECTOR, { timeout: 10000 });

    const emailContent = await page.textContent(EMAIL_CONTENT_SELECTOR);
    return emailContent ? emailContent.trim() : "";
  } catch (error) {
    console.error("Error fetching email content:", error);
    return "";
  }
}
