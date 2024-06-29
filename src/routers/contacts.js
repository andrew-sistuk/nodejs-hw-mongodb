import { Router } from 'express';
import { getContactsController, getContactByIDController, addContactController } from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', ctrlWrapper(getContactByIDController));

router.post('/', ctrlWrapper(addContactController));

export default router;
