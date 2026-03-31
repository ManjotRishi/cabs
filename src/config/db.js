const mongoose = require('mongoose');
const env = require('./env');
const logger = require('../utils/logger');

const connectDB = async () => {
  mongoose.set('strictQuery', true);

  const connection = await mongoose.connect(env.mongoUri, {
    autoIndex: env.nodeEnv !== 'production',
  });

  logger.info(`MongoDB connected: ${connection.connection.host}`);
  return connection;
};

module.exports = connectDB;
