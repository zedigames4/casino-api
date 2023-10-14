import responses from '../default.responses';

const oltranz = {
  '/api/v1/pay/oltranz': {
    post: {
      tags: ['pay'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'request payment',
      parameters: [
        {
          in: 'body',
          name: 'payload',
          required: true,
          schema: {
            example: {
              amount: 100,
              description: 'Pay',
              telephoneNumber: '250780728136',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/pay/oltranz/transfer': {
    post: {
      tags: ['pay'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'request payment',
      parameters: [
        {
          in: 'body',
          name: 'payload',
          required: true,
          schema: {
            example: {
              amount: 100,
              receiver: '639eceff7c6e195316f31d56',
              description: 'Transfer',
              receiverAccount: '250780728136',
              type: 'MOBILE',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
};

export default oltranz;
