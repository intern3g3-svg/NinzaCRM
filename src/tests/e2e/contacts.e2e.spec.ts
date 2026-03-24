import { test, expect } from '@playwright/test';
import { ContactClient } from '../../clients/ContactClient';
import { ContactsPage } from '../../pages/ContactsPage';
import contactData from '../../testData/api/contacts.api.testdata.json';
let email: string;
let mobile: string;
test('Create contact via API and verify in UI', async ({ page, request }) => {
     email = `t_${Date.now()}@g.com`;
    mobile = `${Math.floor(Math.random() * 1000000)}`;

  // Step 1: Create API client
  const contactClient = new ContactClient(request);

  // Step 2: Create contact via API
  const response = await contactClient.createContact({
  ...contactData.createContact,
  email,
  mobile,
  campaign: {
    ...contactData.createContact.campaign,
  }
});
expect(response.status()).toBe(201);
const body = await response.json();
const contactId = body.contactId;
console.log('Created Contact ID:', contactId);

  // Step 3: Open UI
  await page.goto('http://49.249.28.218:8098/contacts', { waitUntil: 'networkidle' ,   timeout: 60000});
  const cp = new ContactsPage(page);
  await cp.clickContacts();  // go to contacts page

  // Step 4: Search contact
  
   await cp.enterContactID(contactId);
  
  // Step 5: Validate contact is visible
 
await expect(await cp.contactRow(contactId)).toBeVisible({ timeout: 30000 });
});