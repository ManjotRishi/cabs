const express = require('express');
const rideController = require('../controllers/ride.controller');
const validate = require('../middleware/validate.middleware');
const { verifyAccessToken, authorizeRoles } = require('../middleware/auth.middleware');
const { publishRideSchema, listRidesSchema, bookRideSchema } = require('../validators/ride.validator');

const router = express.Router();

router.get('/', validate(listRidesSchema, 'query'), rideController.getRides);
router.get('/my-rides', verifyAccessToken, rideController.getMyRides);
router.get('/:id', rideController.getRide);
router.post('/publish', verifyAccessToken, authorizeRoles('user', 'admin'), validate(publishRideSchema), rideController.publishRide);
router.post('/book', verifyAccessToken, authorizeRoles('user', 'admin'), validate(bookRideSchema), rideController.bookRide);

module.exports = router;
