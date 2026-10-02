import { expect, Locator, Page } from '@playwright/test';
import { AuthenticatedPage } from '@pom/pages/AuthenticatedPage';

// Product test data with selectors
export interface Product {
  name: string;
  description: string;
  locator: Locator;
}

export class InventoryPage extends AuthenticatedPage {
  private url: string = '/inventory.html';
  readonly pageTitle = this.page.locator('.title');
  private readonly cartLink = this.page.getByRole('button', { name: /Cart/ });
  private readonly inventoryList = this.page.locator('[data-test="inventory-list"]');
  private readonly inventoryItem = this.page.locator('[data-test="inventory-item"]');
  private readonly addBackpackButton = this.page.locator(
    '[data-test="add-to-cart-sauce-labs-backpack"]'
  );
  private readonly addBikeLightButton = this.page.locator(
    '[data-test="add-to-cart-sauce-labs-bike-light"]'
  );
  private readonly addBoltTShirtButton = this.page.locator(
    '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'
  );
  private readonly cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');

  // Product matrix - centralized inventory of testable products
  readonly products: Product[] = [
    {
      name: 'Backpack',
      description: 'Sauce Labs Backpack',
      locator: this.addBackpackButton,
    },
    {
      name: 'Bike Light',
      description: 'Sauce Labs Bike Light',
      locator: this.addBikeLightButton,
    },
    {
      name: 'Bolt T-Shirt',
      description: 'Sauce Labs Bolt T-Shirt',
      locator: this.addBoltTShirtButton,
    },
  ];

  constructor(page: Page) {
    super(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await this.waitForLoaded();
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

  async expectCartBadgeToHaveCount(count: number): Promise<void> {
    await this.cartBadge.waitFor({ state: 'visible' });
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async getProductPrices(): Promise<number[]> {
    const priceElements = await this.page
      .locator('[data-test="inventory-item-price"]')
      .allTextContents();
    return priceElements.map((price) => parseFloat(price.replace('$', '')));
  }

  async getProductCount(): Promise<number> {
    return this.inventoryItem.count();
  }

  async addProductByLocator(addProductButtonLocator: Locator, productName: string): Promise<void> {
    await addProductButtonLocator.click();
    await expect(
      this.page.locator(
        `[data-test="remove-sauce-labs-${productName.toLowerCase().replace(' ', '-')}"]`
      )
    ).toBeVisible();
  }

  async addProductsToCart(productsToTest: Product[]): Promise<void> {
    for (const product of productsToTest) {
      await this.addProductByLocator(product.locator, product.name);
    }
  }

  async getProductPrice(addProductButtonLocator: Locator): Promise<number> {
    const productContainer = addProductButtonLocator.locator(
      'xpath=ancestor::div[@data-test="inventory-item"]'
    );
    const priceText = await productContainer
      .locator('[data-test="inventory-item-price"]')
      .textContent();
    return parseFloat(priceText?.replace('$', '') || '0');
  }

  async getProductName(addProductButtonLocator: Locator): Promise<string> {
    const productContainer = addProductButtonLocator.locator(
      'xpath=ancestor::div[@data-test="inventory-item"]'
    );
    const nameText = await productContainer
      .locator('[data-test="inventory-item-name"]')
      .textContent();
    return nameText || '';
  }
}
