import { expect, Locator, Page } from '@playwright/test';

export class MyAccountPage {
  readonly page: Page;
  readonly pageTitle: Locator;
  readonly personalDetailsTab: Locator;
  readonly name: Locator;
  readonly email: Locator;
  readonly mobile: Locator;
  readonly addressDetailsTab: Locator;
  readonly street: Locator;
  readonly town: Locator;
  readonly postcode: Locator;

  constructor(page: Page) {
    this.pageTitle = page.locator('');
    this.personalDetailsTab = page.getByRole('link', {
      name: 'Personal Details',
    });
    this.name = page.locator('p:has-text("Name:")');
    this.email = page.locator('p:has-text("Email Address:")');
    this.mobile = page.locator('p:has-text-match(/\\d{11}/)');
    this.addressDetailsTab = page.getByRole('link', { name: 'Address' });
    this.addressDetailsTab = this.street = page.locator(
      'p:has-text-match(/^Street: [\\s\\S]{1,30}$/)'
    );
    this.town = page.locator('p:has-text-match(/^Town: [\\s\\S]{1,30}$/)');
    this.postcode = page.locator(
      'p:has-text-match(/^[A-Z]{2}[0-9]{1,2}[A-Z]? [0-9]{1}[A-Z]{2}$/)'
    );
  }

  async expectedCustomerDetails() {}

  async expectedCustomerAddressDetails() {}

  //   async expectedCustomerDetails(
  //     expectedFirstName: string
  // expectedSurname: string,
  // mobileNumber: string,
  // emailAddress: string
  //   ) {
  //     const firstNameElement = this.firstName.first();

  //     await expect(firstNameElement).toBeVisible();

  //     if (firstNameElement) {
  //       const name = await firstNameElement.textContent();
  //       expect(name).toContain(this.firstName);
  //     } else {
  //       throw new Error('Customer First Name is not being displayed');
  //     }
  //   }

  //   async expectedCustomerAddressDetails(chosenAddress: string) {
  //     const chosenAddressElement = this.chosenAddressSelector.first();

  //     await expect(chosenAddressElement).toBeVisible();

  //     if (chosenAddressElement) {
  //       const address = await chosenAddressElement.textContent();
  //       expect(address).toContain(chosenAddress);
  //     } else {
  //       throw new Error('Customer Address is not displayed');
  //     }
  //   }

  //   async expectedCustomerSpecialOfferDetails(dob: string, updateMethod: string) {
  //     const dobElement = this.dobDay.first();

  //     await expect(dobElement).toBeVisible();
  //   }
}
