const express = require('express')
const router = express.Router()

const usersControllers = require('../../controllers/usersControllers')
const usersMiddlewares = require('../../middlewares/usersMiddlewares');
// const ImageService = require('../../services/imageService');


router.get('/', usersControllers.getUsers);

router.post('/logout', usersMiddlewares.checkTokensData);
router.post('/logout', usersControllers.logOutUsers);

router.get('/current', usersMiddlewares.checkTokensData);
router.get('/current', usersControllers.currentUsers);

router.patch('/info', usersMiddlewares.checkTokensData);
router.patch('/info', usersControllers.updateUserData);

router.patch('/avatars', usersMiddlewares.checkTokensData);
router.patch('/avatars', usersMiddlewares.uploadUserPhoto);
router.patch('/avatars', usersControllers.updateUsersAvatars);

module.exports = router