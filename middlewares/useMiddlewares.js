const fs = require('fs').promises;
const { AppError,  validators } = require('../utils');
/**
 * Check new user data.
 */
exports.checkContactsData = (req, res, next) => {
  // Check new user data.
   console.log(req.query);
  const { error, value } = validators.createUserValidator(req.query);
  
  if (error) return next(new AppError(400, error.details[0].message));

  req.body = value;

  next();
};

/**
 * Check user id.
 */
exports.checkContactsId = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    // fetch user from DB
    const contacts = JSON.parse(await fs.readFile('./models/contacts.json'));

    const contact = contacts.find((item) => item.id === contactId);
    console.log(contactId);
    // if user exists => validation passed
    if (contact) return next();

    // if no contact with that id, sent 'not found' request
    const error = new Error('Not found');

    error.status = 404;
   
    next(error);
    
  } catch (err) {
    console.log(err);
    // catch any unpredictable errors
    next(err);
  }
};