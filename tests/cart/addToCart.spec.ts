import { test, expect } from '@fixtures/test';

test.describe('Add products to the cart', () => {
  test.beforeEach(async ({ loggedInStandardUser: _loggedInStandardUser }) => {});

  test('standard user can add a backpack product to the cart', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await test.step('Add backpack to cart', async () => {
      await inventoryPage.addBackpackToCart();
    });

    await test.step('Verify cart badge shows 1 item', async () => {
      await inventoryPage.expectCartBadgeToHaveCount(1);
    });

    await test.step('Navigate to cart', async () => {
      await inventoryPage.openCart();
      await cartPage.waitForLoaded();
    });

    await test.step('Verify cart contains backpack', async () => {
      await expect(page).toHaveURL(/\/cart\.html$/);
      await expect(cartPage.cartItems).toHaveCount(1);
      await cartPage.expectItemNameToContain('Sauce Labs Backpack');
    });
  });
});
