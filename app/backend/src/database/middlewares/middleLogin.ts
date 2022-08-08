import { Request, Response, NextFunction } from 'express';
import findUser from '../utils/functions';
// import { decodedToken } from '../utils/tokenJWT';
import { ErrorTypes } from '../../errors/catalog';
import * as bcrypt from 'bcryptjs';

const loginValid = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!email || !password) throw new Error(ErrorTypes.EmptyEmail);
  if (!emailRegex.test(email)) throw new Error(ErrorTypes.InvalidEmail);
  if (password.length <= 6) throw new Error(ErrorTypes.PasswordLength);
  next();
};

const loginIncorrect = async (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await findUser(email);
  if (!user) throw new Error(ErrorTypes.IncorrectLogin);
  const validPw = await bcrypt.compare(password, user.password);
  if (validPw) throw new Error(ErrorTypes.IncorrectLogin);
  next();
};

export default {
  loginValid,
  loginIncorrect,
};
