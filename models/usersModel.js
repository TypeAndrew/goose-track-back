const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// const { date } = require('joi');



const usersSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        max: 16,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    status: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    birthday: {
        type: String,
        default: ""
    },
    phone: {
        type: String,
        default: ""
    },
    skype: {
        type: String,
        max: 12,
        default: ""
    },
    token: {
        type: String,
        default: null,

    },
    avatarURL: {
        type: String,
        default: null,
    },
    countLogin: {
        type: Number,
        default: 0,
    }
})

// Pre save hook
usersSchema.pre('save', async function(next) {

    if (this.isNew) {
        const emailHash = crypto.createHash('md5').update(this.email).digest('hex');

        this.avatar = `https://www.gravatar.com/avatar/${emailHash}.jpg?d=retro`;
    }
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // const passwordIsValid = await bcrypt.compare('Pass&2234', hashedPassword);

    next();
});


// Custom method
usersSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);

const User = model('User', usersSchema);

module.exports = User;