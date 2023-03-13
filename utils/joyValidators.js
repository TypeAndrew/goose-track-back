const Joi = require('joi');

/**
 * Validate create user data.
 */
exports.createUserValidator = (data) => Joi.object({
  
  name: Joi.string().min(2).max(10).required(),
  email: Joi.string().min(5).max(40).required(),
  phone: Joi.string().min(7).max(16).required(),
}).validate(data);

