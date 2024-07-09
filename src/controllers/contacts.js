import {
  addContact,
  deleteContact,
  getAllContacts,
  getContacById,
  upsertContact,
} from '../services/contacts.js';

import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async ({ query }, res) => {
  const contacts = await getAllContacts({
    ...parsePaginationParams(query),
    ...parseSortParams(query),
    filter: parseFilterParams(query),
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIDController = async (req, res, next) => {
  const { contactId } = req.params;

  // isValidId(req, res, next);

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

// export const upsertContactController = async (req, res, next) => {
//   const { contactId } = req.params;

//   const result = await upsertContact({ _id: contactId }, req.body, {
//     upsert: true,
//   });

//   if (!result) {
//     next(createHttpError(404, 'Contact not found'));
//     return;
//   }

//   const status = result.isNew ? 201 : 200;

//   res.status(status).json({
//     status: status,
//     message: 'Successfully put a contact!',
//     data: result.contact,
//   });
// };

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await upsertContact({ _id: contactId }, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).json({});
};
