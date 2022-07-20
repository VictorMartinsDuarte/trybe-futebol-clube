import { NextFunction, Request, Response } from 'express';
import serviceLogin from '../services/serviceLogin';

const getUserToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userToken = await serviceLogin.getUserToken(req.body);
    return res.status(200).json({ userToken });
  } catch (error) {
    next(error);
  }
};

export default {
  getUserToken,
};
