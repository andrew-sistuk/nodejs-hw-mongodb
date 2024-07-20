import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { validationUserSignIn, validationUserSignUp } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserController, registerUserController } from '../controllers/auth.js';

const router = Router();

router.post('/register', validateBody(validationUserSignUp), ctrlWrapper(registerUserController));

router.post('/register', validateBody(validationUserSignIn), ctrlWrapper(loginUserController));

export default router;
