import { Request, Response, NextFunction } from 'express';

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

export default loginValid;
