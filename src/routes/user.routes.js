const express = require('express');
const userController = require('../controllers/user.controller');
const validate = require('../middleware/validate.middleware');
const { verifyAccessToken, authorizeRoles } = require('../middleware/auth.middleware');
const { updateProfileSchema } = require('../validators/auth.validator');

const router = express.Router();

router.get('/profile', verifyAccessToken, authorizeRoles('user', 'admin'), userController.getProfile);
router.patch('/profile', verifyAccessToken, authorizeRoles('user', 'admin'), validate(updateProfileSchema), userController.updateProfile);

module.exports = router;
