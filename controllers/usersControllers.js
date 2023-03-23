const jwt = require('jsonwebtoken');
const { catchAsync } = require('../utils');

const User = require('../models/usersModel');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
});

const decodeToken = (tocken) => jwt.decode(tocken);

/**
 * Get contacts list 
 */
const getUsers = catchAsync(async(req, res) => {

    const users = await User.find().lean();

    res.status(200).json({
        users,
    }, );

})

/**
 * Add new user 
 */
const registerUsers = catchAsync(async(req, res) => {

    const newUserData = {
        ...req.body
    };
    console.log(newUserData);
    const newUser = await User.create(newUserData);

    newUser.password = undefined;

    const token = signTo(newUser._id);

    res.status(201).json({
        newUser: newUser,
    });
})

const loginUsers = catchAsync(async(req, res) => {

    const { email, password, subscription } = req.body;

    const user = await User.findOne({ email: email }).select('+password');

    if (!user) return next(new AppError(401, 'Not authorized'));

    const passwordIsValid = await user.checkPassword(password, user.password);

    if (!passwordIsValid) return next(new AppError(401, 'Not authorized'));

    user.password = undefined;

    const token = (user.token === null) ? signToken(user._id) : user.token;

    await User.findByIdAndUpdate(user._id, { token }, { new: true });

    res.status(201).json({

        token,
        user,
    });
})

module.exports = {
    getUsers,
    registerUsers,
    loginUsers,
}