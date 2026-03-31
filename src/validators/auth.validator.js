const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  email: Joi.string().email().lowercase().required(),
  phone: Joi.string().trim().min(7).max(20).required(),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .required()
    .messages({
      'string.pattern.base':
        'Password must contain at least one uppercase letter, one lowercase letter, and one number.',
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().optional(),
});

const updateProfileSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).optional(),
  phone: Joi.string().trim().min(7).max(20).optional(),
}).min(1);

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  updateProfileSchema,
};
