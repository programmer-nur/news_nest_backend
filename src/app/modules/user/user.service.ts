import httpStatus from 'http-status';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { ILogin, IUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import { Secret } from 'jsonwebtoken';

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

const loginUser = async (payload: ILogin) => {
  const { email, password } = payload;

  const isExist = await User.isUserExist(email);
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  if (
    isExist.password &&
    !(await User.isPasswordMatch(password, isExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }
  const { email: userEmail, password: pass } = isExist;
  const accessToken = jwtHelpers.createToken(
    { userEmail, pass },
    config.jwt.secret_token as Secret,
    config.jwt.expire_in as string
  );
  const refreshToken = jwtHelpers.createToken(
    { userEmail, pass },
    config.jwt.secret_refresh_token as Secret,
    config.jwt.secret_refresh_token_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};
export const UserService = { createUser, loginUser };
