const { model, Schema } = require('mongoose');

const contactsSchema = new Schema({

    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    },
    email: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    },
    phone: {
        type: String,
        required: true,
        minlength: 7,
        maxlength: 16,
    },
})

const Contact = model('Contact', contactsSchema);

module.exports = Contact;