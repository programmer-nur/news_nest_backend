import { Request, Response } from 'express';
import httpStatus from 'http-status';
import tryAsync from '../../../shared/tryAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import { IUser } from './user.interface';
import config from '../../../config';

const createUser = tryAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);
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
    message: 'Refresh token create successfully!',
    data: others,
  });
});
export const UserController = { createUser, loginUser };
