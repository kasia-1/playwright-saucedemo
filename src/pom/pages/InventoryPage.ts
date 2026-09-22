import { Page, Locator, expect } from '@playwright/test';
import { AuthenticatedPage } from '@pom/pages/AuthenticatedPage';

export class InventoryPage extends AuthenticatedPage {
  readonly pageTitle: Locator;
  private readonly cartLink = '[data-test="shopping-cart-link"]';
  private readonly inventoryList = '.inventory_list';
  private readonly addBackpackButton = '[data-test="add-to-cart-sauce-labs-backpack"]';
  private readonly cartBadge = '.shopping_cart_badge';

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
    return this.getText(this.pageTitle);
  }

  async addBackpackToCart(): Promise<void> {
    await this.click(this.addBackpackButton);
  }

  async expectCartBadgeToHaveCount(count: string): Promise<void> {
    await this.page.locator(this.cartBadge).waitFor({ state: 'visible' });
    await expect(this.page.locator(this.cartBadge)).toHaveText(count);
  }
}
