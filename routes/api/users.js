const express = require('express')
const router = express.Router()

const usersControllers = require('../../controllers/usersControllers')
const usersMiddlewares = require('../../middlewares/usersMiddlewares');
// const ImageService = require('../../services/imageService');


router.get('/', usersControllers.getUsers);
router.get('/verification', usersMiddlewares.checkMailToken);
router.get('/verification', usersControllers.verificationMailUsers);

router.post('/logout', usersMiddlewares.checkTokensData);
router.post('/logout', usersControllers.logOutUsers);

router.post('/current', usersMiddlewares.checkTokensData);
router.post('/current', usersControllers.currentUsers);

router.use(usersMiddlewares.checkTokensData);
router.get('/me', usersControllers.getUser);

router.patch('/avatars', usersMiddlewares.uploadUserPhoto);
router.patch('/avatars', usersControllers.updateUsersAvatars);

module.exports = router