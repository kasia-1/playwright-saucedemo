import { Page } from '@playwright/test';

export class AppMenu {
  private readonly menuButton = this.page.getByRole('button', { name: 'Open Menu' });
  private readonly logoutLink = this.page.getByRole('button', { name: 'Logout' });

  constructor(private readonly page: Page) {}

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
