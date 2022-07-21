import { Request, Response, NextFunction } from 'express';
import IError from '../interfaces/iError';

// const errorFilter = (message: string) => {
//   if (message === 'Request failed') return { status: 500, message: 'Request failed' };
// };

const errorHandler = (err: IError, _req: Request, res: Response, _next: NextFunction) => res
  .status(err.status).json({ message: err.message });

export default errorHandler;
