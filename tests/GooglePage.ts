import { Page } from '@playwright/test';

export class GooglePage {
  readonly page: Page;
  readonly searchInput = 'input[title="Search"]'; 

  constructor(page: Page) {
    this.page = page;
  }

 async navigateTo() {
  await this.page.goto('https://www.google.com', { waitUntil: 'networkidle' });

  const acceptButton = this.page.locator('button:has-text("I agree"), button:has-text("Accept all")');
  if (await acceptButton.isVisible()) {
    await acceptButton.click();
  }

  await this.page.waitForSelector(this.searchInput, { state: 'visible', timeout: 10000 });
}


  async search(term: string) {
    await this.page.fill(this.searchInput, term);
    await this.page.keyboard.press('Enter');
  }
}
