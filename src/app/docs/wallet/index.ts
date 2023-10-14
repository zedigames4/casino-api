import responses from '../default.responses';

const wallets = {
  '/api/v1/wallets': {
    post: {
      tags: ['wallets'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'create',
      consumes: ['application/json'],
      responses,
    },
    get: {
      tags: ['wallets'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'findAll',
      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/wallets/{id}': {
    get: {
      tags: ['wallets'],
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

  '/api/v1/wallets/{id}/main-wallet': {
    post: {
      tags: ['wallets'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'set main wallet',
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

  '/api/v1/wallets/{id}/minimum-balance': {
    post: {
      tags: ['wallets'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'set minimum balance',
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
          name: 'wallet',
          required: true,
          schema: {
            example: {
              minimumBalance: 0,
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
};

export default wallets;
