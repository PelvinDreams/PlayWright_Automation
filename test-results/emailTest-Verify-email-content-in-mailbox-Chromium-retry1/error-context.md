# Test info

- Name: Verify email content in mailbox
- Location: C:\Users\user\Desktop\PlayWright_Automation\src\tests\emailTest.spec.ts:10:5

# Error details

```
Error: page.fill: Test timeout of 60000ms exceeded.
Call log:
  - waiting for locator('input[name="email"]')

    at LoginPage.login (C:\Users\user\Desktop\PlayWright_Automation\src\pom\LoginPage.ts:20:21)
    at C:\Users\user\Desktop\PlayWright_Automation\src\tests\emailTest.spec.ts:17:19
```

# Page snapshot

```yaml
- img
```

# Test source

```ts
   1 | import { Page } from "@playwright/test";
   2 |
   3 | export class LoginPage {
   4 |   private page: Page;
   5 |   private emailInput = 'input[name="email"]';
   6 |   private passwordInput = 'input[name="password"]';
   7 |   private loginButton = 'button[type="submit"]';
   8 |   private inboxSelector = 'div[class*="inbox"]';
   9 |
  10 |   constructor(page: Page) {
  11 |     this.page = page;
  12 |   }
  13 |
  14 |   async navigate() {
  15 |     await this.page.goto("/");
  16 |   }
  17 |
  18 |   async login(email: string, password: string) {
  19 |     console.log(`Logging in with email: ${email}`);
> 20 |     await this.page.fill(this.emailInput, email);
     |                     ^ Error: page.fill: Test timeout of 60000ms exceeded.
  21 |     await this.page.fill(this.passwordInput, password);
  22 |     await this.page.click(this.loginButton);
  23 |
  24 |     // Wait for the inbox to be visible after login
  25 |     await this.page.waitForSelector(this.inboxSelector, { timeout: 10000 });
  26 |   }
  27 | }
  28 |
```