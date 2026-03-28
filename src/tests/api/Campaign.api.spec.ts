import { test, expect, request, type APIRequestContext } from '@playwright/test';
import { CampaignClient } from '../../clients/CampaignClient';
import campaignData from '../../testdata/api/campaign.api.testdata.json';
import { campaignGetAllSchema } from '../../api-schemas/campaign.api.schema';
import Ajv from 'ajv';

let apiContext: APIRequestContext;
let campaignClient: CampaignClient;
let createdCampaignId: string | undefined;

test.beforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: process.env.BASE_URL!,
    httpCredentials: {
      username: process.env.NINZA_USERNAME!,
      password: process.env.NINZA_PASSWORD!,
    },
  });
  campaignClient = new CampaignClient(apiContext);
});

test.afterAll(async () => {
  await apiContext.dispose();
});

test('get login', async () => {
  const response = await campaignClient.getLogin();
  console.log('Login Status:', response.status());
  expect(response.status()).toBe(202);
});

test('get campaign', async () => {
  const response = await campaignClient.getAllCampaignsWithPagination(); // matches content/pageable schema
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toContain('application/json');

  const body = await response.json();

  const ajv = new Ajv({
    allErrors: true,
    strict: false,
    formats: { 'date-time': true },
  });

  const validate = ajv.compile(campaignGetAllSchema);
  const valid = validate(body);

  expect(valid, JSON.stringify(validate.errors, null, 2)).toBe(true);
});

test.describe.serial('campaign execution sequentially', () => {
  test('create campaign', async () => {
    const uniqueCampaignName = `${campaignData.createCampaign.campaignName} ${Date.now()}`;

    const response = await campaignClient.createCampaign({
      ...campaignData.createCampaign,
      campaignName: uniqueCampaignName,
    });
    console.log('Add Status code:', response.status());
    const body = await response.json();
    createdCampaignId = body.campaignId || body.campaign?.campaignId;
    console.log('Campaign ID:', createdCampaignId);
    expect(response.status()).toBe(201);
    expect(createdCampaignId).toBeTruthy();
  });

  test('update campaign', async () => {
    expect(createdCampaignId, 'Campaign ID should exist before update').toBeTruthy();
    const response = await campaignClient.updateCampaign(createdCampaignId!, {
      ...campaignData.updateCampaign,
      campaignId: createdCampaignId!,
    });
    console.log('Update Status code:', response.status());
    console.log('Updated Campaign ID:', createdCampaignId);
    expect(response.status()).toBe(200);
  });

  test('delete campaign', async () => {
    expect(createdCampaignId, 'Campaign ID should exist before delete').toBeTruthy();
    const response = await campaignClient.deleteCampaign(createdCampaignId!);
    console.log('Delete Status code:', response.status());
    expect(response.status()).toBe(204);
  });
});

test.describe('campaign field validations from user story', () => {
  test('should reject blank campaign name', async () => {
    const response = await campaignClient.createCampaign({
      ...campaignData.invalidCampaigns.missingCampaignName,
    });

    console.log('Blank campaign name Status code:', response.status());
    expect(response.status()).toBe(500);
  });

  test('should reject negative target size', async () => {
    const response = await campaignClient.createCampaign({
      ...campaignData.invalidCampaigns.negativeTargetSize,
    });

    console.log('Negative target size Status code:', response.status());
    expect(response.status()).toBe(500);
  });

  test('should reject invalid expected close date format (not dd-mm-yyyy)', async () => {
    const response = await campaignClient.createCampaign({
      ...campaignData.invalidCampaigns.invalidExpectedCloseDate,
    });

    console.log('Invalid expected close date Status code:', response.status());
    expect(response.status()).toBe(500);
  });
});