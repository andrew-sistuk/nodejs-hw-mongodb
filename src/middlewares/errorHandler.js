import { HttpError } from 'http-errors';
export const errorHandler = (err, _, res, _next) => {
  const { status = 500, name, message = 'Something went wrong' } = err;
  if (err instanceof HttpError) {
    res.status(status).json({
      status: status,
      message: name,
      data: err,
    });
  }

  res.status(status).json({
    status: status,
    message: 'Something went wrong',
    error: message,
  });
};
