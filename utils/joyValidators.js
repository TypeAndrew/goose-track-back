const Joi = require('joi');

const regPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
/**                  
 * Validate create user data.
 */
exports.createUserValidator = (data) => Joi.object({

    name: Joi.string().min(4).max(16).alphanum(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(6).max(60).regex(regPassword).required(),
    status: Joi.string().min(5).max(40),

}).validate(data);