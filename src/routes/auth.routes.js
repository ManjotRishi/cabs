const express = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate.middleware');
const { verifyAccessToken } = require('../middleware/auth.middleware');
const { registerSchema, loginSchema, refreshSchema } = require('../validators/auth.validator');
const env = require('../config/env');

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: env.rateLimit.windowMs,
  max: env.rateLimit.authMaxRequests,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many authentication requests, please try again later.',
  },
});

router.post('/register', authLimiter, validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/refresh', authLimiter, validate(refreshSchema), authController.refresh);
router.post('/logout', verifyAccessToken, authController.logout);

module.exports = router;
