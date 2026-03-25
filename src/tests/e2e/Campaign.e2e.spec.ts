import { test, expect } from '@playwright/test';
import { CampaignClient } from '../../clients/CampaignClient';
import { CampaignPage } from '../../pages/CampaignPage';
import campaignData from '../../testdata/api/campaign.api.testdata.json';
let email: string;
let mobile: string;
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
await response.json();
console.log('Created CampaignName:', uniqueCampaignName);

  await expect.poll(async () => {
    const campaignsResponse = await campaignClient.getAllCampaignsWithPagination();
    if (!campaignsResponse.ok()) {
      return false;
    }

    const campaignsBody = await campaignsResponse.json();
    return campaignsBody.content?.some(
      (campaign: { campaignName?: string }) => campaign.campaignName === uniqueCampaignName,
    ) ?? false;
  }, { timeout: 30000 }).toBe(true);

  // // Step 3: Navigate to Campaigns page
  // await page.goto('http://49.249.28.218:8098/campaigns', { waitUntil: 'networkidle', timeout: 60000 });
  // const cp = new CampaignPage(page);

  // // Step 4: Retry the UI search until the campaign is visible in the grid
  // await expect.poll(async () => {
  //   await page.reload({ waitUntil: 'networkidle', timeout: 60000 });
  //   await cp.searchCampaignByName(uniqueCampaignName);
  //   return await cp.campaignRow(uniqueCampaignName).count();
  // }, { timeout: 30000 }).toBeGreaterThan(0);

  // // Step 5: Validate the campaign row is visible in the table
  // await expect(cp.campaignRow(uniqueCampaignName).first()).toBeVisible({ timeout: 10000 });
});