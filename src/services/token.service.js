const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const env = require('../config/env');

const blacklistedTokenSchema = new mongoose.Schema(
  {
    tokenHash: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 },
    },
    type: {
      type: String,
      enum: ['access', 'refresh'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const BlacklistedToken =
  mongoose.models.BlacklistedToken ||
  mongoose.model('BlacklistedToken', blacklistedTokenSchema);

const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const getExpiryDate = (decodedToken) => new Date(decodedToken.exp * 1000);

const generateAccessToken = (user) =>
  jwt.sign(
    {
      userId: user._id.toString(),
      role: user.role,
    },
    env.jwt.accessSecret,
    {
      expiresIn: env.jwt.accessExpiresIn,
    }
  );

const generateRefreshToken = (user) => {
  const tokenId = crypto.randomUUID();

  const token = jwt.sign(
    {
      userId: user._id.toString(),
      tokenId,
    },
    env.jwt.refreshSecret,
    {
      expiresIn: env.jwt.refreshExpiresIn,
    }
  );

  return { token, tokenId };
};

const verifyAccessToken = (token) => jwt.verify(token, env.jwt.accessSecret);

const verifyRefreshToken = (token) => jwt.verify(token, env.jwt.refreshSecret);

const blacklistToken = async (token, type) => {
  const decoded = type === 'access' ? verifyAccessToken(token) : verifyRefreshToken(token);

  await BlacklistedToken.findOneAndUpdate(
    { tokenHash: hashToken(token) },
    {
      tokenHash: hashToken(token),
      type,
      expiresAt: getExpiryDate(decoded),
    },
    {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
    }
  );
};

const isTokenBlacklisted = async (token) => {
  const blacklistedToken = await BlacklistedToken.findOne({
    tokenHash: hashToken(token),
  }).lean();

  return Boolean(blacklistedToken);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  blacklistToken,
  isTokenBlacklisted,
};
