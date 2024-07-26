import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import {
  requestResetEmailSchema,
  validationUserSignIn,
  validationUserSignUp,
} from '../validation/user.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
} from '../controllers/auth.js';
const router = Router();

router.post('/register', validateBody(validationUserSignUp), ctrlWrapper(registerUserController));

router.post('/login', validateBody(validationUserSignIn), ctrlWrapper(loginUserController));

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController)
);

export default router;
