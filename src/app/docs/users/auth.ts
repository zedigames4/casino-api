import responses from '../default.responses';

const users = {
  '/api/v1/auth/login': {
    post: {
      tags: ['Users'],
      security: [],
      summary: 'Signin to PlayInRwanda',
      parameters: [
        {
          in: 'body',
          name: 'user',
          required: true,
          schema: {
            example: {
              email: 'admin@playinrwanda.com',
              password: 'admin123',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/api/v1/auth/signup': {
    post: {
      tags: ['Users'],
      security: [],
      summary: 'Register',
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
  },
  '/api/v1/auth/logout': {
    post: {
      tags: ['Users'],
      security: [
        {
          JWT: [],
        },
      ],
      summary: 'Logout',
      parameters: [],
      consumes: ['application/json'],
      responses,
    },
  },
  '/auth/forget-password': {
    post: {
      tags: ['Users'],
      security: [],
      summary: 'forget password',
      parameters: [
        {
          in: 'body',
          name: 'user',
          required: true,
          schema: {
            example: {
              email: 'admin@playinrwanda.com',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
  '/auth/reset-password': {
    put: {
      tags: ['Users'],
      security: [],
      summary: 'reset password',
      parameters: [
        {
          in: 'body',
          name: 'user',
          required: true,
          schema: {
            example: {
              password: '',
              token: '',
            },
          },
        },
      ],
      consumes: ['application/json'],
      responses,
    },
  },
};

export default users;
