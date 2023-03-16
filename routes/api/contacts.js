const express = require('express')
    // const uuid = require('uuid').v4;
const router = express.Router()

const contacts = require('../../controllers/contactsControllers')
const userMiddlewares = require('../../middlewares/contactsMiddlewares');

router.get('/', contacts.getContacts);

//router.get('/:contactId', userMiddlewares.checkContactsId)
router.get('/:contactId', contacts.getContactById)

router.post('/', userMiddlewares.checkContactsData)

router.post('/', contacts.addContact)

router.delete('/:contactId', contacts.removeContact)

router.put('/:contactId', contacts.updateContact)

module.exports = router