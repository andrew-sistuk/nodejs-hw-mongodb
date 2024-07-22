import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/auth.js';
import { SessionCollection } from '../db/models/session.js';
import { createSession } from '../utils/createSession.js';
import { FIFTEEN_MINUTES, MONTH } from '../constants/contacts.js';

export const registerUser = async payload => {
  const user = await UsersCollection.findOne({
    email: payload.email,
  });

  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPass = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPass,
  });
};

export const loginUser = async payload => {
  const user = await UsersCollection.findOne({
    email: payload.email,
  });

  if (!user) throw createHttpError(401, 'Unauthorized');

  const isEqual = await bcrypt.compare(payload.password, user.password);

  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  await SessionCollection.deleteOne({ userId: user._id });

  const newSession = createSession(FIFTEEN_MINUTES, MONTH);

  return await SessionCollection.create({
    userId: user._id,
    ...newSession
  });
};

export const refreshUsersSession = async ({ sessionId, refreshToken }) => {
  const session = await SessionCollection.findOne({
    _id: sessionId,
    refreshToken,
  });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired = new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  await SessionCollection.deleteOne({ _id: sessionId, refreshToken });

  const newSession = createSession(FIFTEEN_MINUTES, MONTH);

  return await SessionCollection.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async sessionId => {
  await SessionCollection.deleteOne({ userId: sessionId });
};