import { expect, Locator, Page } from '@playwright/test';

export class ProductCategoryPage {
  clickOnBasket() {
    throw new Error('Method not implemented.');
  }
  readonly page: Page;
  readonly pageHeader: Locator;
  readonly itemDescription: Locator;
  readonly viewItem: Locator;
  readonly viewProductItem: Locator;
  readonly cdMosTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.page.getByTestId('leadTitle');
    this.itemDescription = page.locator('div').filter({
      hasText: /^Various Artists - Mos Anthemsused£2\.99View Item$/,
    });
    this.viewItem = page.locator(
      'a.index-module_button__mrqtg[href="https://www.musicmagpie.co.uk/store/products/ministry-of-sound-anthems"]'
    );
    this.viewProductItem = page.getByRole('link', { name: 'View Item' });
    this.cdMosTitle =
      page.locator(`//a[contains(text(), 'ministry-of-sound-anthems')]
    `);
  }

  async expectedItemDescription(itemDescription: string) {
    const element = this.itemDescription.first();

    await expect(element).toBeVisible();

    if (element) {
      const description = await element.textContent();
      expect(description).toContain(itemDescription);
    } else {
      throw new Error('Item Description is not displayed');
    }
  }

  async clickViewItemMosAnthems() {
    await this.viewItem.click();
  }

  async clickViewFirstItem() {
    await this.page.getByRole('link', { name: 'View Item' }).first().click();
  }

  async clickCDTitle(cdMosTitle: string, timeout: number = 5000) {
    const cdTitleLocator = this.cdMosTitle;
    const element = cdTitleLocator.first();

    if (element) {
      const description = await element.textContent();
      expect(description).toContain(cdMosTitle);

      // click link
      await element.click();
      await this.page.waitForTimeout(timeout);
    } else {
      throw new Error('CD title link not found');
    }
  }
}
