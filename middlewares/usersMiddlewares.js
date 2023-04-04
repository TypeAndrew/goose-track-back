const User = require('../models/usersModel');
const jwt = require('jsonwebtoken');
const { catchAsync, AppError } = require('../utils');
const decodeToken = (tocken, secret) => jwt.verify(tocken, secret);
 const ImageService = require('../services/imageService');
// onst multer = require('multer');
// const uuid = require('uuid').v4;
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
      console.log(decodedToken);
    } catch (err) {

        return next(new AppError(401, "Not authorized"));
    }

    console.log(decodedToken);

   const user =  await User.findByIdAndUpdate(decodedToken.id, { token: null }, { new: true });
  req.user = user;
  console.log(req.user);
    next();
});

/**
 * Check new user data.
 */
exports.checkUserData = catchAsync(async(req, res, next) => {
    // Check new user data.

    const { email, password } = req.body;

  const user = await User.findOne({ email: email }).select('+password');
  console.log('vvvvvvvvvvv')
   console.log(''+email +' ' +password);
    if (!user) return next(new AppError(401, 'Not authorized'));

    const passwordIsValid = await user.checkPassword(password, user.password);

    if (!passwordIsValid) return next(new AppError(401, 'Not authorized'));

    req.body = user;
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>');
    console.log(user);
    next();
});

 exports.uploadUserPhoto = ImageService.upload('avatarURL');

