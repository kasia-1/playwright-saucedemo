import { Page, expect } from '@playwright/test';
import { AuthenticatedPage } from './AuthenticatedPage';

export class CartPage extends AuthenticatedPage {
  readonly cartItems = this.page.locator('[data-test="inventory-item"]');
  private readonly cartList = this.page.locator('[data-test="cart-list"]');
  private readonly cartItemName = this.page.locator('[data-test="inventory-item-name"]');
  private readonly removeButtons = this.page.locator('[data-test*="remove-"]');

  constructor(page: Page) {
    super(page);
  }

  async waitForLoaded(): Promise<void> {
    await this.waitForElement(this.cartList);
  }

  async expectItemNameToContain(text: string): Promise<void> {
    await expect(this.cartItemName).toContainText(text);
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getCartItemPrices(): Promise<number[]> {
    const priceElements = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();
    return priceElements.map((price) => parseFloat(price.replace('$', '')));
  }

  async getCartPricesTotal(): Promise<number> {
    const prices = await this.getCartItemPrices();
    return prices.reduce((sum, price) => sum + price, 0);
  }

  async expectCartState(expected: { itemCount: number; total: number }): Promise<void> {
    const actualItemCount = await this.getCartItemCount();
    const actualTotal = await this.getCartPricesTotal();

    expect(actualItemCount).toBe(expected.itemCount);
    expect(Math.round(actualTotal * 100)).toBe(Math.round(expected.total * 100));
  }

  async removeItemAt(index: number): Promise<void> {
    const removeButtons = await this.page.locator('[data-test*="remove-"]').all();
    if (removeButtons[index]) {
      await removeButtons[index].click();
    }
  }

  async removeAllItems(): Promise<void> {
    while ((await this.removeButtons.count()) > 0) {
      await this.removeButtons.first().click();
    }
    await expect(this.removeButtons).toHaveCount(0);
    await expect(this.cartItems).toHaveCount(0);
  }

  async expectAllPricesPositiveAndReturnTotal(): Promise<number> {
    const prices = await this.getCartItemPrices();
    let total = 0;
    for (const price of prices) {
      expect(price).toBeGreaterThan(0);
      total += price;
    }
    expect(total).toBeGreaterThan(0);
    return total;
  }
}
