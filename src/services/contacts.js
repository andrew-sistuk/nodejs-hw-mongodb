import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({ page, perPage }) => {
  const limit = perPage;
  const skip = (page -1) * perPage;

  const contactsQuery = await ContactsCollection.countDocuments();
  
  console.log("#########################" + contactsQuery);
  const contacts = await ContactsCollection.find().skip(skip).limit(limit);

  const paginationData = calculatePaginationData(contactsQuery, page, perPage);

  return {
    data: contacts,
    ...paginationData
  };
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
  const rawContact = await ContactsCollection.findOneAndUpdate(filter, data, options);

  if (!rawContact || !rawContact.value) return null;

  return {
    contact: rawContact.value,
    isNew: Boolean(rawContact?.lastErrorObject?.upserted),
  };
};
