const jwt = require("jsonwebtoken");
const { catchAsync } = require("../utils");
// const gravatar = require("gravatar");
const User = require("../models/usersModel");
const Column = require("../models/columnModel");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

/**
 * post user/regiser (registration)
 */
const signupUsers = catchAsync(async (req, res) => {
  const newUserData = {
    ...req.body,
  };
 // newUserData.avatarURL = gravatar.url(newUserData.email);

  const newUser = await User.create(newUserData);

  await newUser.save();

  const token = signToken(newUser._id);
  newUser.token = token;
  await newUser.save();
  newUser.password = undefined;

  res.status(201).json({
    newUser: newUser,
  });
});

/**
 * post user/login (loginization)
 */
const loginUsers = catchAsync(async (req, res, next) => {
  const user = req.body;

  const token = user.token === null ? signToken(user._id) : user.token;

  // const updatedUser = await User.findByIdAndUpdate(user._id, { token }, { new: true });
  user.token = token;

  if (Number(user.countLogin) === 0) {
    const { _id: owner } = user;

    req.body.owner = owner;

    await Column.create({ ...req.body, status: "To do", number: "1" });
    await Column.create({ ...req.body, status: "In progress", number: "2" });
    await Column.create({ ...req.body, status: "Done", number: "3" });
  }

  user.countLogin++;
  await user.save();

  user.password = undefined;

  res.status(201).json({
    token,
    user,
  });
});

module.exports = {
  signupUsers,
  loginUsers,
};
