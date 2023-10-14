import responses from '../default.responses';

const payMTN = {
  '/api/v1/pay/mtn': {
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
              amount: '5000',
              currency: 'RWF',
              payerMessage: 'Pay',
              payeeNote: 'Pay',
              partyId: '250780728136',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/pay/mtn/{referenceId}': {
    get: {
      tags: ['pay'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'transactionStatus',
      parameters: [
        {
          in: 'path',
          name: 'referenceId',
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

export default payMTN;
