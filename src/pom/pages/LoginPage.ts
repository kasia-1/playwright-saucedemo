import { Page, expect, Locator } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export type LoginUser = {
  username: string;
  password: string;
};

export class LoginPage extends BasePage {
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = this.page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = this.page.getByRole('textbox', { name: 'Password' });
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  async open(): Promise<void> {
    await this.goto('/');
  }

  async login(user: LoginUser): Promise<void> {
    await this.fillInput(this.usernameInput, user.username);
    await this.fillInput(this.passwordInput, user.password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorMessage);
  }

  async expectLoginInputsToHaveError(): Promise<void> {
    await expect(this.usernameInput).toHaveClass(/error/);
    await expect(this.passwordInput).toHaveClass(/error/);
  }
}
