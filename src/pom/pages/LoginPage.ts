import { Page, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export type LoginUser = {
  username: string;
  password: string;
};

export class LoginPage extends BasePage {
  private readonly usernameInput = '[data-test="username"]';
  private readonly passwordInput = '[data-test="password"]';
  private readonly loginButton = '[data-test="login-button"]';
  private readonly errorMessage = '[data-test="error"]';

  constructor(page: Page) {
    super(page);
  }

  async open(): Promise<void> {
    await this.goto('/');
  }

  async login(user: LoginUser): Promise<void> {
    await this.fillInput(this.usernameInput, user.username);
    await this.fillInput(this.passwordInput, user.password);
    await this.click(this.loginButton);
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  async expectLoginInputsToHaveError(): Promise<void> {
    await expect(this.page.locator(this.usernameInput)).toHaveClass(/error/);
    await expect(this.page.locator(this.passwordInput)).toHaveClass(/error/);
  }
}
