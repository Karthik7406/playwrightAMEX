import { Locator, Page, expect } from "@playwright/test";

export class HomePage {

    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate() {
        await this.page.goto("https://www.americanexpress.com/fr-fr/");
        console.log("waiting for timeout");
        await this.page.waitForTimeout(5000); // wait for 5 seconds for cookies to populate
    }

    getCookiesModal() {
        return this.page.locator("#user-consent-management-granular-banner-overlay>div");
    }

    getCookiesAcceptButton() {
        return this.page.locator("button[id='user-consent-management-granular-banner-accept-all-button']");
    }

    getCartesParticulars() {
        return this.page.getByRole('link', { name: 'Cartes Particuliers' });
    }

    getCartesPremium() {
        return this.page.getByRole('link', { name: 'Cartes Premium' });
    }

    getCartesTPE() {
        return this.page.getByRole('link', { name: 'Cartes TPE/PME' });
    }

    getCartesCorporate() {
        return this.page.getByRole('main').getByRole('link', { name: 'Cartes Corporate' });
    }

    async validateCookies() {
        let cookieModalEnabled = await this.getCookiesModal().isEnabled();
        if (cookieModalEnabled) {
            // accept all cookies
            await this.getCookiesAcceptButton().click();
        }
    }

    async checkAllCardsVisibility() {
            await expect(this.getCartesParticulars()).toBeVisible();
            await expect(this.getCartesPremium()).toBeVisible();
            await expect(this.getCartesTPE()).toBeVisible();
            await expect(this.getCartesCorporate()).toBeVisible();
    }



}