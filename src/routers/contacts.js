import { Router } from 'express';
import {
  getContactsController,
  getContactByIDController,
  addContactController,
  // upsertContactController,
  deleteContactController,
  patchContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { contactsSchemaAdd, contactsSchemaUpdate } from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIDController));

router.post('/', validateBody(contactsSchemaAdd), ctrlWrapper(addContactController));

// router.put('/:contactId', validateBody(contactsSchemaUpdate), ctrlWrapper(upsertContactController));

router.patch(
  '/:contactId',
  isValidId,
  validateBody(contactsSchemaUpdate),
  ctrlWrapper(patchContactController)
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
