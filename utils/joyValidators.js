const Joi = require('joi');

const regPhone = /^\([0-9]{3}\) [0-9]{3}-[0-9]{4}/;
/**
 * Validate create user data.
 */
exports.createUserValidator = (data) => Joi.object({

    name: Joi.string().min(2).max(40).alphanum().required(),
    email: Joi.string().min(5).max(40).required(),
    phone: Joi.string().regex(regPhone).required(),
}).validate(data);