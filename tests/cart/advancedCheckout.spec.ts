/**
 * Advanced checkout scenarios demonstrating senior-level test automation patterns:
 * - Data-driven parameterized testing with dynamic price extraction per product
 * - Price verification across cart lifecycle using app data (never hardcoded)
 * - POM pattern: selectors centralized in InventoryPage.products
 * - Complex user journeys with state management
 *
 * Assumptions:
 * - Inventory has at least 1 product available
 * - storageState handles auth between tests
 */
import { test, expect } from '@fixtures/test';

test.describe('Cart Management - Price Validation & State Persistence', () => {
  test.beforeEach('Go to the Inventory page', async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('should verify each product price consistency from inventory to cart', async ({
    inventoryPage,
    cartPage,
  }) => {
    for (const product of inventoryPage.products) {
      let inventoryPrice!: number;
      await test.step('Get product price dynamically from the UI', async () => {
        inventoryPrice = await inventoryPage.getProductPrice(product.locator);
        expect(inventoryPrice).toBeGreaterThan(0);
      });

      await test.step('Verify product name matches expected product description', async () => {
        const productName = await inventoryPage.getProductName(product.locator);
        expect(productName).toContain(product.description);
      });

      await test.step('Add to cart and verify cart badge increments', async () => {
        await inventoryPage.addProductByLocator(product.locator, product.name);
        await inventoryPage.expectCartBadgeToHaveCount(1);
      });

      await test.step('Navigate to cart', async () => {
        await inventoryPage.openCart();
        await cartPage.waitForLoaded();
      });

      await test.step('Verify cart price matches inventory price', async () => {
        await cartPage.expectCartState({ itemCount: 1, total: inventoryPrice });
      });

      await test.step('Clean up for next iteration - remove from cart', async () => {
        await cartPage.removeAllItems();
      });

      await test.step('Navigate back to inventory for next product', async () => {
        await inventoryPage.goto();
      });
    }
  });

  test('should accumulate prices correctly when adding multiple products', async ({
    inventoryPage,
    cartPage,
  }) => {
    let productsToTest!: typeof inventoryPage.products;
    let expectedTotal!: number;

    await test.step('Choose all available products and compute expected total', async () => {
      productsToTest = inventoryPage.products;
      const expectedPrices = await Promise.all(
        productsToTest.map((product) => inventoryPage.getProductPrice(product.locator))
      );
      expectedTotal = expectedPrices.reduce((sum, price) => sum + price, 0);
    });

    await test.step('Add all products to cart', async () => {
      await inventoryPage.addProductsToCart(productsToTest);
    });

    await test.step('Verify cart badge shows correct count', async () => {
      await inventoryPage.expectCartBadgeToHaveCount(productsToTest.length);
    });

    await test.step('Navigate to cart and verify all items are present', async () => {
      await inventoryPage.openCart();
      await cartPage.waitForLoaded();
      const cartItemCount = await cartPage.getCartItemCount();
      expect(cartItemCount).toBe(productsToTest.length);
    });

    await test.step('Verify all prices are positive and total matches expected', async () => {
      const cartTotal = await cartPage.expectAllPricesPositiveAndReturnTotal();
      expect(expectedTotal).toBe(cartTotal);
    });
  });

  test('should handle cart item removal and price recalculation', async ({
    inventoryPage,
    cartPage,
  }) => {
    let initialPrices!: number[];
    let initialTotal!: number;

    await test.step('Add a few products to cart', async () => {
      const productsToAdd = inventoryPage.products;
      await inventoryPage.addProductsToCart(productsToAdd);
      await inventoryPage.expectCartBadgeToHaveCount(productsToAdd.length);
    });

    await test.step('Navigate to cart and get initial prices', async () => {
      await inventoryPage.openCart();
      await cartPage.waitForLoaded();
      initialPrices = await cartPage.getCartItemPrices();
      initialTotal = initialPrices.reduce((sum, p) => sum + p, 0);
    });

    await test.step('Remove first item from cart', async () => {
      await cartPage.removeItemAt(0);
    });

    await test.step('Verify remaining prices and cart state', async () => {
      const remainingCount = await cartPage.getCartItemCount();
      expect(remainingCount).toBe(initialPrices.length - 1);
    });

    await test.step('Verify total price calculation after removal', async () => {
      const remainingPrices = await cartPage.getCartItemPrices();
      const expectedTotal = remainingPrices.reduce((sum, p) => sum + p, 0);
      const toCents = (value: number) => Math.round(value * 100);
      expect(toCents(expectedTotal)).toBe(toCents(initialTotal - initialPrices[0]));
    });
  });

  test('should verify cart state persists across navigation', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    let productPrice!: number;
    const firstProduct = inventoryPage.products[0];

    await test.step('Get first product and extract its price', async () => {
      productPrice = await inventoryPage.getProductPrice(firstProduct.locator);
    });

    await test.step('Add product to cart and verify badge', async () => {
      await inventoryPage.addProductByLocator(firstProduct.locator, firstProduct.name);
      await inventoryPage.expectCartBadgeToHaveCount(1);
    });

    await test.step('Navigate away and back to inventory', async () => {
      await page.goto('/');
      await inventoryPage.goto();
    });

    await test.step('Verify cart state persisted across navigation', async () => {
      await inventoryPage.expectCartBadgeToHaveCount(1);
    });

    await test.step('Open cart and verify item with same price', async () => {
      await inventoryPage.openCart();
      await cartPage.waitForLoaded();
      await cartPage.expectCartState({ itemCount: 1, total: productPrice });
    });
  });
});
