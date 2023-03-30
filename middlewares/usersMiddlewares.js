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

    const token = req.headers.authorization ? .startsWith('Bearer') && req.headers.authorization.split(' ')[1];

    let decodedToken;

    try {
        decodedToken = decodeToken(token, process.env.JWT_SECRET);
    } catch (err) {

        return next(new AppError(401, "Not authorized"));
    }

    console.log(decodedToken);

    await User.findByIdAndUpdate(decodedToken.id, { token: null }, { new: true });

    next();
});

/**
 * Check new user data.
 */
exports.checkUserData = catchAsync(async(req, res, next) => {
    // Check new user data.

    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select('+password');

    if (!user) return next(new AppError(401, 'Not authorized'));

    const passwordIsValid = await user.checkPassword(password, user.password);

    if (!passwordIsValid) return next(new AppError(401, 'Not authorized'));

    req.body = user;

    next();
});

exports.uploadUserPhoto = ImageService.upload('avatar');