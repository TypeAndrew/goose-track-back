const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join('models', 'contacts.json');
const uuid = require('uuid').v4;
const Contact = require('../models/contactsModel');

const saveFile = async(data) => {
    return fs.writeFile(contactsPath, JSON.stringify(data))
        .then(undefined)
        .catch(err => console.log(err.message));

}

const listContacts = async() => {
    return await fs.readFile(contactsPath)
        .then(data => JSON.parse(data.toString()))
        .catch(err => console.log(err.message));

}

const getContacts = async(req, res, next) => {

    const data = await listContacts();
    console.log(data);
    res.json({
        status: 'success',
        code: 200,
        data: {
            data,
        },
    });

}

const getContactById = async(req, res, next) => {
    console.log(next);
    const { contactId } = req.params;
    const data = await listContacts();

    const foundElement = await data.filter(el => el.id === contactId);
    if (foundElement.length === 0) {
        console.log(`Element with ${contactId}  not found`.magenta);
    }


    res.json({
        status: 'success',
        code: 200,
        data: {
            foundElement,
        },
    });


}

const removeContact = async(req, res, next) => {
    const { contactId } = req.params;

    const data = await listContacts();
    await saveFile(data.filter(el => el.id !== contactId));
    const msg = `Element with ${contactId} id was deleted`.red;
    res.json({
        status: 'success',
        code: 200,

        data: {
            msg,
        },
    });
}

const addContact = async(req, res, next) => {

    const { name, email, phone } = req.query;
    console.log(req.query)
    const data = (await listContacts() === undefined) ? [] : await listContacts();
    const newdata = [...data, { id: uuid.apply(), name: name, email: email, phone: phone }];
    await saveFile(newdata);
    console.log(`Element with ${name} ${email} ${phone}id was added`.green);

    res.json({
        status: 'success',
        code: 201,
        data: {
            newdata,
        },
    });
}

const updateContact = async(req, res, next) => {
    const { contactId } = req.params;
    const { name, email, phone } = req.query;
    const data = await listContacts();
    console.log(req);
    const index = data.findIndex(el => el.id === contactId);
    console.log(index);
    // const foundElement = await data.filter(el => el.id === contactId);
    // if (  foundElement.length === 0) {
    //   console.log(`Element with ${contactId} not found`.magenta);
    // }
    if (index >= 0) {
        console.log(name);
        data[index].name = name === undefined ? data[index].name : name;
        data[index].email = email === undefined ? data[index].email : email;
        data[index].phone = phone === undefined ? data[index].phone : phone;
        await saveFile(data);
    }

    const msg = index >= 0 ? `contact ${contactId} is modified ` : `contact ${contactId} not found `;
    const code = index >= 0 ? 200 : 404;
    res.json({
        status: 'success',
        code: code,
        data: {
            msg,
        },
    });

}

module.exports = {
    getContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    saveFile,
}