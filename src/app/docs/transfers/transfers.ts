import responses from '../default.responses';

const transfers = {
  '/api/v1/transfers': {
    post: {
      tags: ['transfers'],
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
              receiver: '',
              amount: 100,
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
    get: {
      tags: ['transfers'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'findAll',
      description:
        'Returns the filtered transfers according to the passed parameters',
      parameters: [
        {
          in: 'query',
          name: 'action',
          description: `Allowed values are: 'deposit', 'transfer', 'withdraw'`,
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'status',
          description:
            'Status of Transaction, allowed values are: SUCCESSFUL, PENDING, FAILED',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'mode',
          description: 'Mode of Transaction, ex: mtnrwanda',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          in: 'query',
          name: 'user',
          description: 'user id of the the sender',
          required: false,
          schema: {
            type: 'string',
          },
        },

        {
          in: 'query',
          name: 'receiver',
          description:
            'user id of the the receiver; this will happen on transfer action',
          required: false,
          schema: {
            type: 'string',
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/transfers/{id}': {
    get: {
      tags: ['transfers'],
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
};

export default transfers;
