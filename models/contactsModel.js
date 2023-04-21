// const { bool, boolean } = require('joi');
const { model, Schema } = require('mongoose');

const contactsSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Set name for contact'],
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
    favorite: {
        type: Boolean,
        default: false,
        required: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
})

const Contact = model('Contact', contactsSchema);

module.exports = Contact;