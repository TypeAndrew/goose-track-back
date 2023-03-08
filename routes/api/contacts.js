const express = require('express')
const uuid = require('uuid').v4;
const router = express.Router()

const contacts = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  
  const data = await contacts.listContacts();
  console.log(data);
  res.json({
    status: 'success',
    code: 200,
    data: {
      data,
    },
  });

})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
    const data = await contacts.listContacts();
    console.log(req);
    const foundElement = await data.filter(el => el.id === contactId);
    if (  foundElement.length === 0) {
        console.log(`Element with ${contactId}  not found`.magenta);
    } 
     
    
    res.json({
    status: 'success',
    code: 200,
    data: {
      foundElement,
    },
  });
       

})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.query;
  console.log(req.query)
  const data = (await contacts.listContacts() === undefined) ? [] : await contacts.listContacts();
  const newdata = [...data, { id: uuid.apply(), name: name, email: email, phone: phone }];
  await contacts.saveFile( newdata);
  console.log(`Element with ${name} ${email} ${phone}id was added`.green);
   
  res.json({
    status: 'success',
    code: 200,
    data: {
      newdata,
    },
  });
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
