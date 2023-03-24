const express = require('express')
const router = express.Router()

const usersControllers = require('../../controllers/usersControllers')
const usersMiddlewares = require('../../middlewares/usersMiddlewares');


router.get('/', usersControllers.getUsers);
router.post('/register', usersControllers.registerUsers);

router.post('/login', usersMiddlewares.checkUserData);
router.post('/login', usersControllers.loginUsers);

router.post('/logout', usersMiddlewares.checkUserData);
router.post('/logout', usersControllers.logOutUsers);

router.post('/current', usersMiddlewares.checkTokensData);
router.post('/current', usersControllers.currentUsers);

module.exports = router