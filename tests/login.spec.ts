import { test, expect } from '@fixtures/test';
import { users } from '@data/users';

test.describe('Login', () => {
  test('standard user can log in successfully', async ({ loginPage, inventoryPage }) => {
    await loginPage.open();
    await loginPage.login(users.standard);
    await inventoryPage.waitForLoaded();
    await expect(inventoryPage.pageTitle).toHaveText('Products');
  });

  test('locked out user sees a meaningful error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login(users.lockedOut);

    await expect(loginPage.getErrorMessage()).resolves.toContain('locked out');
  });

  test('empty username is rejected', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login({ username: '', password: 'secret_sauce' });

    await expect(loginPage.getErrorMessage()).resolves.toContain('Username is required');
  });

  test('empty password is rejected', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login({ username: 'standard_user', password: '' });

    await expect(loginPage.getErrorMessage()).resolves.toContain('Password is required');
  });

  test('invalid credentials are rejected', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login({ username: 'invalid_user', password: 'invalid_password' });

    await expect(loginPage.getErrorMessage()).resolves.toContain(
      'Username and password do not match any user in this service'
    );
  });
});
