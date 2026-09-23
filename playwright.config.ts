import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

// Load .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const baseURL = process.env.BASE_URL || 'https://www.saucedemo.com';
const timeout = parseInt(process.env.TIMEOUT || '30000', 10);

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],

  timeout,
  expect: {
    timeout: 5000,
  },

  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
  },

  webServer: undefined,

  projects: [
    // Auth setup - runs first, generates .auth/standard-user.json
    {
      name: 'auth',
      testMatch: '**/auth.setup.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    /* Login tests - NO storageState because the logic is in the test
     add to cart tests - NO storageState because the fixture loggedInUser approach is implemented
    */
    {
      name: 'chromium-login-addToCart',
      testMatch: ['**/login.spec.ts', '**/addToCart.spec.ts'],
      use: { ...devices['Desktop Chrome'] },
    },
    // All other tests - WITH storageState to show how it works in the portfolio
    {
      name: 'chromium',
      testMatch: '**/*.spec.ts',
      testIgnore: ['**/login.spec.ts', '**/addToCart.spec.ts'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/standard-user.json',
      },
      dependencies: ['auth'],
    },

    /* Firefox
     Login tests - NO storageState because the logic is in the test
     add to cart tests - NO storageState because the fixture loggedInUser approach is implemented
    */
    {
      name: 'firefox-login-addToCart',
      testMatch: ['**/login.spec.ts', '**/addToCart.spec.ts'],
      use: { ...devices['Desktop Firefox'] },
    },
    //All other tests - WITH storageState to show how it works in the portfolio
    {
      name: 'firefox',
      testMatch: '**/*.spec.ts',
      testIgnore: ['**/login.spec.ts', '**/addToCart.spec.ts'],
      use: {
        ...devices['Desktop Firefox'],
        storageState: '.auth/standard-user.json',
      },
      dependencies: ['auth'],
    },

    /* WebKit
    Login tests - NO storageState because the logic is in the test
    add to cart tests - NO storageState because the fixture loggedInUser approach is implemented
    */
    {
      name: 'webkit-login-addToCart',
      testMatch: ['**/login.spec.ts', '**/addToCart.spec.ts'],
      use: { ...devices['Desktop Safari'] },
    },
    //All other tests - WITH storageState to show how it works in the portfolio
    {
      name: 'webkit',
      testMatch: '**/*.spec.ts',
      testIgnore: ['**/login.spec.ts', '**/addToCart.spec.ts'],
      use: {
        ...devices['Desktop Safari'],
        storageState: '.auth/standard-user.json',
      },
      dependencies: ['auth'],
    },
  ],
});
