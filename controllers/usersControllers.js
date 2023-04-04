const jwt = require('jsonwebtoken');
const { catchAsync } = require('../utils');
const gravatar = require('gravatar');
// const { AppError } = require('../utils');
const User = require('../models/usersModel');
const ImageService = require('../services/imageService');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
});



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
    newUserData.avatarURL = gravatar.url(newUserData.email);
    console.log(newUserData);

    const newUser = await User.create(newUserData);
    console.log('----------');
    

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

    const updatedUser = await user.save();

    user.password = undefined;

    res.status(201).json({

        token,
        updatedUser,
    });
})

const logOutUsers = catchAsync(async(req, res, next) => {

    const user = req.body;

    user.token = null;

    const updatedUser = await user.save();

    user.password = undefined;

    res.status(201).json({

        updatedUser,
    });
})

const currentUsers = catchAsync(async(req, res, next) => {

    const Authorization = req.headers.authorization;

    res.status(201).json({

        Authorization,
    });
})


const updateUsersAvatars = catchAsync(async (req, res) => {
  const { file, user } = req;

  if (file) {
    user.avatarURL = await ImageService.save(file, { width: 600, height: 600 }, 'images', 'users', user.id);
  }

  Object.keys(req.body).forEach((key) => {
    user[key] = req.body[key];
    // user.name = req.body.name;
    // user.birthyear = req.body.birthyear;
  });

  const updatedUser = await user.save();

  res.status(200).json({
    user: updatedUser,
  });
});

const getUser = (req, res) => {
  res.status(200).json({
    user: req.user,
  });
};

module.exports = {
    getUsers,
    registerUsers,
    loginUsers,
    logOutUsers,
    currentUsers,
    updateUsersAvatars,
    getUser,
}