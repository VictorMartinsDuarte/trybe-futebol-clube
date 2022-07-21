import { Request, Response, NextFunction } from 'express';
import findUser from '../utils/functions';
import { decodedToken } from '../utils/tokenJWT';

const loginValid = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });
  if (!emailRegex.test(email)) return res.status(401).json({ message: 'Invalid "email"' });
  if (password.length <= 6) {
    return res.status(401)
      .json({ message: '"Password" must have at least 6 characters' });
  }
  next();
};

const loginIncorrect = async (req: Request, res: Response, next: NextFunction) => {
  const errMessage = 'Incorrect email or password';
  const payload = decodedToken(req.headers.authorization as string);
  const user = await findUser(payload.data);
  if (!user) return res.status(401).json({ message: errMessage });
  if (password !== user.password) return res.status(401).json({ message: errMessage });
  next();
};

export default {
  loginValid,
  loginIncorrect,
};
