const jwt = require('jsonwebtoken');
const { catchAsync } = require('../utils');
const gravatar = require('gravatar');
const User = require('../models/usersModel');
const uuid = require('uuid').v4;

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
});



/**
 * Add new user (registration)
 */
const signupUsers = catchAsync(async(req, res) => {

   
    const newUserData = {
        ...req.body, 
    };
    newUserData.avatarURL = gravatar.url(newUserData.email);
    console.log(newUserData);
    newUserData.verificationToken = uuid();
    const newUser = await User.create(newUserData);
     
    
    console.log(newUser);
    // next();
    newUser.save();
    // newUser.password = undefined;
    // const token = signToken(newUser._id);

    res.status(201).json({
        newUser: newUser,
    });
})

const loginUsers = catchAsync(async(req, res, next) => {


    const user = req.body;
    // user.password = undefined;
    console.log(user);
    const token = (user.token === null) ? signToken(user._id) : user.token;

    // const updatedUser = await User.findByIdAndUpdate(user._id, { token }, { new: true });
    user.token = token;

    await user.save();

    user.password = undefined;

    res.status(201).json({

        token,
        user,
    });
})



module.exports = {

    signupUsers,
    loginUsers,

}