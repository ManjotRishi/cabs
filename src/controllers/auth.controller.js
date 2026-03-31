const ApiResponse = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const authService = require('../services/auth.service');
const env = require('../config/env');

const getCookieOptions = () => ({
  httpOnly: true,
  secure: env.nodeEnv === 'production',
  sameSite: env.nodeEnv === 'production' ? 'none' : 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: '/api/v1/auth',
});

const getCookieValue = (req, cookieName) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    return null;
  }

  const parsedCookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, ...rest] = cookie.trim().split('=');
    acc[name] = decodeURIComponent(rest.join('='));
    return acc;
  }, {});

  return parsedCookies[cookieName] || null;
};

const resolveRefreshToken = (req) =>
  req.body.refreshToken || getCookieValue(req, env.refreshCookieName);

const register = async (req, res, next) => {
  try {
    const result = await authService.register(req.body);
    res.cookie(env.refreshCookieName, result.refreshToken, getCookieOptions());

    return res
      .status(201)
      .json(
        new ApiResponse(201, 'User registered successfully', {
          user: result.user,
          accessToken: result.accessToken,
          refreshToken: result.refreshToken,
        })
      );
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.cookie(env.refreshCookieName, result.refreshToken, getCookieOptions());

    return res.status(200).json(
      new ApiResponse(200, 'Login successful', {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      })
    );
  } catch (error) {
    return next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const refreshToken = resolveRefreshToken(req);
    if (!refreshToken) {
      throw new ApiError(401, 'Refresh token is required');
    }

    const result = await authService.refreshAuth(refreshToken);
    return res
      .status(200)
      .json(new ApiResponse(200, 'Token refreshed successfully', result));
  } catch (error) {
    return next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = resolveRefreshToken(req);
    const accessToken = req.accessToken || (req.headers.authorization || '').replace(/^Bearer\s+/i, '') || null;

    if (!req.user?.userId && !refreshToken) {
      throw new ApiError(401, 'Authentication required');
    }

    const userId = req.user?.userId;
    if (userId) {
      await authService.logout({
        userId,
        refreshToken,
        accessToken,
      });
    }

    res.clearCookie(env.refreshCookieName, getCookieOptions());
    return res.status(200).json(new ApiResponse(200, 'Logout successful'));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};
