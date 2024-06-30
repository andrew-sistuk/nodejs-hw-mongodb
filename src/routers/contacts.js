import { Router } from 'express';
import {
  getContactsController,
  getContactByIDController,
  addContactController,
  upsertContactsController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIDController));

router.post('/', ctrlWrapper(addContactController));

router.patch('/:contactId', ctrlWrapper(upsertContactsController));

export default router;
