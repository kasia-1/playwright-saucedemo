import { Page, expect } from '@playwright/test';
import { AuthenticatedPage } from '@pom/pages/AuthenticatedPage';

export class InventoryPage extends AuthenticatedPage {
  readonly pageTitle = this.page.locator('.title');
  private readonly cartLink = this.page.getByRole('button', { name: /Cart/ });
  private readonly inventoryList = this.page.locator('[data-test="inventory-list"]');
  private readonly addBackpackButton = this.page.locator(
    '[data-test="add-to-cart-sauce-labs-backpack"]'
  );
  private readonly cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');

  constructor(page: Page) {
    super(page);
  }

  async waitForLoaded(): Promise<void> {
    await this.waitForElement(this.inventoryList);
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async getTitle(): Promise<string> {
    return this.getText(this.pageTitle);
  }

  async addBackpackToCart(): Promise<void> {
    await this.addBackpackButton.click();
  }

  async expectCartBadgeToHaveCount(count: string): Promise<void> {
    await this.cartBadge.waitFor({ state: 'visible' });
    await expect(this.cartBadge).toHaveText(count);
  }
}
