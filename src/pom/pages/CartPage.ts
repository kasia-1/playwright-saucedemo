import { Page, expect } from '@playwright/test';
import { AuthenticatedPage } from './AuthenticatedPage';

export class CartPage extends AuthenticatedPage {
  readonly cartItems = this.page.locator('[data-test="inventory-item"]');
  private readonly cartList = this.page.locator('[data-test="cart-list"]');
  private readonly cartItemName = this.page.locator('[data-test="inventory-item-name"]');

  constructor(page: Page) {
    super(page);
  }

  async waitForLoaded(): Promise<void> {
    await this.waitForElement(this.cartList);
  }

  async expectItemNameToContain(text: string): Promise<void> {
    await expect(this.cartItemName).toContainText(text);
  }
}
