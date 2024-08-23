import { Command } from 'commander';
import * as contacts from './contacts.js';

const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'contact id')
  .option('-n, --name <type>', 'contact name')
  .option('-e, --email <type>', 'contact email')
  .option('-p, --phone <type>', 'contact phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.table(await contacts.listContacts());
      break;
    case 'get':
      const contact = await contacts.getContactById(id);
      if (contact) {
        console.log(contact);
      } else {
        console.log(`Contact with id ${id} not found.`);
      }
      break;
    case 'add':
      const newContactId = await contacts.addContact(name, email, phone);
      if (newContactId) {
        console.log(`Contact ${name} added successfully.`);
      }
      break;
    case 'remove':
      const isRemoved = await contacts.removeContact(id);
      if (isRemoved) {
        console.log(`Contact with id ${id} removed successfully.`);
      } else {
        console.log(`Contact with id ${id} not found.`);
      }
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);
