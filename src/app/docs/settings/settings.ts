import responses from '../default.responses';

const settings = {
  '/api/v1/settings': {
    post: {
      tags: ['settings'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'create',
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          schema: {
            example: {
              dollarToRwf: 1,
              isGlobal: false,
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    get: {
      tags: ['settings'],
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
  '/api/v1/settings/{id}': {
    get: {
      tags: ['settings'],
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
      tags: ['settings'],
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
              dollarToRwf: 1,
              isGlobal: false,
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    delete: {
      tags: ['settings'],
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

export default settings;
