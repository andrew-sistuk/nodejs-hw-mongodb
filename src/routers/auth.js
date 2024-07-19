import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { validationUserSignUp } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { registerUserController } from '../controllers/auth.js';

const router = Router();

router.post('/register', validateBody(validationUserSignUp), ctrlWrapper(registerUserController));

export default router;
