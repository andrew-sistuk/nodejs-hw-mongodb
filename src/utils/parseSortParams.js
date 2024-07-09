import {
  DEFAULT_SORT_BY,
  DEFAULT_SORT_ORDER,
  SORT_ORDER,
  keysOfContact,
} from '../constants/contacts.js';

export const parseSortParams = query => {
  const { sortBy, sortOrder } = query;
  return {
    sortBy: keysOfContact.includes(sortBy) ? sortBy : DEFAULT_SORT_BY,
    sortOrder: Object.values(SORT_ORDER).includes(sortOrder) ? sortOrder : DEFAULT_SORT_ORDER,
  };
};
