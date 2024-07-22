import {
  DEFAULT_FILTER,
  DEFAULT_PAGE,
  DEFAULT_PERPAGE,
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
} from '../constants/contacts.js';
import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = DEFAULT_PAGE,
  perPage = DEFAULT_PERPAGE,
  sortBy = DEFAULT_SORT_BY,
  sortOrder = DEFAULT_SORT_ORDER,
  filter = DEFAULT_FILTER,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.userId) {
    contactsQuery.where('userId').equals(filter.userId);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  if (filter.isFavourite) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, page, perPage);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContacById = async filter => {
  console.log(filter);
  return await ContactsCollection.findOne(filter);
};

export const addContact = async payload => {
  return await ContactsCollection.create(payload);
};

export const deleteContact = async filter => {
  const contact = await ContactsCollection.findOneAndDelete(filter);
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
