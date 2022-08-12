import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { ErrorTypes } from '../../errors/catalog';

dotenv.config();

const JWT_CONFIG: jwt.SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const jwtSecret = process.env.JWT_SECRET as string;

const tokenJWT = (email: string) => {
  const token = jwt.sign({ data: email }, jwtSecret, JWT_CONFIG);
  return token;
};

export const decodedToken = (token: string): jwt.JwtPayload => {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload as jwt.JwtPayload;
  } catch (error) {
    throw new Error(ErrorTypes.invalidToken);
  }
};

export default tokenJWT;
