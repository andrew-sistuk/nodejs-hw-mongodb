import { ContactsCollection } from '../db/models/Contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContacById = async studentId => {
  const contacts = await ContactsCollection.findById(studentId);
  return contacts;
};

export const addContact = async payload => {
  console.log('################################' + payload);
  const contact = await ContactsCollection.create(payload);
  return contact;
};
