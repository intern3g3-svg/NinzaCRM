import { test, expect } from '@playwright/test';
import { CampaignClient } from '../../clients/CampaignClient';
import { CampaignPage } from '../../pages/CampaignPage';
import campaignData from '../../testdata/api/campaign.api.testdata.json';

test('Create campaign via API and verify in UI', async ({ page }) => {

  // Step 1: Create API client
  const campaignClient = new CampaignClient(page.request);

  // Step 2: Create campaign via API
    const uniqueCampaignName = `${campaignData.createCampaign.campaignName} ${Date.now()}`;
    const response = await campaignClient.createCampaign({
      ...campaignData.createCampaign,
      campaignName: uniqueCampaignName,
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    const campaignId = body.campaignId;
    console.log('Created Campaign ID:', campaignId);
    console.log('Created CampaignName:', uniqueCampaignName);

  // await expect.poll(async () => {
  //   const campaignsResponse = await campaignClient.getAllCampaignsWithPagination();
  //   if (!campaignsResponse.ok()) {
  //     return false;
  //   }

    //   return body.content?.some(
    //   (campaign: { campaignName?: string }) => campaign.campaignName === uniqueCampaignName,
    // ) ?? false;
  // }, { timeout: 30000 }).toBe(true);

    // Step 3: Open UI
    await page.goto('http://49.249.28.218:8098/campaigns', { waitUntil: 'networkidle' ,   timeout: 60000});
    const cp = new CampaignPage(page);
    await cp.clickCampaigns();  // go to campaigns page
  
    // Step 4: Search campaign
    
     await cp.enterCampaignID(campaignId);
    
    // Step 5: Validate campaign is visible
   
  await expect(await cp.campaignRow(campaignId)).toBeVisible({ timeout: 30000 });

});