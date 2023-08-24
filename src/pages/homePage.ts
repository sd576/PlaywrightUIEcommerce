//home.page.ts
import { test, expect, Locator, Page } from '@playwright/test';
export class HomePage {
  readonly page: Page;

  // declare locators
  readonly pageLogo: Locator;
  readonly myMagpieLink: Locator;
  readonly searchBox: Locator;
  readonly cookieButton: Locator;
  readonly musicCategoryLink: Locator;
  readonly summerVibesLink: Locator;
  readonly viewItemLink: Locator;

  // create constructor
  constructor(page: Page) {
    this.page = page;
    this.pageLogo = page.getByRole('link', { name: 'Music magpie logo' });
    this.myMagpieLink = page.getByRole('link', { name: 'myMagpie' });
    this.searchBox = page.getByTestId('searchInput--searchInput');
    this.cookieButton = page.getByRole('button', {
      name: 'Accept All Cookies',
    });
    this.musicCategoryLink = page
      .locator('#dropdown-menu-area')
      .getByRole('link', { name: 'Music', exact: true });
    this.summerVibesLink = page.getByRole('link', { name: 'Summer Vibes' });
    this.viewItemLink = page.getByRole('link', { name: 'View Item' });
  }

  async goto() {
    await this.page.goto('https://www.musicmagpie.co.uk/store');
  }

  async handleCookie() {
    const isCookieButtonVisible = await this.cookieButton.isVisible();

    if (isCookieButtonVisible) {
      await this.cookieButton.click();
    }
  }

  async hoverMusicClickSummerVibe() {
    await this.musicCategoryLink.hover();
    await this.page.getByRole('link', { name: 'Summer Vibes' }).click();
  }

  async searchForCd(searchString: string) {
    await this.searchBox.click();
    await this.searchBox.fill('');
    await this.searchBox.fill(searchString);
    await this.searchBox.press('Enter');
  }

  async sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
