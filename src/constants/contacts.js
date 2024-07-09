export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const keysOfContact = [
  '_id',
  'name',
  'phoneNumber',
  'email',
  'isFavourite',
  'contactType',
  'createdAt',
  'updatedAt',
];

export const DEFAULT_PAGE = 1;
export const DEFAULT_PERPAGE = 10;
export const DEFAULT_SORT_BY = keysOfContact[0];
export const DEFAULT_SORT_ORDER = SORT_ORDER.ASC;
export const DEFAULT_FILTER = {};

export const typeContactList = ['work', 'home', 'personal'];

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
