import { test as base, expect } from '@playwright/test';
import { LoginPage } from '@pom/pages/LoginPage';
import { InventoryPage } from '@pom/pages/InventoryPage';

type AppFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
};

export const test = base.extend<AppFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
});

export { expect };
