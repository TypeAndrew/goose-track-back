const Joi = require('joi');

const regPassword = '^[a-zA-Z0-9]{3,30}$';
/**
 * Validate create user data.
 */
exports.createUserValidator = (data) => Joi.object({

    name: Joi.string().min(4).max(16).alphanum().required(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(6).max(60).regex(regPassword).required(),
    subscription: Joi.string().min(5).max(40).required(),

}).validate(data);