import { Locator, Page, expect } from '@playwright/test';
import { AuthenticatedPage } from './AuthenticatedPage';

export class CartPage extends AuthenticatedPage {
  readonly cartItems: Locator;
  private readonly cartList = '.cart_list';
  private readonly cartItemName = '.inventory_item_name';

  constructor(page: Page) {
    super(page);
    this.cartItems = page.locator('.cart_item');
  }

  async waitForLoaded(): Promise<void> {
    await this.waitForElement(this.cartList);
  }

  async expectItemNameToContain(text: string): Promise<void> {
    await expect(this.page.locator(this.cartItemName)).toContainText(text);
  }
}
