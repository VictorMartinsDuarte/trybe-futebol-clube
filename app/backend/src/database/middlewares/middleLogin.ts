import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import findUser from '../utils/functions';
import { ErrorTypes } from '../../errors/catalog';
import 'express-async-errors';

const loginValid = (req: Request, _res: Response, next: NextFunction) => {
  if (!req.body) throw new Error(ErrorTypes.emptyFields)
  const { email, password } = req.body;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!email || !password) throw new Error(ErrorTypes.emptyFields);
  if (!emailRegex.test(email)) throw new Error(ErrorTypes.invalidEmail);
  if (password.length <= 6) throw new Error(ErrorTypes.passwordLength);
  next();
};

const loginIncorrect = async (req: Request, _res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const user = await findUser(email);
  if (!user) throw new Error(ErrorTypes.incorrectLogin);
  const validPw = bcrypt.compareSync(password, user.password);
  if (!validPw) throw new Error(ErrorTypes.incorrectLogin);
  next();
};

export default {
  loginValid,
  loginIncorrect,
};
