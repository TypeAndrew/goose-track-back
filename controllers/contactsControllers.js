const { catchAsync } = require('../utils');
const path = require('path');
const contactsPath = path.join('models', 'contacts.json');
const uuid = require('uuid').v4;
const Contact = require('../models/contactsModel');
const ObjectId = require('mongodb').ObjectId;

/**
 * Get contacts list 
 */
const getContacts = catchAsync(async(req, res) => {

    const contacts = await Contact.find().sort({ name: -1 }).lean();

    res.status(200).json({
        contacts,
    }, );

})

const getContactById = catchAsync(async(req, res) => {

    const { contactId } = req.params;


    const contact = await Contact.findById({ _id: new ObjectId(contactId) }).select("-_id");

    res.status(200).json({
        contact,
    });


})

const addContact = catchAsync(async(req, res) => {

    const { name, email, phone, favorite } = req.body;
    console.log(req.body)

    const newContact = Contact.create({ name: name, email: email, phone: phone, favorite: favorite });

    console.log(`Element with ${name} ${email} ${phone}id was added`.green);

    res.status(201).json({
        newContact: newContact,
    });
})

const removeContact = catchAsync(async(req, res) => {
    console.log('contactId');
    const { contactId } = req.params;
    console.log(contactId);
    const newContact = await Contact.findByIdAndDelete(contactId);

    res.status(201).json({
        contacts: newContact,
    });
})


const updateContact = async(req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;


    const updContact = await Contact.findByIdAndUpdate(contactId, { name, email, phone }, { new: true });

    res.status(200).json({
        contacts: updContact,
    });

}

module.exports = {
    getContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,

}