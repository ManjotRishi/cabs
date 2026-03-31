const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.userId).lean();
    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return res.status(200).json(new ApiResponse(200, 'Profile fetched successfully', user));
  } catch (error) {
    return next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.userId,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).lean();

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    return res.status(200).json(new ApiResponse(200, 'Profile updated successfully', user));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
