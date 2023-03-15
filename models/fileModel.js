const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.join('models', 'contacts.json');

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



module.exports = {
    listContacts,
    saveFile,
}