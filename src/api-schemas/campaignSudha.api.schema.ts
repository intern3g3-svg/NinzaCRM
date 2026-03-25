export const campaignSchema = {
    type: "object",
    required: [
        "campaignId",
        "campaignName",
        "campaignStatus",
        "createdAt",
        "targetSize"
    ],
    properties: {
    campaignId: { type: "string"},
    campaignName: {type: "string"},
    campaignStatus: {type: "string"},
    targetSize: {type: "number"},
    expectedCloseDate: {type: "string"},
    targetAudience: {type: "string"},
    description: {type: "string"},
    createdAt: {type: "string"},
    }
};