import { test, expect } from '@fixtures/test';

test.describe('Removing products from the cart', () => {
  test.beforeEach('Go to the Inventory page', async ({ inventoryPage }) => {
    await inventoryPage.goto();
  });

  test('standard user can remove a single product from the cart', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    const firstProduct = inventoryPage.products[0];

    await test.step('Add the product to the cart', async () => {
      await inventoryPage.addProductByLocator(firstProduct.locator, firstProduct.name);
      await inventoryPage.expectCartBadgeToHaveCount(1);
    });

    await test.step('Open the cart', async () => {
      await inventoryPage.openCart();
      await cartPage.waitForLoaded();
      await expect(page).toHaveURL(/\/cart\.html$/);
    });

    await test.step('Verify the product is listed in the cart', async () => {
      await expect(cartPage.cartItems).toHaveCount(1);
      await cartPage.expectItemNameToContain(firstProduct.description);
    });

    await test.step('Remove the product from the cart', async () => {
      await cartPage.removeItemAt(0);
    });

    await test.step('Verify the cart is empty', async () => {
      await expect(cartPage.cartItems).toHaveCount(0);
      await inventoryPage.expectCartBadgeToHaveCount(0);
    });
  });

  test('standard user can remove all products one by one from the cart', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    const productsToRemove = inventoryPage.products;

    await test.step('Add all products to the cart', async () => {
      await inventoryPage.addProductsToCart(productsToRemove);
      await inventoryPage.expectCartBadgeToHaveCount(productsToRemove.length);
    });

    await test.step('Open the cart', async () => {
      await inventoryPage.openCart();
      await cartPage.waitForLoaded();
      await expect(page).toHaveURL(/\/cart\.html$/);
    });

    await test.step('Verify the cart contains every product', async () => {
      await expect(cartPage.cartItems).toHaveCount(productsToRemove.length);
    });

    let remainingCount = productsToRemove.length;
    for (const product of productsToRemove) {
      await test.step(`Remove ${product.name} from the cart`, async () => {
        await cartPage.removeItemAt(0);
      });

      remainingCount -= 1;

      await test.step(`Verify ${remainingCount} products remain in the cart`, async () => {
        await expect(cartPage.cartItems).toHaveCount(remainingCount);
        await inventoryPage.expectCartBadgeToHaveCount(remainingCount);
      });
    }
  });
});
