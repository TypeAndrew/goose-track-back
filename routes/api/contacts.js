const express = require('express')
const router = express.Router()

const contacts = require('../../controllers/contactsControllers')
const contactMiddlewares = require('../../middlewares/contactsMiddlewares');
const userMiddlewares = require('../../middlewares/usersMiddlewares');

router.get('/', userMiddlewares.checkTokensData);
router.get('/', contacts.getContacts);

router.get('/:contactId', userMiddlewares.checkTokensData);
router.get('/:contactId', contactMiddlewares.checkContactsId)
router.get('/:contactId', contacts.getContactById)

router.post('/', userMiddlewares.checkTokensData)
router.post('/', contactMiddlewares.checkContactsData)
router.post('/', contacts.addContact)

router.delete('/:contactId', userMiddlewares.checkTokensData)
router.delete('/:contactId', contactMiddlewares.checkContactsId)
router.delete('/:contactId', contacts.removeContact)

router.put('/:contactId', userMiddlewares.checkTokensData)
router.put('/:contactId', contactMiddlewares.checkContactsId)
router.put('/:contactId', contacts.updateContact)

router.patch('/:contactId', userMiddlewares.checkTokensData)
router.patch('/:contactId', contactMiddlewares.checkContactsId)

router.patch('/:contactId/favorite', userMiddlewares.checkTokensData)
router.patch('/:contactId/favorite', contacts.changeFavoriteById)

module.exports = router