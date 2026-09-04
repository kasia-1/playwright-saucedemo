import { Page } from '@playwright/test';

export class AppMenu {
    private readonly menuButton = '#react-burger-menu-btn';
    private readonly logoutLink = '#logout_sidebar_link';

    constructor(private readonly page: Page) {}

    async logout(): Promise<void> {
        await this.page.locator(this.menuButton).click();
        await this.page.locator(this.logoutLink).click();
    }
}