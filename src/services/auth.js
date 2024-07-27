import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UsersCollection } from '../db/models/auth.js';
import { SessionCollection } from '../db/models/session.js';
import { createSession } from '../utils/createSession.js';
import { FIFTEEN_MINUTES, MONTH, SMTP } from '../constants/contacts.js';
import env from '../utils/env.js';
import { sendEmail } from '../utils/sendMail.js';
import { TEMPLATES_DIR } from '../constants/index.js';
import path from 'node:path';
import fs from 'node:fs/promises';
import handlebars from 'handlebars';

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
    ...newSession,
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

export const requestResetToken = async email => {
  const user = await UsersCollection.findOne({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    }
  );

  const resetPasswordTemplatePath = path.join(TEMPLATES_DIR, 'reset-password-email.html');

  const templateSource = (await fs.readFile(resetPasswordTemplatePath)).toString();

  const template = handlebars.compile(templateSource);

  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/auth/reset-pwd?token=${resetToken}`,
  });

  await sendEmail({
    from: env(SMTP.SMTP_FROM),
    to: email,
    subject: 'Reset your password',
    html,
  });
};

export const resetPassword = async (payload) => {
  let entries;

  try {
    entries = jwt.verify(payload.token, env('JWT_SECRET'));
  } catch {
    throw createHttpError(401, "Token is expired or invalid.");
  }

  const user = await UsersCollection.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  await SessionCollection.deleteOne({ userId: entries.sub });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  await UsersCollection.updateOne(
    { _id: user._id },
    { password: encryptedPassword },
  );
};
