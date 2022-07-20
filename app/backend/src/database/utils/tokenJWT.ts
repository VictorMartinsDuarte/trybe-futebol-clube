import * as jwt from 'jsonwebtoken';

const JWT_CONFIG: jwt.SignOptions = {
  expiresIn: '1h',
  algorithm: 'HS256',
};

const jwtSecret = process.env.JWT_SECRET as string;

const tokenJWT = (email: string) => {
  const token = jwt.sign({ data: email }, jwtSecret, JWT_CONFIG);
  return token;
};

export default tokenJWT;
