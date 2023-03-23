const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const { catchAsync, AppError } = require('../utils');
const decodeToken = (tocken, secret) => jwt.verify(tocken, secret);

/**
 * Check new user data.
 */
exports.checkTokensData = catchAsync(async(req, res, next) => {
    // Check new user data.
    console.log(req.headers.token);
    const token = req.headers.token;
    console.log('-------------------------');



    const decodedToken = decodeToken(req.headers.token, process.env.JWT_SECRET);
    console.log(decodedToken);

    // await User.findByIdAndUpdate(decodedToken.id, { token: null }, { new: true });







    next();
});