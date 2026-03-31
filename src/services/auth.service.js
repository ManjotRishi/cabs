const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const env = require('../config/env');
const ApiError = require('../utils/ApiError');
const tokenService = require('./token.service');

const sanitizeUser = (user) => {
  const userObject = user.toObject ? user.toObject() : user;
  delete userObject.password;
  delete userObject.refreshToken;
  return userObject;
};

const issueAuthTokens = async (user) => {
  const accessToken = tokenService.generateAccessToken(user);
  const { token: refreshToken } = tokenService.generateRefreshToken(user);

  await User.findByIdAndUpdate(user._id, { refreshToken });

  return { accessToken, refreshToken };
};

const register = async (payload) => {
  const existingUser = await User.findOne({ email: payload.email }).lean();
  if (existingUser) {
    throw new ApiError(409, 'Email is already registered');
  }

  const hashedPassword = await bcrypt.hash(payload.password, env.bcryptSaltRounds);
  const user = await User.create({
    ...payload,
    password: hashedPassword,
  });

  const tokens = await issueAuthTokens(user);
  return {
    user: sanitizeUser(user),
    ...tokens,
  };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password +refreshToken');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const tokens = await issueAuthTokens(user);
  return {
    user: sanitizeUser(user),
    ...tokens,
  };
};

const refreshAuth = async (refreshToken) => {
  const payload = tokenService.verifyRefreshToken(refreshToken);
  const isBlacklisted = await tokenService.isTokenBlacklisted(refreshToken);

  if (isBlacklisted) {
    throw new ApiError(401, 'Refresh token is blacklisted');
  }

  const user = await User.findById(payload.userId).select('+refreshToken');
  if (!user || user.refreshToken !== refreshToken) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const accessToken = tokenService.generateAccessToken(user);
  return { accessToken, user: sanitizeUser(user) };
};

const logout = async ({ userId, refreshToken, accessToken }) => {
  if (refreshToken) {
    await User.findOneAndUpdate(
      { _id: userId, refreshToken },
      { $unset: { refreshToken: 1 } }
    );

    try {
      await tokenService.blacklistToken(refreshToken, 'refresh');
    } catch (_error) {
      // Ignore malformed/expired refresh tokens during logout cleanup.
    }
  }

  if (accessToken) {
    try {
      await tokenService.blacklistToken(accessToken, 'access');
    } catch (_error) {
      // Ignore malformed/expired access tokens during logout cleanup.
    }
  }
};

module.exports = {
  register,
  login,
  refreshAuth,
  logout,
};
