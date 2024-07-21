import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import { validationUserSignIn, validationUserSignUp } from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserController, logoutUserController, registerUserController } from '../controllers/auth.js';

const router = Router();

router.post('/register', validateBody(validationUserSignUp), ctrlWrapper(registerUserController));

router.post('/login', validateBody(validationUserSignIn), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
