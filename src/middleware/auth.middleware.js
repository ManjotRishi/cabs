const ApiError = require('../utils/ApiError');
const tokenService = require('../services/token.service');

const extractBearerToken = (req) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return null;
  }

  return header.split(' ')[1];
};

const verifyAccessToken = async (req, _res, next) => {
  try {
    const token = extractBearerToken(req);
    if (!token) {
      return next(new ApiError(401, 'Access token is required'));
    }

    const isBlacklisted = await tokenService.isTokenBlacklisted(token);
    if (isBlacklisted) {
      return next(new ApiError(401, 'Token is blacklisted'));
    }

    const payload = tokenService.verifyAccessToken(token);
    req.user = payload;
    req.accessToken = token;
    return next();
  } catch (error) {
    return next(new ApiError(401, 'Invalid or expired access token'));
  }
};

const authorizeRoles = (...roles) => (req, _res, next) => {
  if (!req.user) {
    return next(new ApiError(401, 'Authentication required'));
  }

  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, 'You are not authorized to perform this action'));
  }

  return next();
};

module.exports = {
  verifyAccessToken,
  authorizeRoles,
};
