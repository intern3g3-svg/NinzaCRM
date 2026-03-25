import type { APIRequestContext } from "@playwright/test";
export class campaignAPI{
    constructor(private api: APIRequestContext) {}

    async getAllCampaign()
    {
        return await this.api.get('/campaign/all');
    }
    async getCountCampaign()
    {
        return await this.api.get('/campaign/count');
    }
    async getStatsCampaign()
    {
        return await this.api.get('/campaign/stats?range=7D')
    }
    async createCampaign(data:any)
    {
        return await this.api.post('/campaign', {
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            data: data
        });
    }
    async deleteCampaign(campaignID : string)
    {
        if(!campaignID)
        {
            throw new Error('Valid CampaignID is required for deleteCampaign');
        }
        return this.api.delete('/campaign?campaignId=${campaignID}');
    }
}