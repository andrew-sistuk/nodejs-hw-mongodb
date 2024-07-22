export const setupSession = (res, { refreshToken, _id }, time_period) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + time_period),
  });
  res.cookie('sessionId', _id, {
    httpOnly: true,
    expires: new Date(Date.now() + time_period),
  });
};
