import { Router } from 'express';
import {
  getContactsController,
  getContactByIDController,
  addContactController,
  upsertContactsController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIDController));

router.post('/', ctrlWrapper(addContactController));

router.delete('/:contactId', ctrlWrapper(deleteContactController));

router.put('/:contactId', ctrlWrapper(upsertContactsController));

router.patch('/:contactId', ctrlWrapper(upsertContactsController));
export default router;
