import tokenJWT from '../utils/tokenJWT';
import IUser from '../interfaces/iUser';

const getUserToken = async (userInfo: IUser): Promise<string> => {
  const { email } = userInfo;
  const token = tokenJWT(email);

  return token;
};

export default {
  getUserToken,
};
