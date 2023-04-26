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

    const token = req.headers.authorization.startsWith('Bearer') && req.headers.authorization.split(' ')[1];

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

exports.checkMailToken = catchAsync(async(req, res, next) => {
    // Check new user data.

    const mailToken = req.query.token;
    const user = await User.findOne({ verificationToken: mailToken }).select('+password');

    console.log('' + mailToken);
    if (!user) return next(new AppError(404, 'User not found'));

    if (mailToken !== user.verificationToken) return next(new AppError(401, 'Not authorized'));

    req.body = user;

    console.log(user);
    next();
});

/**
 * Check new user data.
 */
exports.checkValidData = (req, res, next) => {
    // Check new user data.
    console.log(req.query);

    // const { error, value } = validators.createUserValidator(req.body);

   // if (error) return next(new AppError(400, error.details[0].message));

   // req.body = value;

    next();
};

/**
 * Check user id.
 */
/* exports.checkUserId = async(req, res, next) => {
    try {
        const { UserId } = req.params;

        const user = ObjectId.isValid(UserId) ? await user.findById({ _id: UserId }) : undefined;

        if (user) {

            req.body = user;

            next();
        } else {
            // if no contact with that id, sent 'not found' request
            const error = new Error(`Contact with ${UserId} Not found`);

            error.status = 404;

            next(error);

        }
    } catch (err) {
        console.log(err);
        // catch any unpredictable errors
        next(err);
    }
}; */

exports.uploadUserPhoto = ImageService.upload('avatarURL');