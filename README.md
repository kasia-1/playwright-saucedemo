# Playwright SauceDemo Test Automation

A professional, enterprise-grade test automation framework demonstrating modern Playwright best practices for QA engineers and test automation specialists.

## 🎯 Key Features

- **Page Object Model (POM)** - Clean separation of UI locators and test logic
- **Auto Fixtures** - Reusable test setup with dependency injection
- **TypeScript** - Type-safe test code with full IDE support
- **Multi-browser Testing** - Chromium, Firefox, and WebKit out of the box
- **Environment-based Configuration** - Externalized test data and credentials
- **Comprehensive Test Coverage** - Authentication, UI flows, and user interactions

## 🚀 Quick Start

```bash
# Install dependencies
npm install
npx playwright install

# Create environment file
cp .env.example .env

# Run tests
npm test
```

## 📁 Project Structure

```
src/
├── pom/
│   ├── pages/       # Page Objects (LoginPage, InventoryPage, CartPage, etc.)
│   └── components/  # Reusable UI components (AppMenu, etc.)
├── fixtures/        # Playwright test fixtures and setup
└── data/           # Test data (users, test constants)

tests/              # Test specs organized by feature
playwright.config.ts  # Playwright configuration
```

## 🏗️ Architecture Highlights

### Page Object Model

All UI interactions are encapsulated in dedicated page classes:

```typescript
// pages/LoginPage.ts
export class LoginPage {
  async login(username: string, password: string) {}
  async expectErrorMessage(message: string) {}
}
```

### Test Fixtures

Auto-fixtures provide reusable test setup:

```typescript
test('add to cart', async ({ page, loggedInStandardUser }) => {
  // User is automatically logged in before test runs
});
```

### Environment Variables

Credentials and configuration from `.env`:

```typescript
export const users = {
  standard: {
    username: process.env.SAUCE_DEMO_USERNAME!,
    password: process.env.SAUCE_DEMO_PASSWORD!,
  },
};
```

## 🧪 Running Tests

```bash
# All tests
npm test

# Interactive UI mode
npm run test:ui

# Specific browser
npm run test:chrome

# Filter by tags
npm run test:smoke
npm run test:regression
```

## 📋 Test Coverage

Tests cover authentication, user workflows, and shopping cart interactions across SauceDemo application.

## 🛠️ Development

```bash
npm run lint          # Check code quality
npm run lint:fix      # Fix linting issues
npm run format        # Format code
npm run test:debug    # Run with Playwright Inspector
```

## 🔧 Configuration

Key files:

- `playwright.config.ts` - Test configuration (browsers, timeouts, reporters)
- `.env.example` - Environment variables template
- `tsconfig.json` - TypeScript configuration

## 📝 License

MIT

## 👤 Author

Katarzyna Kłosowska
