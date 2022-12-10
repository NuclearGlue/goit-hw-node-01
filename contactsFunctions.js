const fs = require('fs').promises;
const path = require('path');
const contactsPath = path.basename('./contacts.json');

async function listContacts() {
  fs.readFile(contactsPath)
    .then(data => console.table(JSON.parse(data.toString())))
    .catch(err => console.log(err.message));
}

async function getContactById(contactId) {
  fs.readFile(contactsPath)
    .then(data => JSON.parse(data.toString()))
    .then(contacts => contacts.find(elem => elem.id === contactId))
    .then(contact => {
      if (contact) {
        console.log(contact);
      } else {
        console.log('Contact with such index not found!');
      }
    })
    .catch(err => console.log(err.message));
}

async function removeContact(contactId) {
  fs.readFile(contactsPath)
    .then(data => JSON.parse(data.toString()))
    .then(contactsOld => contactsOld.filter(elem => elem.id !== contactId))
    .then(contactsNew =>
      fs.writeFile(contactsPath, JSON.stringify(contactsNew)),
    )
    .catch(err => console.log(err.message));
}

async function addContact(name, email, phone) {
  fs.readFile(contactsPath)
    .then(data => JSON.parse(data.toString()))
    .then(contactsOld => {
      contactsOld.push({
        id: `${contactsOld.length + 1}`,
        name: name,
        email: email,
        phone: phone,
      });
      return contactsOld;
    })
    .then(contactsNew =>
      fs.writeFile(contactsPath, JSON.stringify(contactsNew)),
    )
    .catch(err => console.log(err.message));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
