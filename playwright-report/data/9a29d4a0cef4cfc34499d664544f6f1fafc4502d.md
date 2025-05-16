# Test info

- Name: Verify email content in mailbox
- Location: C:\Users\user\Desktop\PlayWright_Automation\src\tests\emailTest.spec.ts:10:5

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Users\user\AppData\Local\ms-playwright\firefox-1482\firefox\firefox.exe
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | import { test, expect } from "@playwright/test";
   2 | import { LoginPage } from "../pom/LoginPage";
   3 | import { checkForUnreadEmails, getEmailContent } from "../utils/emailHelper";
   4 |
   5 | const loginUrl = "https://mail.timeweb.com/mailbox/";
   6 | const salesEmail = "sales@foxeld.com";
   7 | const salesPassword = "Password@1";
   8 | const expectedContent = "This is a test email content"; // Adjust this to match the actual content
   9 |
> 10 | test("Verify email content in mailbox", async ({ page }) => {
     |     ^ Error: browserType.launch: Executable doesn't exist at C:\Users\user\AppData\Local\ms-playwright\firefox-1482\firefox\firefox.exe
  11 |   const loginPage = new LoginPage(page);
  12 |
  13 |   // 1. Opens the page
  14 |   await page.goto(loginUrl);
  15 |
  16 |   // 2. Logins into mailbox
  17 |   await loginPage.login(salesEmail, salesPassword);
  18 |
  19 |   // 3. Checks whether we have unread emails
  20 |   const hasUnreadEmails = await checkForUnreadEmails(page);
  21 |   expect(hasUnreadEmails).toBeTruthy();
  22 |
  23 |   // 4. If we have one, it parses the text content from that email
  24 |   const emailContent = await getEmailContent(page);
  25 |
  26 |   // 5. Then we asserting that text content matches with one which sent from other mail.
  27 |   expect(emailContent).toContain(expectedContent);
  28 | });
  29 |
```