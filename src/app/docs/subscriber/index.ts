import responses from '../default.responses';

const subscribers = {
  '/api/v1/subscribers': {
    post: {
      tags: ['subscribers'],
      security: [],
      summary: 'create',
      parameters: [
        {
          in: 'body',
          name: 'data',
          required: true,
          schema: {
            example: {
              email: 'user@playinrwanda.com',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    get: {
      tags: ['subscribers'],
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
  '/api/v1/subscribers/{id}': {
    get: {
      tags: ['subscribers'],
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
      tags: ['subscribers'],
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
              email: 'user@playinrwanda.com',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    delete: {
      tags: ['subscribers'],
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

export default subscribers;
