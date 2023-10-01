import { Request, Response } from 'express';
import httpStatus from 'http-status';
import tryAsync from '../../../shared/tryAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import { IRefreshTokenResponse, IUser } from './user.interface';
import config from '../../../config';

const createUser = tryAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});
const getSingleUser = tryAsync(async (req: Request, res: Response) => {
  const { email } = req.query;
  const result = await UserService.getSingleUser(email as string);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User fetched successfully!',
    data: result,
  });
});

const addToBookmarkList = tryAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.addToBookmarkList(user?.userEmail, req.body);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const removeBookmarkList = tryAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const result = await UserService.removeBookmarkList(
    user?.userEmail,
    req.body
  );
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: result,
  });
});

const loginUser = tryAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await UserService.loginUser(loginData);

  const { refreshToken, ...others } = result;
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully !',
    data: others,
  });
});

const refreshToken = tryAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await UserService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'Refresh token create  successfully !',
    data: result,
  });
});
export const UserController = {
  createUser,
  addToBookmarkList,
  loginUser,
  refreshToken,
  removeBookmarkList,
  getSingleUser,
};
