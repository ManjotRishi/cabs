const Joi = require('joi');

const publishRideSchema = Joi.object({
  from: Joi.string().trim().min(2).max(120).required(),
  to: Joi.string().trim().min(2).max(120).required(),
  date: Joi.date().iso().required(),
  time: Joi.string()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({ 'string.pattern.base': 'time must be in HH:mm format' }),
  price: Joi.number().positive().precision(2).required(),
  seats: Joi.number().integer().min(1).max(20).required(),
  vehicle: Joi.string().trim().min(2).max(120).required(),
  notes: Joi.string().trim().max(500).allow('').optional(),
  status: Joi.string().valid('scheduled', 'completed', 'cancelled').optional(),
});

const listRidesSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  from: Joi.string().trim().optional(),
  to: Joi.string().trim().optional(),
  date: Joi.date().iso().optional(),
});

const bookRideSchema = Joi.object({
  rideId: Joi.string().hex().length(24).required(),
  seats: Joi.number().integer().min(1).max(10).required(),
});

module.exports = {
  publishRideSchema,
  listRidesSchema,
  bookRideSchema,
};
