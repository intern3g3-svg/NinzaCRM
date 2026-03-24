import { test as setup, expect} from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();
setup('authenticate',async({page}) =>{
   // await page.goto('http://49.249.28.218:8098');
   await page.goto(process.env.BASE_URL!);
   //await page.fill('#username', 'rmgyantra');    
   // await page.fill('#inputPassword','rmgy@9999');
    await page.fill('#username',process.env.NINZA_USERNAME!);
    await page.fill('#inputPassword',process.env.NINZA_PASSWORD!);
   //  await lp.enterPassword(process.env.NINZA_PASSWORD!);
    await page.locator('button:has-text("Sign In")').click();
    await page.waitForURL('**/dashboard');
    await expect(page.getByRole('heading', { name: 'Campaigns' })).toBeVisible();

    await page.context().storageState({
        path:'playwright/.auth/user.json'
    });
});
