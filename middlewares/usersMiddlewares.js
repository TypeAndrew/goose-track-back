const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const { catchAsync, AppError } = require('../utils');
const decodeToken = (tocken, secret) => jwt.verify(tocken, secret);
const ImageService = require('../services/imageService');

/**
 * Check token data.
 */
exports.checkTokensData = catchAsync(async(req, res, next) => {
    // Check token data.

    const token = req.headers.authorization?.startsWith('Bearer') && req.headers.authorization.split(' ')[1];

    let decodedToken;
    console.log(token);
    try {
        decodedToken = decodeToken(token, process.env.JWT_SECRET);

    } catch (err) {

        if (err.message === 'jwt expired') {
            const userExpired = await User.findOneAndUpdate({ token: token }, { $set: { token: null } });
            userExpired.save();
        }
        return next(new AppError(401, "Not authorized"));
    }

    console.log(decodedToken);

    const user = await User.findById(decodedToken.id);

    req.user = user;

    if (user === undefined || token !== user.token) {
        next(new AppError(401, "Not authorized"))
    }
    next();
});

/**
 * Check new user data.
 */
exports.checkUserData = catchAsync(async(req, res, next) => {
    // Check new user data.

    const { email } = req.body;

    const user = await User.findOne({ email: email }).select('+password');

    if (user) return next(new AppError(409, 'Email in use'));


    next();
});


exports.uploadUserPhoto = ImageService.upload('avatarURL');