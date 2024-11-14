const parseNumber = (number, defayltValue) => {
  const isString = typeof number === 'string';
  if (!isString) return defayltValue;

  const parsedNumber = parseInt(number);
  if (Number.isNaN(parseNumber)) {
    return defayltValue;
  }
  return parsedNumber;
};

export const parsePaginationParams = (query) => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
