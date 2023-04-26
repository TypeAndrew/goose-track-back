const User = require('../models/usersModel');
const { catchAsync, AppError } = require('../utils');


/**
 * Check new user data.
 */
exports.checkAuthData = catchAsync(async(req, res, next) => {
    // Check new user data.

    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select('+password');

    if (!user) return next(new AppError(401, 'Not authorized'));

    const passwordIsValid = await user.checkPassword(password, user.password);

    if (!passwordIsValid) return next(new AppError(401, 'Email or password is wrong'));


    req.body = user;

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