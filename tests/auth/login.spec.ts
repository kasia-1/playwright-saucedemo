// No fixture login, no storageState login
import { test, expect } from '@fixtures/test';
import { users } from '@data/users';

test.describe('Login', () => {
  test('standard user can log in successfully', async ({ loginPage, inventoryPage, page }) => {
    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Log in with standard user credentials', async () => {
      await loginPage.login(users.standard);
    });

    await test.step('Wait for inventory page to load', async () => {
      await inventoryPage.waitForLoaded();
    });

    await test.step('Verify user is logged in successfully', async () => {
      await expect(inventoryPage.pageTitle).toHaveText('Products');
      expect(page.url()).toContain('/inventory');
    });
  });

  test('locked out user sees a meaningful error', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Attempt login with locked out user', async () => {
      await loginPage.login(users.lockedOut);
    });

    await test.step('Verify locked out error message', async () => {
      await expect(loginPage.getErrorMessage()).resolves.toContain(
        'Sorry, this user has been locked out.'
      );
      await loginPage.expectLoginInputsToHaveError();
    });
  });

  test('empty username is rejected', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Submit login form with empty username', async () => {
      await loginPage.login({ username: '', password: users.standard.password });
    });

    await test.step('Verify username required error', async () => {
      await expect(loginPage.getErrorMessage()).resolves.toContain('Username is required');
      await loginPage.expectLoginInputsToHaveError();
    });
  });

  test('empty password is rejected', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Submit login form with empty password', async () => {
      await loginPage.login({ username: users.standard.username, password: '' });
    });

    await test.step('Verify password required error', async () => {
      await expect(loginPage.getErrorMessage()).resolves.toContain('Password is required');
      await loginPage.expectLoginInputsToHaveError();
    });
  });

  test('invalid credentials are rejected', async ({ loginPage }) => {
    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Submit login form with invalid credentials', async () => {
      await loginPage.login({ username: 'invalid_user', password: 'invalid_password' });
    });

    await test.step('Verify invalid credentials error', async () => {
      await expect(loginPage.getErrorMessage()).resolves.toContain(
        'Username and password do not match any user in this service'
      );
      await loginPage.expectLoginInputsToHaveError();
    });
  });

  test('performance glitch user logs in despite performance glitches', async ({
    loginPage,
    inventoryPage,
  }) => {
    await test.step('Open login page', async () => {
      await loginPage.open();
    });

    await test.step('Log in with performance glitch user', async () => {
      await loginPage.login(users.performanceGlitch);
    });

    await test.step('Wait for inventory page to load', async () => {
      await inventoryPage.waitForLoaded();
    });

    await test.step('Verify user is logged in successfully', async () => {
      await expect(inventoryPage.pageTitle).toHaveText('Products');
    });
  });
});
