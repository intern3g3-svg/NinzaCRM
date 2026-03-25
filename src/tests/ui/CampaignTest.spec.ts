import { test, APIRequestContext } from '@playwright/test';
import testdata from '../../testdata/ui/campaign-testdata.json';
import { CampaignPage } from '../../pages/CampaignPage';

let cp: CampaignPage;

async function isServerReachable(apiRequest: APIRequestContext, baseUrl: string): Promise<boolean> {
  try {
    const response = await apiRequest.get(baseUrl, { timeout: 8000 });
    return response.status() < 500;
  } catch {
    return false;
  }
}

test.describe('Campaign Page', () => {
  test.beforeEach(async ({ page, request }) => {
    test.skip(!process.env.BASE_URL, 'BASE_URL is not configured');

    const reachable = await isServerReachable(request, process.env.BASE_URL!);
    test.skip(!reachable, `Server is down or unreachable: ${process.env.BASE_URL}`);

    cp = new CampaignPage(page);
  });

  test('Create Campaigns', async ({ page }) => {
    await page.goto(`${process.env.BASE_URL}/campaigns`);
    await cp.waitForCampaignsPage();
    await cp.clickCreateCampaigns();
    await cp.enterCampaignName(testdata.campaignpage.campaignName);
    await cp.enterCampaignStatus(testdata.campaignpage.campaignStatus);
    await cp.enterTargetSize(testdata.campaignpage.targetSize);
    await cp.enterExpectedCloseDate(testdata.campaignpage.expectedCloseDate);
    await cp.enterTargetAudience(testdata.campaignpage.targetAudience);
    await cp.enterDescription(testdata.campaignpage.description);
    await cp.clickCreateCampaignButton();

    console.log('CAMPAIGN CREATION DONE');
  });

  test('validate campaign status dropdown options', async () => {
    await cp.page.goto(`${process.env.BASE_URL}/campaigns`);
    await cp.waitForCampaignsPage();
    await cp.getDropdown();
  });
});
