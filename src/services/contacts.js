import { ContactsCollection } from '../db/models/Contacts.js';

export const getAllContacts = async () => {
  return await ContactsCollection.find();
};

export const getContacById = async id => {
  return await ContactsCollection.findById(id);
};

export const addContact = async payload => {
  return await ContactsCollection.create(payload);
};

export const deleteContact = async id => {
  const contact = await ContactsCollection.findOneAndDelete({ _id: id });
  return contact;
};

export const upsertContact = async (filter, data, options = {}) => {
  const rawContact = await ContactsCollection.findOneAndUpdate(filter, data, {
    new: true,
    upsert: true,
    includeResultMetadata: true,
    ...options,
  });

  console.log('**************************' + rawContact);

  if (!rawContact || !rawContact.value) return null;

  return {
    contact: rawContact.value,
    isNew: Boolean(rawContact?.lastErrorObject?.upserted),
  };
};
