import { Request, Response, NextFunction } from 'express';
import IError from '../interfaces/iError';
import { ErrorRequestHandler } from 'express';
import { ErrorTypes, errorCatalog } from '../../errors/catalog';

// const errorFilter = (message: string) => {
//   if (message === 'Request failed') return { status: 500, message: 'Request failed' };
// };

const errorHandler: ErrorRequestHandler = (
  err: IError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const messageAsErrorType = err.message as keyof typeof ErrorTypes;

  const mappedError = errorCatalog[messageAsErrorType];
  if(mappedError) {
    const { message, httpStatus } = mappedError;
    return res.status(httpStatus).json({ message });
  }
  
  console.log(err);
  return res.status(500).json({ message: 'Internal server error' });
}

export default errorHandler;
