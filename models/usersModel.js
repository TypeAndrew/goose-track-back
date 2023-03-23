const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

const usersSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,

    },
})

// Pre save hook
usersSchema.pre('save', async function(next) {
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