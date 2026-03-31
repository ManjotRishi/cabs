const mongoose = require('mongoose');
const Booking = require('../models/booking.model');
const Ride = require('../models/ride.model');
const ApiError = require('../utils/ApiError');

const createRide = async (driverId, payload) => {
  const ride = await Ride.create({
    ...payload,
    driverId,
  });

  return ride;
};

const listRides = async (query) => {
  const page = Number(query.page || 1);
  const limit = Number(query.limit || 10);
  const skip = (page - 1) * limit;

  const filters = {
    status: 'scheduled',
  };

  if (query.from) {
    filters.from = { $regex: query.from, $options: 'i' };
  }

  if (query.to) {
    filters.to = { $regex: query.to, $options: 'i' };
  }

  if (query.date) {
    const startOfDay = new Date(query.date);
    const endOfDay = new Date(query.date);
    endOfDay.setUTCHours(23, 59, 59, 999);
    filters.date = { $gte: startOfDay, $lte: endOfDay };
  }

  const [rides, total] = await Promise.all([
    Ride.find(filters)
      .populate('driverId', 'name email phone')
      .sort({ date: 1, time: 1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Ride.countDocuments(filters),
  ]);

  return {
    rides,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

const getRideById = async (rideId) => {
  const ride = await Ride.findById(rideId).populate('driverId', 'name email phone').lean();

  if (!ride) {
    throw new ApiError(404, 'Ride not found');
  }

  return ride;
};

const bookRide = async ({ rideId, userId, seats }) => {
  const session = await mongoose.startSession();

  try {
    let bookingResult;

    await session.withTransaction(async () => {
      const ride = await Ride.findById(rideId).session(session);
      if (!ride) {
        throw new ApiError(404, 'Ride not found');
      }

      if (ride.status !== 'scheduled') {
        throw new ApiError(400, 'This ride is not available for booking');
      }

      if (ride.driverId.toString() === userId.toString()) {
        throw new ApiError(400, 'Drivers cannot book their own rides');
      }

      if (ride.seats < seats) {
        throw new ApiError(400, 'Not enough seats available');
      }

      ride.seats -= seats;
      if (ride.seats === 0) {
        ride.status = 'completed';
      }
      await ride.save({ session });

      const booking = await Booking.create(
        [
          {
            rideId: ride._id,
            userId,
            seats,
            totalPrice: ride.price * seats,
          },
        ],
        { session }
      );

      bookingResult = {
        ride: ride.toObject(),
        booking: booking[0].toObject(),
      };
    });

    return bookingResult;
  } finally {
    await session.endSession();
  }
};

const getMyRides = async (userId) => {
  const [publishedRides, bookings] = await Promise.all([
    Ride.find({ driverId: userId })
      .sort({ createdAt: -1 })
      .lean(),
    Booking.find({ userId })
      .populate({
        path: 'rideId',
        populate: {
          path: 'driverId',
          select: 'name email phone',
        },
      })
      .sort({ createdAt: -1 })
      .lean(),
  ]);

  return { publishedRides, bookings };
};

module.exports = {
  createRide,
  listRides,
  getRideById,
  bookRide,
  getMyRides,
};
