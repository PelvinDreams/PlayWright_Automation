import { test } from '@playwright/test';
import { GooglePage } from './GooglePage';

test('Search in Google', async ({ page }) => {
  const google = new GooglePage(page);
  await google.navigateTo();  
  await google.search('Playwright Testing');
});


