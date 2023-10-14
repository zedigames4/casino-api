import responses from '../default.responses';

const users = {
  '/api/v1/users': {
    post: {
      tags: ['Users'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'create',
      parameters: [
        {
          in: 'body',
          name: 'user',
          required: true,
          schema: {
            example: {
              firstName: '',
              lastName: '',
              phoneNumber: '',
              email: '',
              password: '',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    get: {
      tags: ['Users'],
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
          name: 'search',
          required: false,
          description:
            'Field to search in are: firstName, lastName, verified, phoneNumber, and role',
          schema: {
            type: 'string',
            example: 'admin',
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/users/{id}': {
    get: {
      tags: ['Users'],
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
      tags: ['Users'],
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
              firstName: '',
              lastName: '',
              phoneNumber: '',
              email: '',
              password: '',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    delete: {
      tags: ['Users'],
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

  '/api/v1/users/{userId}/referrals': {
    get: {
      tags: ['Users'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'findAllReferrals',
      parameters: [
        {
          in: 'path',
          name: 'userId',
          required: true,
          schema: {
            type: 'string',
          },
        },
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
};

export default users;
