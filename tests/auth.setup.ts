import { test as setup } from '@fixtures/test';
import { users } from '@data/users';

setup('authenticate standard user', async ({ loginPage, inventoryPage, page }) => {
  await loginPage.open();
  await loginPage.login(users.standard);
  await inventoryPage.waitForLoaded();

  await page.context().storageState({
    path: '.auth/standard-user.json',
  });
});
