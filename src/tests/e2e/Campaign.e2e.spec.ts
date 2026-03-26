import { test, expect } from '@playwright/test';
import { CampaignClient } from '../../clients/CampaignClient';
import { CampaignPage } from '../../pages/CampaignPage';
import campaignData from '../../testdata/api/campaign.api.testdata.json';
let email: string;
let mobile: string;
test.setTimeout(90000);
test('Create campaign via API and verify in UI', async ({ page }) => {
     email = `t_${Date.now()}@g.com`;
    mobile = `${Math.floor(Math.random() * 1000000)}`;

  // Step 1: Create API client
  const campaignClient = new CampaignClient(page.request);

  // Step 2: Create campaign via API
    const uniqueCampaignName = `${campaignData.createCampaign.campaignName} ${Date.now()}`;
    const response = await campaignClient.createCampaign({
      ...campaignData.createCampaign,
      campaignName: uniqueCampaignName,
    });
    expect(response.status()).toBe(201);
    console.log('Created CampaignName:', uniqueCampaignName);
    console.log('Add Status code:', response.status());
    const body = await response.json();
    const createdCampaignId = body.campaignId || body.campaign?.campaignId;
    console.log('Campaign ID:', createdCampaignId);

  // Step 3: Navigate to Campaigns page
     await page.goto('http://49.249.28.218:8098/campaigns', { waitUntil: 'domcontentloaded', timeout: 60000 });

    const cp = new CampaignPage(page);
    await cp.clickCampaigns();  

    //await cp.waitForCampaignsPage();
    await cp.enterCampaignId(createdCampaignId);

  // Step 4: Search contact
  
    await cp.enterCampaignId(createdCampaignId);
  
  // Step 5: Validate contact is visible
 
await expect(await cp.campaignRow(createdCampaignId)).toBeVisible({ timeout: 30000 });

});