const { catchAsync } = require('../utils');

const User = require('../models/usersModel');

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

    const { email, password, subscription } = req.body;
    console.log('-------')
    console.log(req)

    const newUser = User.create({ email: email, password: password, subscription: subscription });

    console.log(`Element with ${email} ${password} ${subscription} was added`.green);

    res.status(201).json({
        newUser: newUser,
    });
})

module.exports = {
    getUsers,
    registerUsers,
}