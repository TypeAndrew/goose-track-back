const express = require('express')
const router = express.Router()

const users = require('../../controllers/usersControllers')
    // const userMiddlewares = require('../../middlewares/contactsMiddlewares');


router.get('/', users.getUsers);
router.post('/register', users.registerUsers);
router.post('/login', users.loginUsers);

module.exports = router