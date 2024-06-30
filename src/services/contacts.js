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
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const upsertContact = async (filter, data, options = {}) => {
  const rawContact = await ContactsCollection.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawContact || !rawContact.value) return null;

  return {
    contact: rawContact.value,
    isNew: Boolean(rawContact?.lastErrorObject?.upserted),
  };
};
