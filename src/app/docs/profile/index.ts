import responses from '../default.responses';

const profile = {
  '/api/v1/profile/me': {
    get: {
      tags: ['profile'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'findOne',
      consumes: ['application/json'],
      responses,
    },
    put: {
      tags: ['profile'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'update',
      consumes: ['application/json'],
      responses,
    },
    delete: {
      tags: ['profile'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'delete',
      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/profile/me/wallet': {
    get: {
      tags: ['profile'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'my wallet',
      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/profile/me/referral-code': {
    patch: {
      tags: ['profile'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'update referral code',
      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/profile/me/topup': {
    post: {
      tags: ['profile'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'topup',
      consumes: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          schema: {
            example: {
              amount: 500,
            },
          },
        },
      ],
      responses,
    },
  },
  '/api/v1/profile/me/withdraw': {
    post: {
      tags: ['profile'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'withdraw',
      consumes: ['application/json'],
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          schema: {
            example: {
              amount: 500,
            },
          },
        },
      ],
      responses,
    },
  },
};

export default profile;
