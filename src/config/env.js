const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  PORT: Joi.number().port().default(5000),
  MONGO_URI: Joi.string().uri().required(),
  JWT_ACCESS_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('30d'),
  REFRESH_COOKIE_NAME: Joi.string().default('refreshToken'),
  BCRYPT_SALT_ROUNDS: Joi.number().integer().min(8).max(15).default(12),
  CLIENT_URL: Joi.string().uri().required(),
  CORS_ORIGINS: Joi.string().default('http://localhost:3000'),
  RATE_LIMIT_WINDOW_MS: Joi.number().integer().positive().default(15 * 60 * 1000),
  RATE_LIMIT_MAX_REQUESTS: Joi.number().integer().positive().default(200),
  AUTH_RATE_LIMIT_MAX: Joi.number().integer().positive().default(20),
}).unknown();

const { value, error } = envSchema.validate(process.env, {
  abortEarly: false,
  convert: true,
});

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

module.exports = {
  nodeEnv: value.NODE_ENV,
  port: value.PORT,
  mongoUri: value.MONGO_URI,
  jwt: {
    accessSecret: value.JWT_ACCESS_SECRET,
    refreshSecret: value.JWT_REFRESH_SECRET,
    accessExpiresIn: value.JWT_ACCESS_EXPIRES_IN,
    refreshExpiresIn: value.JWT_REFRESH_EXPIRES_IN,
  },
  refreshCookieName: value.REFRESH_COOKIE_NAME,
  bcryptSaltRounds: value.BCRYPT_SALT_ROUNDS,
  clientUrl: value.CLIENT_URL,
  corsOrigins: value.CORS_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean),
  rateLimit: {
    windowMs: value.RATE_LIMIT_WINDOW_MS,
    maxRequests: value.RATE_LIMIT_MAX_REQUESTS,
    authMaxRequests: value.AUTH_RATE_LIMIT_MAX,
  },
};
