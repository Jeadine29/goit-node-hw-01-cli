const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

async function listContacts() {
  try {
    const text = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(text);
  } catch (error) {
    console.error('Error reading contacts:', error);
    return [];
  }
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter((contact) => contact.id !== contactId);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log(`Contact with id ${contactId} removed successfully.`);
  } catch (error) {
    console.error('Error writing updated contacts:', error);
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: (contacts.length + 1).toString(), // Incremental ID
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(`Contact ${name} added successfully.`);
  } catch (error) {
    console.error('Error adding contact:', error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
