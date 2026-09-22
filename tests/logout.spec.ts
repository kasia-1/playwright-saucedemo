// Uses storageState from config for logged-in state
import { test, expect } from '@fixtures/test';

test.describe('Logout scenarios', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.appMenu.logout();
  });

  test('user is redirected to login page', async ({ page }) => {
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });

  test('logged out user cannot access inventory', async ({ page }) => {
    await page.goto('/inventory.html');

    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
  });
});
