const { catchAsync } = require('../utils');

const Contact = require('../models/contactsModel');
// const ObjectId = require('mongodb').ObjectId;

/**
 * Get contacts list 
 */
const getContacts = catchAsync(async(req, res) => {

    const contacts = await Contact.find().sort({ name: -1 }).lean();

    res.status(200).json({
        contacts,
    }, );

})

/**
 * Get contact by id 
 */
const getContactById = catchAsync(async(req, res, err) => {
    const contact =  req.body;
    
    res.status(200).json({
        contact ,
    });


})

/**
 * Add new contact 
 */
const addContact = catchAsync(async(req, res) => {

    const { name, email, phone, favorite } = req.body;
    console.log(req.body)

    const newContact = Contact.create({ name: name, email: email, phone: phone, favorite: favorite });

    console.log(`Element with ${name} ${email} ${phone}id was added`.green);

    res.status(201).json({
        newContact: newContact,
    });
})

/**
 * delete contact by ID 
 */
const removeContact = catchAsync(async(req, res) => {
    console.log('contactId');
    const { contactId } = req.params;
    console.log(contactId);
    const newContact = await Contact.findByIdAndDelete(contactId);

    res.status(201).json({
        contacts: newContact,
    });
})

/**
 * Update contact by ID 
 */
const updateContact = async(req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    
    const updContact = await Contact.findByIdAndUpdate(contactId, { name, email, phone }, { new: true });

    res.status(200).json({
        contacts: updContact,
    });

}

/**
 * Change field favorite by id 
 */
const changeFavoriteById = async(req, res, next) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (favorite === undefined) {

        res.status(400).json({
            message: "missing field favorite",
        });

    } else {

        const updContact = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });

        res.status(200).json({
            contacts: updContact,
        });
    }
}

module.exports = {
    getContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    changeFavoriteById,
}