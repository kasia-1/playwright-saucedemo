import { test, expect } from '@fixtures/test';

test.describe('Add products to the cart', () => {
  test.beforeEach(async ({ loggedInStandardUser: _loggedInStandardUser }) => {});

  test('standard user can add a backpack product to the cart', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.addBackpackToCart();
    await inventoryPage.expectCartBadgeToHaveCount('1');

    await inventoryPage.openCart();
    await cartPage.waitForLoaded();

    await expect(page).toHaveURL(/\/cart\.html$/);
    await expect(cartPage.cartItems).toHaveCount(1);
    await cartPage.expectItemNameToContain('Sauce Labs Backpack');
  });
});
