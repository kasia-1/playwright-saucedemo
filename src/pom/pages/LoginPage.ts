import { Page, expect } from '@playwright/test';
import { BasePage } from '../base/BasePage';

export type LoginUser = {
  username: string;
  password: string;
};

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.getByRole('textbox', { name: 'Username' });
  private readonly passwordInput = this.page.getByRole('textbox', { name: 'Password' });
  private readonly loginButton = this.page.getByRole('button', { name: 'Login' });
  private readonly errorMessage = this.page.getByRole('alert');

  constructor(page: Page) {
    super(page);
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
