import { Page } from "@playwright/test";

export async function checkForUnreadEmails(page: Page): Promise<boolean> {
  try {
    await page.waitForSelector(".inbox-list", { timeout: 10000 });
    const unreadEmails = await page.$$(".email-item.unread");
    return unreadEmails.length > 0;
  } catch (error) {
    console.error("Error checking for unread emails:", error);
    return false;
  }
}

export async function getEmailContent(page: Page): Promise<string> {
  try {
    const firstUnreadEmail = await page.$(".email-item.unread");
    if (!firstUnreadEmail) {
      console.log("No unread emails found.");
      return "";
    }

    await firstUnreadEmail.click();
    await page.waitForSelector(".email-content", { timeout: 10000 });

    const emailContent = await page.textContent(".email-content");
    return emailContent ? emailContent.trim() : "";
  } catch (error) {
    console.error("Error fetching email content:", error);
    return "";
  }
}
