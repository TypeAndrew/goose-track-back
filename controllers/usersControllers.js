const { catchAsync } = require('../utils');
const User = require('../models/usersModel');
const ImageService = require('../services/imageService');


/**
 * Get contacts list 
 */
const getUsers = catchAsync(async(req, res) => {

    const users = await User.find().lean();

    res.status(200).json({
        users,
    }, );

})

const verificationMailUsers = catchAsync(async(req, res) => {

    const editUserData = req.body;

    editUserData.verificationToken = null;
    editUserData.verify = true;
    await editUserData.save();

    res.status(200).json({
        message: 'Verification successful'
    }, );

})


const logOutUsers = catchAsync(async(req, res, next) => {

    const user = req.user;

    user.token = null;

    const updatedUser = await user.save();

    user.password = undefined;

    res.status(201).json({

        updatedUser,
    });
})

const currentUsers = catchAsync(async(req, res, next) => {

    const Authorization = req.headers.authorization;
    const user = req.user;
    user.password = null;

    res.status(201).json({
        user,
        Authorization,
    });
})


const updateUsersAvatars = catchAsync(async(req, res) => {
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

/**
 * Update user data
 */
const updateUserData = async(req, res, next) => {

    const user = req.user;

    Object.keys(req.body).forEach((key) => {
        user[key] = req.body[key];

    });

    user.save();
    // user.password = null;
    res.status(200).json({
        user: user,
    });

}



module.exports = {
    getUsers,
    logOutUsers,
    currentUsers,
    updateUsersAvatars,
    getUser,
    verificationMailUsers,
    updateUserData,

}