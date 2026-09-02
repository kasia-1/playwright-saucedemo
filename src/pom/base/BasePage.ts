import { Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async fillInput(locator: string, text: string): Promise<void> {
    await this.page.locator(locator).fill(text);
  }

  async click(locator: string): Promise<void> {
    await this.page.locator(locator).click();
  }

  async getText(locator: string): Promise<string> {
    const text = await this.page.locator(locator).textContent();
    return text || '';
  }

  async waitForElement(locator: string): Promise<void> {
    await this.page.locator(locator).waitFor({ state: 'visible' });
  }

  async isElementVisible(locator: string): Promise<boolean> {
    return this.page.locator(locator).isVisible();
  }
}
