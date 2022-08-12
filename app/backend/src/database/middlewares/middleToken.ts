import { Request, Response, NextFunction } from 'express';
import { ErrorTypes } from '../../errors/catalog';
// import 'express-async-errors';
import { decodedToken } from '../utils/tokenJWT';

const tokenValid = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  decodedToken(authorization as string);
  next();
};

export default tokenValid;