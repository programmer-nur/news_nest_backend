import { Model } from 'mongoose';

/* eslint-disable no-unused-vars */
export interface IUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: 'user' | 'admin';
  bookmarks?: [];
  notes?: [];
}

export interface IRefreshTokenResponse {
  accessToken: string;
}
export interface ILogin {
  email: string;
  password: string;
}

export type IUserModel = {
  isUserExist(email: string): Promise<Pick<IUser, 'email' | 'password'>>;
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
