import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
const createUser = async (user: IUser) => {
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  const isUserExist = await User.isUserExist(user?.email);
  if (isUserExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Already exist this email.');
  }
  if (!user.role) {
    user.role = 'user';
  }

  const result = await User.create(user);
  return result;
};

export const UserService = { createUser };
