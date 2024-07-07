import { isValidObjectId } from 'mongoose';

import createHttpError from 'http-errors';

export const isValidId = async (req, _res, next) => {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    next(createHttpError(404, 'Not found'));
    return;
  }
  next();
};
