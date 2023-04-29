const Joi = require('joi');

const regPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
const regDate     = /[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
/**                  
 * Validate create user data.
 */
exports.createUserValidator = (data) => Joi.object({

    name: Joi.string().min(3).max(16).alphanum(),
    email: Joi.string().min(5).max(50).required(),
    password: Joi.string().min(6).max(60).regex(regPassword).required(),
    skype: Joi.string().max(16),
    bearthday: Joi.string()
    .regex(regDate)
        .message("Invalid 'date'. Please, use YYYY-MM-DD string format"),
    status: Joi.string().valid("user", "admin")
        
}).validate(data);