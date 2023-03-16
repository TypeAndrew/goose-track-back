const { AppError, validators } = require('../utils');
const Contact = require('../models/contactsModel');
const ObjectId = require('mongodb').ObjectId;

/**
 * Check new user data.
 */
exports.checkContactsData = (req, res, next) => {
    // Check new user data.
    console.log(req.query);
    
    const { error, value } = validators.createUserValidator(req.body);
   
    if (error) return next(new AppError(400, error.details[0].message));
    
    req.body = value;

    next();
};

/**
 * Check user id.
 */
exports.checkContactsId = async(req, res, next) => {
    try {
        const { contactId } = req.params;
      
        const contact = ObjectId.isValid(contactId) ? await Contact.findById({ _id: contactId }) : undefined;
     
        if (contact) {
            
            req.body = contact;
            
            next();
        } else {
        // if no contact with that id, sent 'not found' request
        const error = new Error(`Contact with ${contactId} Not found`);

        error.status = 404;

        next(error);
            
        }    
    } catch (err) {
        console.log(err);
        // catch any unpredictable errors
        next(err);
    }
};