import { test, expect } from '@playwright/test';
import { ContactClient } from '../../clients/ContactClient';
import contactData from '../../testData/api/contacts.api.testdata.json';
import Ajv from 'ajv';

let apiContext: any;
let contactClient: ContactClient;
let createdContactId: string;
let email: string;
let mobile: string;

test.beforeEach(async ({request}) => {
  /*apiContext = await request.newContext({
    baseURL: 'http://49.249.28.218:8098',
    httpCredentials: {
      username: 'rmgyantra',
      password: 'rmgy@9999'
    }
  });*/

  contactClient = new ContactClient(request);
});


/*test('get login', async () => {
  const response = await contactClient.getLogin();
     console.log('login Status:', response.status());
    // console.log('Body:', await response.text());
  expect(response.status()).toBe(202);

});*/



test('get contact', async () => {
  const response = await contactClient.getAllContacts();
  console.log('get contact Status code:', response.status());
 // console.log('get Body:', await response.text());
  expect(response.status()).toBe(200);

  const body = await response.json();

  const schema = {
    type: 'object',
    properties: {
      campaign: {
        type: 'object',
        properties: {
          campaignId: { type: 'string' },
          campaignName: { type: 'string' },
          campaignStatus: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          description: { type: 'string' },
          expectedCloseDate: { type: 'string' },
          targetAudience: { type: 'string' },
          targetSize: { type: 'number' }
        }
      },
      contactId: { type: 'string' },
      contactName: { type: 'string' },
      department: { type: 'string' },
      email: { type: 'string' },
      mobile: { type: 'string' },
      officePhone: { type: 'string' },
      organizationName: { type: 'string' },
      title: { type: 'string' }
    }
  };

  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    formats: { "date-time": true }
  });

  const validate = ajv.compile(schema);
  const valid = validate(body);

  if (!valid) {
    console.error('Schema validation errors:', validate.errors);
  }

  expect(valid).toBe(true);
});



test.describe.serial('contact execution sequentially', () => {

  test('create contact', async () => {
    email = `t_${Date.now()}@g.com`;
    mobile = `${Math.floor(Math.random() * 1000000)}`;

    const response = await contactClient.createContact({
        ...contactData.createContact,
        email,
        mobile,
             campaign: {
                ...contactData.createContact.campaign,

             }
    
    });
    console.log('add Status code:', response.status());
  // console.log('created Body:', await response.text());
    const body = await response.json();
    createdContactId = body.contactId;
    console.log('contact id is ', createdContactId);
    expect(response.status()).toBe(201);
  });


  test('update contact', async () => {
    const response = await contactClient.updateContact(createdContactId, {
         ...contactData.updateContact,
            contactId: createdContactId,   
            email,                        
             mobile,   

      campaign: {
          ...contactData.updateContact.campaign
      }
    });
    console.log('Update Status code:', response.status());
    console.log('update contact id is :',createdContactId);
 // console.log('Updated Body:', await response.text());
    expect(response.status()).toBe(200);
  });


  test('delete contact', async () => {
    const response = await contactClient.deleteContact(createdContactId);
    console.log('Delete status code:',response.status());
    expect(response.status()).toBe(204);
  });

});