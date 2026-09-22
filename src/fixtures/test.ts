import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pom/pages/LoginPage';
import { InventoryPage } from '@pom/pages/InventoryPage';
import { CartPage } from '@pom/pages/CartPage';
import { users } from '@data/users';

type AppFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  loggedInStandardUser: void;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  loggedInStandardUser: async ({ loginPage, inventoryPage }, use) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.waitForLoaded();
    await use();
  },
});

export { expect };
