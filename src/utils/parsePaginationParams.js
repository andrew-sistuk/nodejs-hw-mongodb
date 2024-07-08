const parseNumber = (number, defaultNumber) => {
  if (typeof number !== 'string') return defaultNumber;

  const parsedNumber = parseInt(number);

  if (Number.isNaN(parsedNumber)) return defaultNumber;

  return parsedNumber;
};

export const parsePaginationParams = query => {
  return {
    page: parseNumber(query.page, 1),
    perPage: parseNumber(query.perPage, 10),
  };
};
