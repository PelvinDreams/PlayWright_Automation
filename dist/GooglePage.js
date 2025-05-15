"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePage = void 0;
class GooglePage {
    page;
    searchInput = 'input[name="q"]';
    constructor(page) {
        this.page = page;
    }
    async navigateTo() {
        await this.page.goto('https://www.google.com');
    }
    async search(term) {
        await this.page.fill(this.searchInput, term);
        await this.page.keyboard.press('Enter');
    }
}
exports.GooglePage = GooglePage;
