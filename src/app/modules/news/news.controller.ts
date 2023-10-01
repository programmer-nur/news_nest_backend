import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import tryAsync from '../../../shared/tryAsync';
import { NewsService } from './news.service';
import { Request, Response } from 'express';
import pick from '../../../shared/pick';
import { newsFilterableFields } from './news.constants';

const insertIntoDb = tryAsync(async (req: Request, res: Response) => {
  const { ...news } = req.body;
  const result = await NewsService.insertIntoDb(news);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News created successfully!',
    data: result,
  });
});
const getAllFromDb = tryAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, newsFilterableFields);
  const paginationOptions = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ]);
  const result = await NewsService.getAllFromDb(filters, paginationOptions);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News All fetched successfully!',
    data: result,
  });
});

export const NewsController = { insertIntoDb, getAllFromDb };
