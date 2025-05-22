import { test, expect } from "@playwright/test";
import { GoldCardPage } from "../pages/goldCardPage";

import { createUser } from "../utils/createUser";

test("Navigate to AMEX Page", async ({ page }) => {

    const personalCardsPage = new GoldCardPage(page);
    await personalCardsPage.navigate();
    await personalCardsPage.validateCookies();
    await personalCardsPage.checkAllCardsVisibility();

    await personalCardsPage.getPersonalCards().click();
    await personalCardsPage.validateGoldExpressCard();
    await expect(personalCardsPage.getLearnMore()).toBeVisible();
    await personalCardsPage.getLearnMore().click();

    await personalCardsPage.validateGoldCardDetails();
    await expect(personalCardsPage.getRequestCard()).toBeVisible();
    await personalCardsPage.getRequestCard().click();

    // fill form details
    let user = createUser();
    console.log("user generated ", user);
    await personalCardsPage.submitForm(user);

 
})