const express = require('express');

const usersControllers = require('../../controllers/authControllers');
const authsMiddlewares = require('../../middlewares/authMiddlewares');

const router = express.Router();

router.post('/register', authsMiddlewares.checkValidUserData);
router.post('/register', authsMiddlewares.checkUserData);
router.post('/register', usersControllers.signupUsers);

router.post('/login', authsMiddlewares.checkValidUserData);
router.post('/login', authsMiddlewares.checkAuthData);
router.post('/login', usersControllers.loginUsers);


module.exports = router