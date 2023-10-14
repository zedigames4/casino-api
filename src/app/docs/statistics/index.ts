import responses from '../default.responses';

const statistics = {
  '/api/v1/statistics/income-expenses': {
    get: {
      tags: ['statistics'],
      description:
        'Returns the income/expenses for a specified date range',
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'findAll',
      parameters: [
        {
          in: 'query',
          name: 'startDate',
          description: 'Start date of the date range.',
          required: false,
          schema: {
            type: 'string',
            format: 'date',
          },
        },
        {
          in: 'query',
          name: 'endDate',
          description: 'End date of the date range.',
          required: false,
          schema: {
            type: 'string',
            format: 'date',
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/statistics/chart': {
    get: {
      tags: ['statistics'],
      description:
        'Returns the income/expenses for a specified date range',
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'findAll',
      parameters: [
        {
          in: 'query',
          name: 'startDate',
          description: 'Start date of the date range.',
          required: false,
          schema: {
            type: 'string',
            format: 'date',
          },
        },
        {
          in: 'query',
          name: 'endDate',
          description: 'End date of the date range.',
          required: false,
          schema: {
            type: 'string',
            format: 'date',
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
};

export default statistics;
