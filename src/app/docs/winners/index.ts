import responses from '../default.responses';

const winners = {
  '/api/v1/winners/biggest': {
    get: {
      tags: ['winners'],
      // security: [
      //   {
      //     JWT: [],
      //   },
      // ],
      parameters: [
        {
          in: 'query',
          name: 'isEncrypted',
          required: false,
          schema: {
            type: 'integer',
            example: 0,
          },
        },
      ],
      summary: 'findAll',
      consumes: ['application/json'],
      responses,
    },
  },

  '/api/v1/winners/latest': {
    get: {
      tags: ['winners'],
      // security: [
      //   {
      //     JWT: [],
      //   },
      // ],
      // parameters: [
      //   {
      //     in: 'query',
      //     name: 'isEncrypted',
      //     required: false,
      //     schema: {
      //       type: 'integer',
      //       example: 0,
      //     },
      //   },
      // ],
      summary: 'findAll',
      consumes: ['application/json'],
      responses,
    },
  },
};

export default winners;
