import { BasePage } from '../base/BasePage';
import { Page, Locator } from '@playwright/test';

export class CampaignPage extends BasePage {
  campaignsTab: Locator;
  campaignsHeader: Locator;
  createCampaignButton: Locator;
  campaignName: Locator;
  campaignStatus: Locator;
  targetSize: Locator;
  expectedCloseDate: Locator;
  targetAudience: Locator;
  description: Locator;
  createCampaign: Locator;
  dropdown: Locator;
  searchDropdown: Locator;
  searchInput: Locator;

  constructor(page: Page) {
    super(page);
    this.campaignsTab = page.getByRole('link', { name: 'Campaigns' });
    this.campaignsHeader = page.locator('.table-title h2, h2').filter({ hasText: 'Campaigns' }).first();
    this.createCampaignButton = page.locator('button').filter({ hasText: 'Create Campaign' }).first();
    this.campaignName = page.locator('input[name="campaignName"]');
    this.campaignStatus = page.locator('input[name="campaignStatus"], select[name="campaignStatus"]');
    this.targetSize = page.locator('input[name="targetSize"]');
    this.expectedCloseDate = page.locator('input[name="expectedCloseDate"]');
    this.targetAudience = page.locator('input[name="targetAudience"]');
    this.description = page.locator('textarea[name="description"]');
    this.createCampaign = page.getByRole('button', { name: 'Create Campaign' }).last();
    this.dropdown = page.locator('select.form-control, select[name="campaignStatus"]');
    this.searchDropdown = page.locator('select').filter({ hasText: 'Search by Campaign Id' });
    this.searchInput = page.locator('.table-title input.form-control, .table-title input[type="text"]').first();
  }

  async waitForCampaignsPage() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.campaignsHeader.waitFor({ state: 'visible' });
    await this.searchDropdown.waitFor({ state: 'visible' });
  }

  async clickCampaigns() {
    if (this.page.url().includes('/campaigns')) {
      await this.waitForCampaignsPage();
      return;
    }

    await this.campaignsTab.click();
    await this.waitForCampaignsPage();
  }

  async clickCreateCampaigns() {
    await this.createCampaignButton.waitFor({ state: 'visible' });
    await this.createCampaignButton.click();
    console.log('clicked');
  }

  async enterCampaignName(name: string) {
    await this.campaignName.fill(name);
  }

  async enterCampaignStatus(status: string) {
    const tagName = await this.campaignStatus.evaluate((el) => el.tagName.toLowerCase());
    if (tagName === 'select') {
      await this.campaignStatus.selectOption({ label: status }).catch(async () => {
        await this.campaignStatus.selectOption(status);
      });
      return;
    }
    await this.campaignStatus.fill(status);
  }

  async enterTargetSize(size: string) {
    await this.targetSize.fill(size);
  }

  async enterExpectedCloseDate(date: string) {
    await this.expectedCloseDate.fill(date);
  }

  async enterTargetAudience(audience: string) {
    await this.targetAudience.fill(audience);
  }

  async enterDescription(text: string) {
    await this.description.fill(text);
  }

  async clickCreateCampaignButton() {
    await this.createCampaign.click();
  }

  async getDropdown() {
    return this.dropdown;
  }

  async selectSearchByCampaignName() {
    await this.searchDropdown.selectOption('campaignName');
  }

  async enterSearchText(text: string) {
    await this.searchInput.fill(text);
  }

  async searchCampaignByName(name: string) {
    await this.selectSearchByCampaignName();
    await this.searchInput.click();
    await this.searchInput.fill(name);
    await this.searchInput.press('Enter');
  }

  campaignRow(name: string) {
    return this.page.locator('table.table-striped tr').filter({ hasText: name });
  }
}
