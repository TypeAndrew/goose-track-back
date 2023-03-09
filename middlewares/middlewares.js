const fs = require('fs').promises;

/**
 * Check new user data.
 */
exports.checkUserData = (req, res, next) => {
  // You can write some validators here..
  console.log('||== NEW USER DATA =====>>>>>>>>>>>');
  console.log(req.body);
  console.log('<<<<<<<<<<<=============||');

  next();
};

/**
 * Check user id.
 */
exports.checkUserId = async (req, res, next) => {
  try {
    const { id } = req.params;

    // check if user ID is invalid => send 'bad request' error
    if (id.length < 10) {
      // return res.status(400).json({
      //   msg: 'Invalid user id..',
      // });

      const error = new Error('Invalid user id..');

      error.status = 400;

      return next(error);
    }

    // fetch user from DB
    const users = JSON.parse(await fs.readFile('./models/models.json'));

    const user = users.find((item) => item.id === id);

    // if user exists => validation passed
    if (user) return next();

    // if no user with that id, sent 'not found' request
    const error = new Error('No user..');

    error.status = 404;

    next(error);
  } catch (err) {
    // catch any unpredictable errors
    next(err);
  }
};