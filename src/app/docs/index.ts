import bets from './bets';
import defaultPaths from './default.paths';
import games from './games/game';
import payMTN from './mtn';
import oltranz from './oltranz';
import profile from './profile';
import settings from './settings/settings';
import statistics from './statistics';
import subscribers from './subscriber';
import transactions from './transactions/transactions';
import transfers from './transfers/transfers';
import auth from './users/auth';
import users from './users/users';
import wallets from './wallet';
import winners from './winners';
import withdrawrequests from './withdrawrequests/transfers';

const paths = {
  ...defaultPaths,
  ...auth,
  ...users,
  ...games,
  ...wallets,
  ...subscribers,
  ...payMTN,
  ...bets,
  ...profile,
  ...transactions,
  ...settings,
  ...statistics,
  ...oltranz,
  ...transfers,
  ...withdrawrequests,
  ...winners,
};

const config = {
  swagger: '2.0',
  info: {
    version: '1.0.0.',
    title: 'Casino APIs Documentation',
    description: '',
  },
  basePath: '/',
  schemes: ['http', 'https'],
  securityDefinitions: {
    JWT: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  tags: [
    {
      name: 'Casino APIs Documentation',
    },
  ],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths,
};
export default config;
