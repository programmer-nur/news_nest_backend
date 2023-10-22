import { Request, Response } from 'express';
import tryAsync from '../../../shared/tryAsync';
import { CategoriesService } from './category.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const insertIntoDb = tryAsync(async (req: Request, res: Response) => {
  const result = await CategoriesService.insertIntoDb({ ...req.body });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News created successfully!',
    data: result,
  });
});

export const CategoriesController = {
  insertIntoDb,
};
