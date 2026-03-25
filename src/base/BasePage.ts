import { Page, Locator, expect, BrowserContext} from '@playwright/test';

export class BasePage {
   page: Page;
    
    constructor(page : Page){
        this.page = page;
        //this.context = page.context();
        
    }
    async launchApp(url:string) {
    await this.page.goto(url); 
    }
      async navigate(url: string) {
    await this.page.goto(url);
    await this.page.waitForLoadState('load');
  }

    
    async getLocator(selector : string): Promise<Locator> {
        return this.page.locator(selector);
    }
    async getByRoleSelector(role: string, name: string): Promise<Locator> {
    return this.page.getByRole(role as any, { name });
}

    // async click(selector : string){
    //     await this.page.locator(selector).click();
    //    //const element = await this.getLocator(selector);
    //     //await element.click();
    // }

    async click(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await expect(locator).toBeEnabled();
    await locator.click();
  }
  async fill(locator : Locator, value:string){
    await locator.waitFor({ state: 'visible' });
    await expect(locator).toBeEnabled();
    await locator.fill(value); 
  }

  async select(locator: string, value: string) {
    await this.page.locator(locator).selectOption(value);
  }
  async getText(Locator : string) {
    return await this.page.textContent(Locator);
  }

  async getTitle() {
    return await this.page.title();
  }

    // async fill(selector: string, text : string){
    //     await this.page.locator(selector).fill(text);
    //     //const element = await this.getLocator(selector);
    //    // await element.fill(text);
    // }

    async switchToNewPage(context :BrowserContext, action: () => Promise<void>) {
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    action()
  ]);
  
  await newPage.waitForLoadState();
  return newPage;
}


async getValidationMessage(locator: Locator): Promise<string> {
    return await locator.evaluate(
      el => (el as HTMLInputElement).validationMessage
    );
  }
}