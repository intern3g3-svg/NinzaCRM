import { Page, Locator, BrowserContext} from '@playwright/test';

export class BasePage {
   page: Page;
    
    constructor(page : Page){
        this.page = page;
        //this.context = page.context();
        
    }
    async launchApp(url:string) {
    await this.page.goto(url); 
    }
    
    async getLocator(selector : string): Promise<Locator> {
        return this.page.locator(selector);
    }
    async getByRoleSelector(role: string, name: string): Promise<Locator> {
    return this.page.getByRole(role as any, { name });
}

    async click(selector : string){
        await this.page.locator(selector).click();
       //const element = await this.getLocator(selector);
        //await element.click();
    }

    async fill(selector: string, text : string){
        await this.page.locator(selector).fill(text);
        //const element = await this.getLocator(selector);
       // await element.fill(text);
    }

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