import {test,expect} from '@playwright/test';
import testdata from '../../testdata/ui/contactstestdata.json';
import { LoginPage } from '../../pages/LoginPage';
import { ContactsPage } from '../../pages/ContactsPage';
import { SelectCampaignPage } from '../../pages/SelectCampaignPage';
let lp :LoginPage;
let cp :ContactsPage;
test.describe('Contact Page', () => {
test.beforeEach(async ({page})=>{
   // lp = new LoginPage(page);
 //  await lp.launchApp(testdata.loginpage.url);
  // await lp.enterUsername(testdata.loginpage.validUsername);
  //  await lp.enterPassword(testdata.loginpage.validPassword);
   // await lp.clickLogin();
    await page.goto('http://49.249.28.218:8098/contacts', { waitUntil: 'networkidle' ,   timeout: 60000});
    cp = new ContactsPage(page);
     await cp.clickContacts();

});
test('Create Contacts',async({page, context}) =>{
 // await page.goto('http://49.249.28.218:8098/contacts', { waitUntil: 'domcontentloaded' });
   // cp = new ContactsPage(page);
   console.log(await page.url());
    //await cp.clickContacts();
    await cp.clickCreateContacts();
    await cp.enterContactName(testdata.contactspage.contactName);
    await cp.enterOrgName(testdata.contactspage.orgName);
    await cp.enterMobile(testdata.contactspage.mobile);
    await cp.enterTitle(testdata.contactspage.title);
    
    const newPage  = await cp.clickPlusButton(context);
    const campPage = new SelectCampaignPage(newPage);
    await campPage.clickSelectButton();  
    //await cp.page.bringToFront();
    await cp.clickCreateContactButton();
    
     console.log("CONTACT CREATION DONE");
});

test('validate contacts dropdown options', async() => {
 
 const dropdown = await cp.getDropdown();
 await expect(dropdown).toBeVisible();
  await expect(dropdown).toHaveText(/Search by Contact Id/);
  await expect(dropdown).toHaveText(/Search by Contact Name/);
  console.log("Selected Contact ID from dropdown");
});

test('validation error for tittle textbox', async() => {
await cp.clickCreateContacts();
    await cp.enterContactName(testdata.contactspageTitleValidation.contactName);
    await cp.enterOrgName(testdata.contactspageTitleValidation.orgName);
    await cp.enterMobile(testdata.contactspageTitleValidation.mobile);
    await cp.enterTitle(testdata.contactspageTitleValidation.title);
    await cp.clickCreateContactButton();
    const message = await cp.getTitleValidationMsg();
   await expect(message).toContain('lengthen this text');
});

test('check for toast message', async() =>{
  await cp.clickCreateContacts();
   await cp.enterContactName(testdata.toastMessageValidation.contactName);
    await cp.enterOrgName(testdata.toastMessageValidation.orgName);
    await cp.enterMobile(testdata.toastMessageValidation.mobile);
    await cp.enterTitle(testdata.toastMessageValidation.title);
     await cp.clickCreateContactButton();
     const alert = await cp.getToastAlertMessage();
     await expect(alert).toContainText('Please select a campaign before submitting');
})
});

