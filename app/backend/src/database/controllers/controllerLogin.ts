import { Request, Response } from 'express';
import serviceLogin from '../services/serviceLogin';

const getUserToken = async (req: Request, res: Response) => {
    const token = await serviceLogin.getUserToken(req.body);
    return res.status(200).json({ token });
};

const loginValidate = async (req: Request, res: Response) => {
    const role = await serviceLogin.loginValidate(req.headers.authorization as string);
    return res.status(200).json({ role });
};

export default {
  getUserToken,
  loginValidate,
};
