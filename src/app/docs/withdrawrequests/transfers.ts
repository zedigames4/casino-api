import responses from '../default.responses';

const withdrawrequests = {
  '/api/v1/withdrawrequests': {
    post: {
      tags: ['withdrawrequests'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'create',
      parameters: [
        {
          in: 'body',
          name: 'request',
          required: true,
          schema: {
            example: {
              amount: 100,
              receiverPhoneNumber: '0780728136',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    get: {
      tags: ['withdrawrequests'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'findAll',
      parameters: [
        {
          in: 'query',
          name: 'page',
          required: false,
          schema: {
            type: 'integer',
          },
        },
        {
          in: 'query',
          name: 'limit',
          required: false,
          schema: {
            type: 'integer',
          },
        },
        {
          in: 'query',
          name: 'status',
          required: false,
          description: `Filter by status, allowed values: 'APPROVED', 'PENDING', 'REJECTED'`,
          schema: {
            type: 'string',
            example: 'PENDING',
          },
        },
        {
          in: 'query',
          name: 'userId',
          required: false,
          description: `Filter by userId, it will be resetted to the authenticated user if is not admin or other allowed users.`,
          schema: {
            type: 'string',
            example: '639eceff7c6e195316f31d56',
          },
        },
      ],
      description:
        'Returns the filtered withdrawrequests according to the passed parameters',

      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/withdrawrequests/{id}': {
    get: {
      tags: ['withdrawrequests'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'findOne',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },

  '/api/v1/withdrawrequests/{id}/decide': {
    post: {
      tags: ['withdrawrequests'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'decide',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'body',
          name: 'request',
          required: true,
          schema: {
            example: {
              decision: 'APPROVED',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
};

export default withdrawrequests;
