import responses from '../default.responses';

const bets = {
  '/api/v1/bets': {
    post: {
      tags: ['bets'],
      security: {
        JWT: [],
      },
      summary: 'create',
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          schema: {
            example: {
              game: 'gameId',
              iWin: 5,
              iToBet: 2,
              status: 'WIN',
              playerData: {
                any: 'data',
              },
              currency: 'USD',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    get: {
      tags: ['bets'],
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
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/bets/{id}': {
    get: {
      tags: ['bets'],
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
    put: {
      tags: ['bets'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'update',
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
          name: 'user',
          required: true,
          schema: {
            example: {
              game: 'gameId',
              iWin: 5,
              iToBet: 2,
              status: 'WIN',
              playerData: {
                any: 'data',
              },
              currency: 'USD',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    delete: {
      tags: ['bets'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'delete',
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
};

export default bets;
