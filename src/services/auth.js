import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { UsersCollection } from '../db/models/auth.js';
import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, MONTH } from '../constants/contacts.js';
import { SessionCollection } from '../db/models/session.js';

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

  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return await SessionCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + MONTH),
  });
};

export const logoutUser = async sessionId => {
  await SessionCollection.deleteOne({ userId: sessionId });
};
