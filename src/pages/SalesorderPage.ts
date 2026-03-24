import type { Page, Locator } from '@playwright/test';
import {expect} from '@playwright/test';
import { BasePage } from '../base/BasePage'; 
// import {LoginPage } from './login.page.ts';
//import {page} from '@playwright/test';

export class salesOrderPage extends BasePage {
salesOrder: Locator;
searchByOrderResult: Locator;
// searchBySubjectResult: Locator;
searchDropdown: Locator;
searchInput: Locator;


constructor(page : Page) {
    super(page)
    this.salesOrder = this.page.getByRole('link', {name : "Sales Order"});
  //  this.searchSalesOrder = this.page.locator('.form-control').nth(0);
    this.searchDropdown = this.page.locator('select.form-control');
    this.searchInput = this.page.locator('.form-control').nth(1);
    this.searchByOrderResult = this.page.locator('table tbody tr td:nth-child(1)');
 //   this.searchBySubjectResult = this.page.locator('table tbody tr td:nth-child(2)');
}

async clickSalesOrder()
{
    await this.click(this.salesOrder);
}
// async clickSearchBox()
// {
//     await this.click(this.searchSalesOrder);
// }

async selectSearchByOrderID()
{
    await this.searchDropdown.selectOption('orderId');
}

async selectSearchBySubject()
{
    await this.searchDropdown.selectOption('subject');
}
async fillSearchByOrderId(orderId : string)
{
    await this.fill(this.searchInput, orderId);
}
async validationSearchResult(searchsalesOrderBy : Locator, expectedText : string)
{
   await expect.soft(searchsalesOrderBy).toContainText(expectedText);
}

}