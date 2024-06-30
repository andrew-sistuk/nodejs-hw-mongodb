import { addContact, getAllContacts, getContacById } from '../services/contacts.js';

import createHttpError from 'http-errors';

export const getContactsController = async (_, res) => {
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

export const addContactController = async (req, res) => {
  const contact = await addContact(req.body);

  res.status(200).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const upsertContactsController = async (req, res) => {
  const { contactId } = req.params;
  console.log('------------------------------'+contactId);

  const result = await upsertContact({ _id: contactId }, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact
  });
};
