const Joi = require('joi');

const regPassword = '^[a-zA-Z0-9]{3,30}$';
/**
 * Validate create user data.
 */
exports.createUserValidator = (data) => Joi.object({

    name: Joi.string().min(2).max(50).alphanum().required(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().regex(regPassword).required(),
    verify: Joi.boolean(),
    subscription: Joi.string().min(5).max(40).required(),

}).validate(data);