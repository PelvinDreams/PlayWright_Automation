"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkForUnreadEmails = checkForUnreadEmails;
exports.getEmailContent = getEmailContent;
async function checkForUnreadEmails(page) {
    try {
        // Wait for the inbox to load
        await page.waitForSelector(".inbox-list", { timeout: 10000 });
        // Check for unread emails (assuming unread emails have a specific class or indicator)
        const unreadEmails = await page.$$(".email-item.unread");
        return unreadEmails.length > 0;
    }
    catch (error) {
        console.error("Error checking for unread emails:", error);
        return false;
    }
}
async function getEmailContent(page) {
    try {
        // Click the first unread email
        const firstUnreadEmail = await page.$(".email-item.unread");
        if (!firstUnreadEmail) {
            console.log("No unread emails found.");
            return "";
        }
        await firstUnreadEmail.click();
        // Wait for the email content to load
        await page.waitForSelector(".email-content", { timeout: 10000 });
        // Extract the text content
        const emailContent = await page.textContent(".email-content");
        return emailContent ? emailContent.trim() : "";
    }
    catch (error) {
        console.error("Error fetching email content:", error);
        return "";
    }
}
