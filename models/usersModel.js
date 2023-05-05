const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

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
        default: "",
    },
    countLogin: {
        type: Number,
        default: 0,
    },
    columns: {
        type: Array,
        default: ["To do" , "In progress", "Done" ],
    },    
})

// Pre save hook
usersSchema.pre('save', async function(next) {

    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
});


// Custom method
usersSchema.methods.checkPassword = (candidate, hash) => bcrypt.compare(candidate, hash);

const User = model('User', usersSchema);

module.exports = User;