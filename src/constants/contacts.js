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

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const MONTH = 30 * 24 * 60 * 60 * 1000;

export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};