/* eslint-disable prefer-regex-literals */
const Joi = require("joi");

const schema = Joi.object({
  title: Joi.string().required(),
  priority: Joi.string().valid("Low", "Medium", "High").required(),
  start: Joi.string()
    .pattern(new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"))
    .message("Invalid 'time'. Please, use HH:MM string format")
    .required(),
  end: Joi.string()
    .pattern(new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"))
    .message("Invalid 'time'. Please, use HH:MM string format")
        .required(),
  date: Joi.string()
    .pattern(new RegExp("[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])"))
    .message("Invalid 'date'. Please, use YYYY-MM-DD string format")
        .required(),
  category: Joi.string()
    .valid("To do", "In progress", "Done")
    .required(),
  
});

const validateData = (req, res, next) => {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  req.body = value;
  next();
};

const schemaToEditTask = Joi.object({
  title: Joi.string(),
  priority: Joi.string().valid("Low", "Medium", "High"),
  start: Joi.string()
    .pattern(new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"))
    .message("Invalid 'time'. Please, use HH:MM string format"),
  end: Joi.string()
    .pattern(new RegExp("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$"))
        .message("Invalid 'time'. Please, use HH:MM string format"),
  date: Joi.string()
    .pattern(new RegExp("[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])"))
    .message("Invalid 'date'. Please, use YYYY-MM-DD string format")
        .required(),
  category: Joi.string()
    .valid("To do", "In progress", "Done")
    .required(),
  
});

const validateDataForEditing = (req, res, next) => {
  const { error, value } = schemaToEditTask.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  req.body = value;
  next();
};

module.exports = { validateData, validateDataForEditing };