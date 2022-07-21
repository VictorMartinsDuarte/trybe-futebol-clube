import tokenJWT, { decodedToken } from '../utils/tokenJWT';
import IUser from '../interfaces/iUser';
import findUser from '../utils/functions';

const getUserToken = async (userInfo: IUser): Promise<string> => {
  const { email } = userInfo;
  const token = tokenJWT(email);
  return token;
};

const loginValidate = async (token: string) => {
  const payload = decodedToken(token);
  const { role } = await findUser(payload.data);
  return role;
};

export default {
  getUserToken,
  loginValidate,
};
