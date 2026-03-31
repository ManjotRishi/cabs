const ApiResponse = require('../utils/ApiResponse');
const rideService = require('../services/ride.service');

const publishRide = async (req, res, next) => {
  try {
    const ride = await rideService.createRide(req.user.userId, req.body);
    return res.status(201).json(new ApiResponse(201, 'Ride published successfully', ride));
  } catch (error) {
    return next(error);
  }
};

const getRides = async (req, res, next) => {
  try {
    const result = await rideService.listRides(req.query);
    return res.status(200).json(new ApiResponse(200, 'Rides fetched successfully', result.rides, result.meta));
  } catch (error) {
    return next(error);
  }
};

const getRide = async (req, res, next) => {
  try {
    const ride = await rideService.getRideById(req.params.id);
    return res.status(200).json(new ApiResponse(200, 'Ride fetched successfully', ride));
  } catch (error) {
    return next(error);
  }
};

const bookRide = async (req, res, next) => {
  try {
    const result = await rideService.bookRide({
      rideId: req.body.rideId,
      userId: req.user.userId,
      seats: req.body.seats,
    });

    return res.status(201).json(new ApiResponse(201, 'Ride booked successfully', result));
  } catch (error) {
    return next(error);
  }
};

const getMyRides = async (req, res, next) => {
  try {
    const rides = await rideService.getMyRides(req.user.userId);
    return res.status(200).json(new ApiResponse(200, 'My rides fetched successfully', rides));
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  publishRide,
  getRides,
  getRide,
  bookRide,
  getMyRides,
};
