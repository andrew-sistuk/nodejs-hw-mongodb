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
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactByIDController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(contactsSchemaAdd),
  ctrlWrapper(addContactController)
);

// router.put('/:contactId', upload.single('photo'), isValidId, validateBody(contactsSchemaUpdate), ctrlWrapper(upsertContactController));

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(contactsSchemaUpdate),
  ctrlWrapper(patchContactController)
);

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
