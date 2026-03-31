const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const env = require('./config/env');
const logger = require('./utils/logger');
const authRoutes = require('./routes/auth.routes');
const rideRoutes = require('./routes/ride.routes');
const userRoutes = require('./routes/user.routes');
const { notFoundHandler, errorHandler } = require('./middleware/error.middleware');

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', 1);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || env.corsOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(morgan('combined', { stream: logger.stream }));

app.use(
  rateLimit({
    windowMs: env.rateLimit.windowMs,
    max: env.rateLimit.maxRequests,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests, please try again later.',
    },
  })
);

app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is healthy',
    environment: env.nodeEnv,
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/rides', rideRoutes);
app.use('/api/v1/user', userRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(env.port, () => {
      logger.info(`Server running on port ${env.port}`, {
        environment: env.nodeEnv,
      });
    });

    const shutdown = async (signal) => {
      logger.warn(`Received ${signal}. Shutting down gracefully.`);
      server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    };

    process.on('SIGINT', () => shutdown('SIGINT'));
    process.on('SIGTERM', () => shutdown('SIGTERM'));
  } catch (error) {
    logger.error('Failed to start server', { error: error.message });
    process.exit(1);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
