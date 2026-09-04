import { test, expect } from '@fixtures/test';
import { users } from '@data/users';

test.describe('Login', () => {
  test('standard user can log in successfully', async ({ loginPage, inventoryPage, page }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.waitForLoaded();

    await expect(inventoryPage.pageTitle).toHaveText('Products');
    expect(page.url()).toContain('/inventory');
  });

  test('locked out user sees a meaningful error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.lockedOut);

    await expect(loginPage.getErrorMessage()).resolves.toContain(
      'Sorry, this user has been locked out.'
    );
    await loginPage.expectLoginInputsToHaveError();
  });

  test('empty username is rejected', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login({ username: '', password: users.standard.password });

    await expect(loginPage.getErrorMessage()).resolves.toContain('Username is required');
    await loginPage.expectLoginInputsToHaveError();
  });

  test('empty password is rejected', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login({ username: users.standard.username, password: '' });

    await expect(loginPage.getErrorMessage()).resolves.toContain('Password is required');
    await loginPage.expectLoginInputsToHaveError();
  });

  test('invalid credentials are rejected', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login({ username: 'invalid_user', password: 'invalid_password' });

    await expect(loginPage.getErrorMessage()).resolves.toContain(
      'Username and password do not match any user in this service'
    );
    await loginPage.expectLoginInputsToHaveError();
  });

  test('performance glitch user logs in despite performance glitches', async ({
    loginPage,
    inventoryPage,
  }) => {
    await loginPage.open();
    await loginPage.login(users.performanceGlitch);
    await inventoryPage.waitForLoaded();
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });
});
