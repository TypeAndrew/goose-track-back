const express = require('express')
const router = express.Router()

const contacts = require('../../controllers/contactsControllers')
const userMiddlewares = require('../../middlewares/contactsMiddlewares');

router.get('/', userMiddlewares.checkTokensData);
router.get('/', contacts.getContacts);

router.get('/:contactId', userMiddlewares.checkContactsId)
router.get('/:contactId', contacts.getContactById)

router.post('/', userMiddlewares.checkContactsData)
router.post('/', contacts.addContact)

router.delete('/:contactId', userMiddlewares.checkContactsId)
router.delete('/:contactId', contacts.removeContact)

router.put('/:contactId', userMiddlewares.checkContactsId)
router.put('/:contactId', contacts.updateContact)

router.patch('/:contactId', userMiddlewares.checkContactsId)
router.patch('/:contactId/favorite', contacts.changeFavoriteById)

module.exports = router