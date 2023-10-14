import responses from '../default.responses';

const games = {
  '/api/v1/games': {
    post: {
      tags: ['games'],
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
              images: [''],
              title: '',
              description: '',
              url: '',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    get: {
      tags: ['games'],
      security: [],
      summary: 'findAll',
      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/games/{id}': {
    get: {
      tags: ['games'],
      security: [],
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
      tags: ['games'],
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
              images: [''],
              title: '',
              description: '',
              url: '',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    delete: {
      tags: ['games'],
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

export default games;
