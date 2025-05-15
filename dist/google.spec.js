"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const GooglePage_1 = require("./GooglePage");
(0, test_1.test)('Search in Google', async ({ page }) => {
    const googlePage = new GooglePage_1.GooglePage(page);
    await googlePage.navigateTo();
    await googlePage.search('Playwright Testing');
    // Verify that the search results page is displayed
    await (0, test_1.expect)(page).toHaveURL(/search/);
});
