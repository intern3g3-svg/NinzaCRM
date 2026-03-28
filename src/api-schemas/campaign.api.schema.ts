export type Campaign = {
  campaignId?: string;
  campaignName: string;
  campaignStatus: string;
  createdAt?: string;
  description: string;
  expectedCloseDate: string;
  targetAudience: string;
  targetSize: number;
};

export const campaignSchema = {
  type: 'object',
  properties: {
    'campaign': {
      'type': 'object',
      'properties': {
        'campaignId': {
          'type': 'string'
        },
        'campaignName': {
          'type': 'string'
        },
        'campaignStatus': {
          'type': 'string'
        },
        'createdAt': {
          'type': 'string',
          'format': 'date-time'
        },
        'description': {
          'type': 'string'
        },
        'expectedCloseDate': {
          'type': 'string'
        },
        'targetAudience': {
          'type': 'string'
        },
        'targetSize': {
          'type': 'integer',
          'format': 'int32'
        }
      },
      'title': 'Campaign'
    }
  }
};

export const campaignGetAllSchema = {
  type: 'object',
  required: [
    'content',
    'pageable',
    'last',
    'totalPages',
    'totalElements',
    'size',
    'number',
    'sort',
    'first',
    'numberOfElements',
    'empty',
  ],
  properties: {
    content: {
      type: 'array',
      items: {
        type: 'object',
        required: [
          'campaignId',
          'campaignName',
          'campaignStatus',
          'targetSize',
          'expectedCloseDate',
          'targetAudience',
          'description',
          'createdAt',
        ],
        properties: {
          campaignId: { type: 'string' },
          campaignName: { type: 'string' },
          campaignStatus: { type: 'string' },
          targetSize: { type: 'integer' },
          expectedCloseDate: { type: 'string' },
          targetAudience: { type: 'string' },
          description: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
        },
      },
    },
    pageable: {
      type: 'object',
      required: ['sort', 'offset', 'pageSize', 'pageNumber', 'unpaged', 'paged'],
      properties: {
        sort: {
          type: 'object',
          required: ['unsorted', 'sorted', 'empty'],
          properties: {
            unsorted: { type: 'boolean' },
            sorted: { type: 'boolean' },
            empty: { type: 'boolean' },
          },
        },
        offset: { type: 'integer' },
        pageSize: { type: 'integer' },
        pageNumber: { type: 'integer' },
        unpaged: { type: 'boolean' },
        paged: { type: 'boolean' },
      },
    },
    last: { type: 'boolean' },
    totalPages: { type: 'integer' },
    totalElements: { type: 'integer' },
    size: { type: 'integer' },
    number: { type: 'integer' },
    sort: {
      type: 'object',
      required: ['unsorted', 'sorted', 'empty'],
      properties: {
        unsorted: { type: 'boolean' },
        sorted: { type: 'boolean' },
        empty: { type: 'boolean' },
      },
    },
    first: { type: 'boolean' },
    numberOfElements: { type: 'integer' },
    empty: { type: 'boolean' },
  },
};