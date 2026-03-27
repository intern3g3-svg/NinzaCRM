import {test, expect} from '@playwright/test';
import dotenv from 'dotenv';
//import { authenticatedAPIContext } from '../auth/auth.setup.api.js'
import { campaignAPI } from '../../clients/CampaignSudhaClient.js';
import { testdataAPI } from '../../testdata/api/campaignSudha.api.testdata.js';
import {campaignSchema} from '../../api-schemas/campaignSudha.api.schema.js';
import Ajv from "ajv";
dotenv.config();

test('Create Campaign', async({request}) =>{
     // 1. Create authenticated API context

     // 2. Initialize Campaign API client
 const campaign = new campaignAPI(request);

  // 3. Prepare payload
 const payload = testdataAPI.createCampaign();

  // 4. Make API call
 const response = await campaign.createCampaign(payload);

  // 5. validate response body (Basic Assertion)
 // console.log(await response.text());
 const body = await response.json();
 expect(response.status()).toBe(201);
 expect(body).toBeTruthy();
 expect(typeof body).toBe('object');

 //6. Validate Json structure (Fields Existence)
 expect(body).toHaveProperty('campaignId');
 expect(body).toHaveProperty('campaignName');
 expect(body).toHaveProperty('campaignStatus');
 expect(body).toHaveProperty('targetSize');
 expect(body).toHaveProperty('expectedCloseDate');
 expect(body).toHaveProperty('targetAudience');
 expect(body).toHaveProperty('description');
 expect(body).toHaveProperty('createdAt');

 //7.validating Data Types
 expect(typeof body.campaignId).toBe('string');
 expect(typeof body.campaignName).toBe('string');
 expect(typeof body.targetSize).toBe('number');
 expect(typeof body.campaignStatus).toBe('string');
 expect(typeof body.expectedCloseDate).toBe('string');
 expect(typeof body.targetAudience).toBe('string');
 expect(typeof body.description).toBe('string');
 
 //8.Validate Mandatory Fields
 const requiredFields = [
    'campaignId',
    'campaignName',
    'createdAt'
 ];
 // loop through to verify all requiredFields exist in response
 for(const field of requiredFields)
 {
    expect(body[field]).toBeDefined();  //checks that the API returned the field and it’s not undefined.”
 }

//  //9.Validate Success message or Error Message 
//     expect(body.message).toBe('Campaign created successfully');

//10. 
    expect(body.campaignId).toMatch(/^CAM\d+$/);  // campaignId --> starts with CAM then followed by 1 or more digits
    expect(body.campaignId.length).toBeGreaterThan(0); // campaignId length must be greater than 0
    expect(body.targetSize).toBeGreaterThan(0); // targetsize must be greater than 0
    expect(body.expectedCloseDate).toMatch(/^\d{4}-\d{2}-\d{2}$/); // validating date format yyyy-dd-mm

//11. Validate Json Schema  
    const ajv = new Ajv;  // AJV is a schema validator 
    const validate = ajv.compile(campaignSchema); // 1. AJV converts your schema into a validation function.2.campaignSchema is my predefined contract from api-schemas
    const valid = validate(body); //valid will be true if matches else false 
    expect(valid, JSON.stringify(validate.errors)).toBe(true); //assert to check true
    console.log("API test CampaignSudha-Passed");
});

// test('Get Campaign',async({api}) => {
//         // 2. Initialize Campaign API client
//  const campaign = new campaignAPI(api);

//   // 3. Prepare payload
//  const payload = testdataAPI.();

//   // 4. Make API call
//  const response = await campaign.createCampaign(payload);

// } )