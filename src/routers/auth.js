import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { validationUser } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController } from '../controllers/user.js';

const router = Router();

router.post('/', validateBody(validationUser), ctrlWrapper(registerUserController));

export default router;
