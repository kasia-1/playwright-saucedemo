import { Page } from '@playwright/test';
import { BasePage } from '../base/BasePage';
import { AppMenu } from '../components/AppMenu';

export class AuthenticatedPage extends BasePage {
    readonly appMenu: AppMenu;

    constructor(page: Page) {
        super(page);
        this.appMenu = new AppMenu(page);
    }
}