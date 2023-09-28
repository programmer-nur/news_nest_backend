import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import tryAsync from '../../../shared/tryAsync';
import { NewsService } from './news.service';
import { Request, Response } from 'express';

const insertIntoDb = tryAsync(async (req: Request, res: Response) => {
  const news = req.body;
  const result = await NewsService.insertIntoDb(news);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News created successfully!',
    data: result,
  });
});

export const NewsController = { insertIntoDb };
