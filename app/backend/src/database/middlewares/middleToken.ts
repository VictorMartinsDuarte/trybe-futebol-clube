import { Request, Response, NextFunction } from 'express';
import { ErrorTypes } from '../../errors/catalog';
// import 'express-async-errors';
import { decodedToken } from '../utils/tokenJWT';

const tokenValid = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  console.log(authorization);
  const token = decodedToken(authorization as string);
  console.log(token);
  if (!token) throw new Error(ErrorTypes.invalidToken);
  next();
};

export default tokenValid;