import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly basketMoneyTotal: Locator;
  readonly basketItemCount: Locator;
  readonly basketSummary: Locator;
  readonly subTotal: Locator;
  readonly cartTotal: Locator;
  readonly checkoutSecurelyBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.basketMoneyTotal = page.locator('#link-to-cart > a > span');
    this.basketItemCount = page.locator('#link-to-cart > a > small');
    this.basketSummary = page
      .locator('strong')
      .filter({ hasText: 'Various Artists - Mos Anthems' });
    this.subTotal = page.getByRole('link', { name: '£2.99 Basket (1)' });
    this.checkoutSecurelyBtn = page.getByRole('button', {
      name: ' Checkout Securely',
    });
    this.cartTotal = page.locator(`#cart_total_text`);
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

  async expectedBasketItemTotal(basketItemCount: string) {
    const element = this.basketItemCount.first();

    if (element) {
      const description = await element.textContent();
      expect(description).toContain(basketItemCount);
    } else {
      throw new Error('The Basket Item count is not displayed');
    }
  }

  async expectedCartTotalOne(cartTotal: string) {
    const cartElement = this.cartTotal.first();

    await expect(cartElement).toBeVisible();

    if (cartElement) {
      const description = await cartElement.textContent();
      expect(description).toContain(cartTotal);
    } else {
      throw new Error('The Cart Total is not displayed');
    }
  }

  async expectCartTotal(cartTotal: string) {
    const cartTotalElement = this.subTotal.first();

    await expect(cartTotalElement).toBeVisible();

    if (cartTotalElement) {
      const description = await cartTotalElement.textContent();
      const sanitisedCartTotal = cartTotal.replace(/\s/g, '');
      const sanitisedReceivedTotal = description?.replace(/\s/g, '');

      expect(sanitisedReceivedTotal).toContain(sanitisedCartTotal);
    } else {
      throw new Error('The cart total is not displayed');
    }
  }

  async expectCheckoutSecurelyBtn() {
    const checkoutSecurelyElement = this.checkoutSecurelyBtn.first();

    await expect(checkoutSecurelyElement).toBeVisible();

    if (!checkoutSecurelyElement) {
      throw new Error('The Checkout Securely button is not displayed');
    }
  }

  async checkoutSecurely() {
    await this.checkoutSecurelyBtn.click();
  }
}
