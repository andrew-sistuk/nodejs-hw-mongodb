import { DEFAULT_PAGE, DEFAULT_PERPAGE } from '../constants/contacts.js';

const parseNumber = (number, defaultNumber) => {
  if (typeof number !== 'string') return defaultNumber;

  const parsedNumber = parseInt(number);

  if (Number.isNaN(parsedNumber)) return defaultNumber;

  return parsedNumber;
};

export const parsePaginationParams = query => {
  return {
    page: parseNumber(query.page, DEFAULT_PAGE),
    perPage: parseNumber(query.perPage, DEFAULT_PERPAGE),
  };
};
