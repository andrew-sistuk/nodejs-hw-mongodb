import { ContactsCollection } from '../db/models/contacts.js';

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

//працює і для put і для patch
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
