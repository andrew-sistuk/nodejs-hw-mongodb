import { getAllContacts, getContacById } from '../services/contacts.js';

import createHttpError from 'http-errors';

export const getContactsController = async (_, res, next) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIDController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await getContacById(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};
