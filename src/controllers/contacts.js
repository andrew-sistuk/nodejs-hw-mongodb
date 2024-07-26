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
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import env from '../utils/env.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getContactsController = async (req, res) => {
  const { _id: userId } = req.user;

  const { query } = req;
  const contacts = await getAllContacts({
    ...parsePaginationParams(query),
    ...parseSortParams(query),
    filter: {
      ...parseFilterParams(query),
      userId,
    },
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIDController = async (req, res, next) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  const contact = await getContacById({ _id: contactId, userId });

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
  const { _id: userId } = req.user;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const contact = await addContact({ ...req.body, userId, photo: photoUrl });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

// export const upsertContactController = async (req, res, next) => {
//   const { _id: userId } = req.user;
//   const { contactId } = req.params;

//   const photo = req.file;

// let photoUrl;

// if (photo) {
//   if (env('ENABLE_CLOUDINARY') === 'true') {
//     photoUrl = await saveFileToCloudinary(photo);
//   } else {
//     photoUrl = await saveFileToUploadDir(photo);
//   }
// }

// const result = await upsertContact({ _id: contactId, userId }, { ...req.body, photo: photoUrl }, {
//   upsert: true,
// });

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
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  const photo = req.file;

  let photoUrl;

  if (photo) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      photoUrl = await saveFileToCloudinary(photo);
    } else {
      photoUrl = await saveFileToUploadDir(photo);
    }
  }

  const result = await upsertContact({ _id: contactId, userId }, { ...req.body, photo: photoUrl });

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
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  const contact = await deleteContact({ _id: contactId, userId });

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).json({});
};
