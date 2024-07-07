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
import { contactsSchemaPatch, contactsSchemaPost } from '../validation/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIDController));

router.post('/', validateBody(contactsSchemaPost), ctrlWrapper(addContactController));

// router.put('/:contactId', validateBody(contactsSchemaPatch), ctrlWrapper(upsertContactController));

router.patch('/:contactId', validateBody(contactsSchemaPatch), ctrlWrapper(patchContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

export default router;
