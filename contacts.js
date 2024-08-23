import fs from 'fs/promises';
import path from 'path';

const contactsPath = path.join(process.cwd(), 'db', 'contacts.json');

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
  return contacts.find(contact => contact.id === contactId);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const contactToRemove = contacts.find(contact => contact.id === contactId);

  if (!contactToRemove) {
    console.log('Contact not found.');
    return false;
  }

  const filteredContacts = contacts.filter(contact => contact.id !== contactId);

  try {
    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2), 'utf-8');
    console.log('Removed contact:', contactToRemove);
    return true;
  } catch (error) {
    console.error('Error removing contact:', error);
    return false;
  }
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone
  };
  contacts.push(newContact);
  try {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');
    console.log('Added contact:', newContact);
    return newContact.id;
  } catch (error) {
    console.error('Error adding contact:', error);
    return null;
  }
}

export { listContacts, getContactById, removeContact, addContact };
