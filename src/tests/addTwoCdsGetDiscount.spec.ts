import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { ProductCategoryPage } from '../pages/productCategoryPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';

test.describe(`Buying CD's`, () => {
  test(`Save big with our 2 for £5`, async ({ page }) => {
    const homePage = new HomePage(page);
    const productCategoryPage = new ProductCategoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);

    await homePage.goto();
    await homePage.handleCookie();

    // product search for first CD
    await homePage.searchForCd(`Radiohead - OK Computer`);

    // switches to productCategoryPage
    await productCategoryPage.clickViewFirstItem();

    // switches to productDetailsPage
    await productDetailsPage.expectedProperProductHeading(
      `Radiohead - OK Computer`
    );

    // check discount offer is visible
    await productDetailsPage.expectedProperPromoOffer(
      `Save big with our 2 for £5 or 4 for £8 multi-buy offer.`
    );

    // check basket money total top right hand corner
    await productDetailsPage.expectedSingleProductPrice(`£2.99`);

    // check basket item count top right hand corner
    await productDetailsPage.expectedBasketItemTotal(`Basket (1)`);

    // switch back to the Home Page, product search for second CD
    await homePage.searchForCd(`Oasis - (What's the Story) Morning Glory?`);

    // switches to productCategoryPage
    await productCategoryPage.clickViewFirstItem();

    // switches to productDetailsPage
    await productDetailsPage.expectedProperProductHeading(
      `Oasis - (What's the Story) Morning Glory?`
    );

    // check discount offer is visible
    await productDetailsPage.expectedProperPromoOffer(
      `Save big with our 2 for £5 or 4 for £8 multi-buy offer.`
    );

    // check the price for a single CD and add to the basket
    await productDetailsPage.expectedSingleProductPrice(`£2.99`);

    // switches to the Cart page, check basket money total
    await productDetailsPage.expectedBasketMoneyTotal(`5.00`);

    // switches to the Cart page, check basket item count
    await productDetailsPage.expectedBasketItemTotal(`Basket (2)`);
  });
});
