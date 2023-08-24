import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { CartPage } from '../pages/cartPage';
import { ProductCategoryPage } from '../pages/productCategoryPage';
import { ProductDetailsPage } from '../pages/productDetailsPage';

test.describe('New Trial Tests', () => {
  test('add one cd to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productCategoryPage = new ProductCategoryPage(page);
    const productDetailsPage = new ProductDetailsPage(page);
    const cartPage = new CartPage(page);

    await homePage.goto();
    await homePage.handleCookie();
    await homePage.hoverMusicClickSummerVibe();

    await productCategoryPage.clickViewItemMosAnthems();

    await productDetailsPage.expectedProperProductHeading(
      'Various Artists - Mos Anthems'
    );

    // check discount offer is visible
    await productDetailsPage.expectedProperPromoOffer(
      `Save big with our 2 for £5 or 4 for £8 multi-buy offer.`
    );

    // check basket money total top right hand corner
    await productDetailsPage.expectedSingleProductPrice(`£2.99`);

    // check basket item count top right hand corner
    await productDetailsPage.expectedBasketItemTotal(`Basket (1)`);

    // check Cart total
    await cartPage.expectedCartTotalOne(`£2.99`);
  });
});
