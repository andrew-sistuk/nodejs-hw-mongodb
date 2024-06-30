import { ContactsCollection } from '../db/models/Contacts.js';

export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

export const getContacById = async id => {
  const contact = await ContactsCollection.findById(id);
  return contact;
};

export const addContact = async payload => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async id => {
  const contact = await ContactsCollection.findOneAndDelete({_id: id});
  return contact;
};

export const upsertContact = async (filter, data, options = {}) => {
  const rawContact = await ContactsCollection.findOneAndUpdate(filter, data, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
    ...options,
  });

  console.log('**************************'+rawContact);

  if (!rawContact || !rawContact.value) return null;

  return {
    contact: rawContact.value,
    isNew: Boolean(rawContact?.lastErrorObject?.upserted),
  };
};
