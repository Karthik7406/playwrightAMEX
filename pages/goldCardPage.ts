import { Page, expect } from "@playwright/test";
import { PersonalCardsPage } from "./personalCardsPage";

export type FormData = {
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    email: string,
    phoneNumber: number | string
}

export class GoldCardPage extends PersonalCardsPage {

    readonly page: Page;

    constructor(page) {
        super(page);
        this.page = page;
    }

    getRequestCard() {
        return this.page.locator('#pdp-side-railwrapper').getByRole('link', { name: 'Demandez votre Carte' });
    }

    getFormSubmitButton() {
        return this.page.getByRole('button', { name: 'Sauvegarder et Continuer' });
    }

    async validateGoldCardDetails() {
        await expect(this.page.locator('#pdp-side-railwrapper')).toContainText('Cotisation Gratuite la 1ère année*');
        await expect(this.page.locator('#pdp-side-railwrapper')).toContainText('Vous souhaitez en savoir plus sur la Carte Gold American Express ?');
        await expect(this.page.getByRole('heading', { name: 'Carte Gold American Express®' })).toBeVisible();
        await expect(this.page.locator('h1')).toContainText('Carte Gold American Express');
        await this.page.locator('div').filter({ hasText: /^Elle Assure et vous Rassure$/ }).click();

        await expect(this.page.locator('#pdp-side-railwrapper')).toContainText('Elle Assure et vous Rassure');
        await expect(this.page.getByText('Services Gold')).toBeVisible();
        await expect(this.page.locator('#pdp-side-railwrapper')).toContainText('Service Clients 24/7, gestion du compte simplifiée.');
        await expect(this.page.getByText('Cotisation', { exact: true })).toBeVisible();
        await expect(this.page.locator('#pdp-side-railwrapper')).toContainText('16€/mois à partir de la 2ème année*');
        await expect(this.page.getByText('Avantages', { exact: true })).toBeVisible();
        await expect(this.page.locator('#pdp-side-railwrapper')).toContainText('Abonnement Amazon Prime remboursé(1)');
        await expect(this.page.locator('div').filter({ hasText: /^AMAZON PRIME REMBOURSÉ$/ })).toBeVisible();
        await expect(this.page.locator('#pdp-side-railwrapper')).toContainText('Votre abonnement Amazon Prime remboursé à hauteur de 6,99 €/mois(1).');
        await expect(this.page.getByText('POINTS DE FIDELITE ET')).toBeVisible();
        await expect(this.page.locator('#pdp-side-railwrapper')).toContainText('1 € dépensé avec votre Carte = 1 point gagn');

        await expect(this.page.getByText('OFFRES DE CASHBACK**')).toBeVisible();
        await expect(this.page.locator('#pdp-side-railwrapper')).toContainText('Tous les mois, bénéficiez d’offres de remboursements chez des centaines d’enseignes partenaires');
        await expect(this.page.locator('#pdp-side-railwrapper').getByText('Assurances', { exact: true })).toBeVisible();
        await expect(this.page.locator('#pdp-side-railwrapper')).toContainText('Bénéficiez d\'une gamme d\'Assurances et d’Assistances optimale dont la Protection des Achats pendant 90 jours(5)(6)');
        await expect(this.page.getByText('EXPERIENCES UNIQUES :')).toBeVisible();
        await expect(this.page.locator('#pdp-side-railwrapper')).toContainText('Accès à la billetterie AMEX : Préventes exclusives, meilleures places réservées');
        await expect(this.page.getByRole('button', { name: 'Vos Avantages E-Commerce axp-' })).toBeVisible();
        await this.page.getByRole('button', { name: 'Vos Avantages E-Commerce axp-' }).click();
        await expect(this.page.getByText('Votre abonnement Amazon Prime remboursé(1)')).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Programme de Fidélité axp-' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: '05-membership/dls-icon-point-' })).toBeVisible();
        await expect(this.page.getByRole('button', { name: 'Bénéficiez d\'une gamme d\'' })).toBeVisible();

    }

    async submitForm(formData: FormData) {
        await this.page.locator('label').filter({ hasText: 'M.' }).click();

        await this.page.getByRole('textbox', { name: 'Prénom' }).fill(formData.firstName);
        await this.page.getByRole('textbox', { name: 'Nom', exact: true }).fill(formData.lastName);
        await this.page.getByRole('textbox', { name: 'Date de naissance (JJ/MM/AAAA)' }).fill(formData.dateOfBirth);
        await this.page.getByRole('textbox', { name: 'Adresse e-mail' }).fill(formData.email);
        await this.page.getByRole('textbox', { name: 'Numéro de téléphone portable' }).fill(`${formData.phoneNumber}`);
        
        await expect(this.getFormSubmitButton()).toBeVisible();
        await this.getFormSubmitButton().click();

        await expect(this.page.locator('#cosmos-form-section')).toContainText('Le formulaire de souscription est momentanément indisponible. Nous vous invitons à recommencer ultérieurement.');
        await expect(this.page.getByRole('button', { name: 'Revenir à la page d’accueil' })).toBeVisible();
    }
}