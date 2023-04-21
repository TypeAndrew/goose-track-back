const express = require('express')
const router = express.Router()

const { getContacts, addContact, getContactById,
        updateContact, removeContact, changeFavoriteById } = require('../../controllers/contactsControllers')
const { checkContactsId, checkContactsData } = require('../../middlewares/contactsMiddlewares');
const { checkTokensData } = require('../../middlewares/usersMiddlewares');


router.route('/')
    .get(checkTokensData, getContacts)
    .post(checkTokensData, checkContactsData,addContact );

router.route('/:contactId')
    .get(checkTokensData, checkContactsId,getContactById)
    .put(checkTokensData, checkContactsId,updateContact )
    .delete(checkTokensData, checkContactsId, removeContact)
    .patch(checkTokensData, checkContactsId)

router.route('/:contactId/favorite')
    .patch(checkTokensData,changeFavoriteById)


module.exports = router 