import { Model, Types } from 'mongoose';
import { NewsItem } from '../news/news.interface';

/* eslint-disable no-unused-vars */
export interface IUser {
  name: string;
  email: string;
  password: string;
  image?: string;
  role: 'user' | 'admin';
  bookmarks?: [news: Types.ObjectId | NewsItem];
  notes?: [news: Types.ObjectId | NewsItem];
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
