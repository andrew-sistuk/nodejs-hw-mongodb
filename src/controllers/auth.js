import { MONTH } from '../constants/contacts.js';
import { loginUser, logoutUser, refreshUsersSession, registerUser } from '../services/auth.js';

export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    messege: 'Successfully registered a user!',
    data: user,
  });
};

const setupSession = (res, { refreshToken, _id }) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + MONTH),
  });
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: new Date(Date.now() + MONTH),
  });
};

export const loginUserController = async (req, res) => {
  const { accessToken, refreshToken, _id } = await loginUser(req.body);

  setupSession(res, { refreshToken, _id });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: accessToken,
    },
  });
};

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUsersSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
