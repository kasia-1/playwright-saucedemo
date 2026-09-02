import { Page, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export class InventoryPage extends BasePage {
  readonly pageTitle: Locator;
  private readonly cartLink = '[data-test="shopping-cart-link"]';
  private readonly inventoryList = '.inventory_list';

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.locator('.title');
  }

  async waitForLoaded(): Promise<void> {
    await this.waitForElement(this.inventoryList);
  }

  async openCart(): Promise<void> {
    await this.click(this.cartLink);
  }

  async getTitle(): Promise<string> {
    return this.getText('.title');
  }
}
