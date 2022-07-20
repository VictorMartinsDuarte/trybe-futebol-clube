import { Request, Response, NextFunction } from 'express';

const loginValid = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
  if (!emailRegex.test(email)) return res.status(401).json({ message: 'Invalid "email"' });
  if (password.length <= 6) {
    return res.status(401)
      .json({ message: '"Password" must have at least 6 characters' });
  }
  next();
};

export default loginValid;
