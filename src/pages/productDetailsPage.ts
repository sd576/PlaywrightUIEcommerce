import { expect, Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  readonly page: Page;
  readonly productHeading: Locator;
  readonly promoOffer: Locator;
  readonly addUsed: Locator;
  readonly basketMoneyTotal: Locator;
  readonly basketItemCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productHeading = page.locator(
      '//div[@id="product-details"]//h1'
    );
    this.promoOffer = page.locator(
      '//span[@id="multi-buy-promotion-name"]'
    );
    this.addUsed = page.locator('//*[@id="addToCartBtnused"]');
    this.basketMoneyTotal = page.locator('#link-to-cart > a > span');
    this.basketItemCount = page.locator('#link-to-cart > a > small');
  }

  async addProductToBasket() {
    this.addUsed.click();
  }

  async expectedProperProductHeading(productHeading: string) {
    const element = this.productHeading.first();

    await expect(element).toBeVisible();

    if (element) {
      const description = await element.textContent();
      expect(description).toContain(productHeading);
    } else {
      throw new Error('Proper Product Heading is not visible');
    }
  }

  async expectedProperPromoOffer(
    promoOffer: string,
    timeout: number = 5000
  ) {
    const element = this.promoOffer.first();

    if (element) {
      await element.waitFor({ state: 'visible', timeout: timeout });
      const description = await element.textContent();
      expect(description).toContain(promoOffer);
    } else {
      throw new Error('Proper Product heading is not visible');
    }
  }

  async expectedSingleProductPriceAndBasketTotal(
    addUsed: string,
    basketMoneyTotal: string
  ) {
    const addUsedLocator = this.addUsed;
    const element = await addUsedLocator.first();

    if (element) {
      const description = await element.textContent();
      expect(description).toContain(addUsed);

      await element.click();

      await this.page.waitForFunction(
        () => {
          const basketTotalElement = this.basketMoneyTotal.first();
          return basketTotalElement ? basketTotalElement.isVisible() : false;
        },
        { timeout: 10000 }
      );

      // check the basket price
      const basketTotalElement = this.basketMoneyTotal.first();

      if (basketTotalElement) {
        const description = await basketTotalElement.textContent();
        expect(description).toContain(basketMoneyTotal);
      } else {
        throw new Error('The Basket Product Price is not displayed');
      }
    }
  }

  async waitForTimeoutAndClick(element, timeout) {
    await element.click();
    // Delay using a Promise-based delay mechanism
    await new Promise((resolve) => setTimeout(resolve, timeout));
  }

  async expectedSingleProductPrice(
    addUsed: string,
    timeout: number = 5000
  ) {
    const addUsedLocator = this.addUsed;
    const element = addUsedLocator.first();

    if (element) {
      const description = await element.textContent();
      expect(description).toContain(addUsed);

      // add item to cart and wait for timeout
      await this.waitForTimeoutAndClick(element, timeout);
    } else {
      throw new Error('The Single Product Price is not displayed');
    }
  }

  async expectedBasketMoneyTotal(basketMoneyTotal: string) {
    const element = this.basketMoneyTotal.first();

    if (element) {
      const description = await element.textContent();
      expect(description).toContain(basketMoneyTotal);
    } else {
      throw new Error('The Basket Product Price is not displayed');
    }
  }

  async expectedBasketItemTotal(
    basketItemCount: string,
    timeout: number = 6000
  ) {
    const element = this.basketItemCount.first();

    if (element) {
      await element.waitFor({ state: 'visible', timeout: timeout });
      const description = await element.textContent();
      expect(description).toContain(basketItemCount);
      await element.click();
    } else {
      throw new Error('The Basket Item count is not displayed');
    }
  }
}
