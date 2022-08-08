import { NextFunction, Request, Response } from 'express';
import serviceLogin from '../services/serviceLogin';

const getUserToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await serviceLogin.getUserToken(req.body);
    return res.status(200).json({ token });
  } catch (error) {
    next({ status: 500, message: 'Request failed' });
  }
};

const loginValidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const role = await serviceLogin.loginValidate(authorization as string);
    return res.status(200).json({ role });
  } catch (error) {
    next({ status: 500, message: 'Request failed' });
  }
};

export default {
  getUserToken,
  loginValidate,
};
