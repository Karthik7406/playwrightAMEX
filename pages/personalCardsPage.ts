import { Page, expect } from "@playwright/test";

import { HomePage } from "./homePage";

export class PersonalCardsPage extends HomePage {

    readonly page: Page;

    constructor(page: Page) {
        super(page);
        this.page = page;
    }

    getPersonalCards() {
        return this.page.getByRole('link', { name: 'Cartes Particuliers' })
    }

    getGoldCardTitle(row = 1) {
        return this.page.locator("//div[2]/div/div[2]/div[@data-qe-id='HorizontalCardTile']/div/div/div[2]/div[1]/div[2]/div/div[1]");
    }

    getCardDescription() {
        return this.page.locator("//div[2]/div/div[2]/div[@data-qe-id='HorizontalCardTile']/div/div/div[2]/div[1]/div[2]/div/div[2]")
    }

    getLearnMore() {
        return this.page.getByRole('link', { name: 'En savoir plus' }).nth(1);
    }

    async validateGoldExpressCard() {

        console.log("validating gold express card");
        await expect(this.page.getByText('Carte Gold American Express®').first()).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'Carte Gold American&nbsp;' })).toBeVisible();
        await expect(this.page.getByRole('link', { name: 'En savoir plus' }).nth(1)).toBeVisible();
        await expect(this.page.getByText('Bénéfices clés').nth(1)).toBeVisible();
        await expect(this.page.getByText('Cotisation Gratuite la 1ère')).toBeVisible();

        await expect(this.page.locator('main-container')).toContainText('Carte Gold American Express®');
        await expect(this.page.locator('main-container')).toContainText('Cotisation : 16 €/mois à partir de la 2ème année*Elle assure et vous rassure');
        await this.validateCardKeyBenefits();
    }

    async validateCardKeyBenefits() {

        console.log("validating key card benefits");
        await expect(this.page.getByText('Bénéfices clés').nth(1)).toBeVisible();
        await expect(this.page.getByText('Votre abonnement Amazon Prime').nth(1)).toBeVisible();

        await expect(this.page.locator('main-container')).toContainText('Points de fidélité et récompenses');
        await expect(this.page.locator('main-container')).toContainText('Offres de remboursement dans des centaines d’enseignes partenaires');
        await expect(this.page.locator('main-container')).toContainText('Assurances et Assistance Optimales dont la Protection des Achats pendant 90 jours');
        await expect(this.page.locator('main-container')).toContainText('Profitez des meilleures places réservées');
    }
}