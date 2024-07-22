import { randomBytes } from 'crypto';


export const createSession = (accessTokenValidPeriod, refreshTokenValidPeriod) => {
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  return {
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + accessTokenValidPeriod),
    refreshTokenValidUntil: new Date(Date.now() + refreshTokenValidPeriod),
  };
};
