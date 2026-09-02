import { test, expect } from '@fixtures/test';
import { users } from '@data/users';

test.describe('Login', () => {
  test('standard user can log in successfully', async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.waitForLoaded();
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });
});
