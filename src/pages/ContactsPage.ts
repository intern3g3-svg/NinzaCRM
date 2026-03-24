import { BasePage } from "../base/BasePage";
import { Page, expect , Locator, BrowserContext } from '@playwright/test';

export class ContactsPage extends BasePage {
   
  contactsTab: Locator;
  createContactButton:Locator;
 contactName: Locator;
 orgName:Locator;
 title:Locator;
 mobile:Locator;
 plusButton:Locator;
 createContact:Locator;
 //firstSelectButton:Locator;
 dropdown:Locator;
 alertMessage:Locator;
 searchInput:Locator;
  
    constructor(page :Page) {
        super(page);
       
       // this.contactsTab = 'link:has-text("Contacts")';
        //this.createContactButton = 'button:has-text("Create Contact")';
        this.contactsTab =   page.getByRole('link', { name: 'Contacts' });
        this.createContactButton = page.getByRole('button',{name :'Create Contact'});
        this.contactName =  page.locator('input[name="contactName"]');
        this.orgName = page.locator('input[name="organizationName"]');
        this.title =page.locator('input[name="title"]');
        this.mobile =page.locator('input[name="mobile"]');
        this.plusButton =  page.locator('button:has([data-icon="plus"])');
        //this.firstSelectButton = newPage.locator('tbody tr').first().locator('button.select-btn');
        this.createContact  =  page.getByRole('button', {name:'Create Contact'});

        this.dropdown = page.locator('select.form-control');
        this.alertMessage = page.getByRole('alert');
        this.searchInput = page.locator('input[placeholder="Search by Contact Id"]');

    }

    
    
    async clickContacts(){
        await this.contactsTab.click();
    }
    async clickCreateContacts(){
        await this.createContactButton.click();
         console.log("clicked");
    }

    async enterContactName(name : string){
        await this.contactName.fill(name);
    }

    async enterOrgName(name :string){
        await this.orgName.fill(name);
    }
    async enterMobile(name : string){
        await this.mobile.fill(name);

    }
    async enterTitle(name : string){
        await this.title.fill(name);
    }
    
    
          async clickPlusButton(context :BrowserContext) {
  return await this.switchToNewPage(context, async () => {
    await this.plusButton.click();
  });
}

  async clickCreateContactButton(){
    await this.createContact.click();
  }

  async getDropdown(){
   
    this.dropdown.selectOption('contactId');
     return this.dropdown;
  }

  async getTitleValidationMsg(){
    return await this.getValidationMessage(this.title);
  }
  async getToastAlertMessage(){
    return  await this.alertMessage;
  }
  
  async enterContactID(contactId: string){
    return await this.searchInput.fill(contactId);
    //await this.searchInput.press('Enter');
  }

  async contactRow(contactId: string) {
       return this.page.locator(`table tr.tr >> td:first-child:text-is("${contactId}")`).first();
}
}
   
