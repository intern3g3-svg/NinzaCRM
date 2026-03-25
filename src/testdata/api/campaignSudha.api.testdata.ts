import { randomUUID } from "crypto"

export const testdataAPI = {
createCampaign: () => ({
  campaignName: `AutomationCampaign_${randomUUID()}`,
  campaignStatus: "Active",
  description: "created via API Playwright",
  expectedCloseDate: "2026-03-30",
  targetAudience: "students",
  targetSize: 1000
})
}