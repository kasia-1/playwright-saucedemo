import { test, expect } from '@fixtures/test';
import { users } from '@data/users';

test.describe('Logout', () => {
    test.beforeEach(async ({ loginPage, inventoryPage }) => {
        await loginPage.open();
        await loginPage.login(users.standard);
        await inventoryPage.waitForLoaded();
    });
    test('standard user can log out from inventory', async ({ inventoryPage, page }) => {
        await inventoryPage.appMenu.logout();

        await expect(page).toHaveURL(/\/$/);
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });

    test('logged out user cannot stay on inventory page', async ({ inventoryPage, page }) => {
        await inventoryPage.appMenu.logout();
        await page.goto('/inventory.html');

        await expect(page).toHaveURL(/\/$/);
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    });
});