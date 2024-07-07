export const mongooseSaveError = (err, data, next) => {
  err.status = 400;
  next();
};
