// Uses storageState from config for logged-in state
import { test, expect } from '@fixtures/test';

test.describe('Logout scenarios', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await inventoryPage.goto();
    await inventoryPage.appMenu.logout();
  });

  test('user is redirected to login page', async ({ page }) => {
    await test.step('Verify user is redirected to login page', async () => {
      await expect(page).toHaveURL(/\/$/);
      await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });
  });

  test('logged out user cannot access inventory', async ({ page }) => {
    await test.step('Attempt to navigate to inventory', async () => {
      await page.goto('/inventory.html');
    });

    await test.step('Verify user is redirected to login page', async () => {
      await expect(page).toHaveURL(/\/$/);
      await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });
  });
});
