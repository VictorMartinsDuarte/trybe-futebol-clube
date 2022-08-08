import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { ErrorTypes, errorCatalog } from '../../errors/catalog';
import IError from '../interfaces/iError';

const errorHandler: ErrorRequestHandler = (
  err: IError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];
  if (mappedError) {
    const { message, httpStatus } = mappedError;
    return res.status(httpStatus).json({ message });
  }
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
