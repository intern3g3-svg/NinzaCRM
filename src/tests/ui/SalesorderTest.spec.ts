import {test, expect} from '@playwright/test';
import {salesOrderPage} from '../../pages/SalesorderPage.js';
import {testdata} from '../../testdata/ui/Salesorder.testdata.js';


test('search sales order', async ({page}) =>{
    const sp = new salesOrderPage(page);
    await sp.navigate('http://49.249.28.218:8098/campaigns');
    await page.waitForTimeout(1000);
    await page.waitForLoadState();
    await page.waitForTimeout(1000);
    await sp.clickSalesOrder();
    await page.waitForTimeout(1000);
    await page.waitForTimeout(1000);
    await sp.selectSearchByOrderID();
    await sp.fillSearchByOrderId(testdata.SalesOrderSearch.searchById);
    await sp.validationSearchResult(sp.searchByOrderResult,testdata.SalesOrderSearch.searchById);
  //  await sp.validationSearchResult(sp.searchBySubjectResult,testdata.SalesOrderSearch.searchById);
    page.pause();
})