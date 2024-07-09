import { typeContactList } from '../constants/contacts.js';

const parsedisFavourite = isFavourite => {
  if (typeof isFavourite !== 'string') return;
  if (isFavourite === 'true' || isFavourite === 'false') return isFavourite;
  return;
};

const parsedTypeContact = contactType => {
  if (typeof contactType !== 'string') return;
  if (typeContactList.includes(contactType)) return contactType;
  return;
};

export const parseFilterParams = query => {
  const { contactType, isFavourite } = query;

  return {
    isFavourite: parsedisFavourite(isFavourite),
    contactType: parsedTypeContact(contactType),
  };
};
