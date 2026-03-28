import { APIRequestContext } from '@playwright/test';
import { type Campaign } from '../api-schemas/campaign.api.schema';

export class CampaignClient {
  request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async getLogin() {
    return this.request.get('/login');
  }

  async createCampaign(data: Campaign) {
    return this.request.post('/campaign', {
      data,
    });
  }

  async updateCampaign(campaignId: string, data: Campaign) {
    return this.request.put('/campaign', {
      params: {
        campaignId,
      },
      data,
    });
  }

  async deleteCampaign(campaignId: string) {
    return this.request.delete('/campaign', {
      params: {
        campaignId,
      },
    });
  }

  async getAllCampaignsWithPagination() {
    return this.request.get('/campaign/all');
  }

  async getAllCampaigns() {
    return this.request.get('/campaign/all-campaigns');
  }
}
