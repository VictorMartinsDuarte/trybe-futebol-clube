import Users from '../models/Users';
import IUser from '../interfaces/iUser';

const findUser = async (email: string): Promise<IUser> => {
  const foundUser = await Users.findOne({ where: { email } });
  return foundUser as IUser;
};

export default {
  findUser,
};
