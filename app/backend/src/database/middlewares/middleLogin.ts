import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import findUser from '../utils/functions';
// import { decodedToken } from '../utils/tokenJWT';
import { ErrorTypes } from '../../errors/catalog';

const loginValid = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!email || !password) throw new Error(ErrorTypes.emptyEmail);
  if (!emailRegex.test(email)) throw new Error(ErrorTypes.invalidEmail);
  if (password.length <= 6) throw new Error(ErrorTypes.passwordLength);
  next();
};

const loginIncorrect = async (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await findUser(email);
  if (!user) throw new Error(ErrorTypes.incorrectLogin);
  const validPw = await bcrypt.compare(password, user.password);
  if (validPw) throw new Error(ErrorTypes.incorrectLogin);
  next();
};

export default {
  loginValid,
  loginIncorrect,
};
