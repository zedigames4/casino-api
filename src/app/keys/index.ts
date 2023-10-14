import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const Keys = {
  PORT: Number(PORT),
  NODE_ENV: process.env.NODE_ENV || 'production',
  API_VERSION: process.env.API_VERSION || 'v1',
  MONGO_DB_URL: process.env.MONGO_DB_URL,
  SECRET_KEY: process.env.SECRET_KEY || 'KEV6TINpp0',
  TOKEN_EXPIRES_IN: process.env.TOKEN_EXPIRES_IN || '7d',
  HOST: process.env.HOST || `http://localhost:${PORT}`,
  FRONT_END_URL: process.env.FRONT_END_URL || '*',
  TRANSPORTER_SERVICE: process.env.TRANSPORTER_SERVICE,
  SERVICE_USERNAME: process.env.SERVICE_USERNAME,
  SERVICE_PASSWORD: process.env.SERVICE_PASSWORD,
  TRANSPORTER_PORT: process.env.TRANSPORTER_PORT || 465,

  MTN_MOMO_API: process.env.MTN_MOMO_API,
  MTN_AUTHORIZATION_KEY: process.env.MTN_AUTHORIZATION_KEY,
  MTN_SUBSCRIPTION_KEY: process.env.MTN_SUBSCRIPTION_KEY,

  OLTRANZ_MERCHANT_ID: process.env.OLTRANZ_MERCHANT_ID,
  OLTRANZ_API:
    process.env.OLTRANZ_API || 'https://opay-api.oltranz.com',
  OLTRANZ_USERNAME: process.env.OLTRANZ_USERNAME,
  OLTRANZ_PASSWORD: process.env.OLTRANZ_PASSWORD,

  OLTRANZ_ACCESS_KEY: process.env.OLTRANZ_ACCESS_KEY,

  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
};

export default Keys;
