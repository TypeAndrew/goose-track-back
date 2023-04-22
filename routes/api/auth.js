const express = require('express')
const router = express.Router()

const usersControllers = require('../../controllers/authControllers')
const authsMiddlewares = require('../../middlewares/authMiddlewares');

router.post('/register', usersControllers.signupUsers);

router.post('/login', authsMiddlewares.checkAuthData);
router.post('/login', usersControllers.loginUsers);


module.exports = router