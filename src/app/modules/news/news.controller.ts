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

const getByIdFromDb = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await NewsService.getByIdFromDb(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single News fetched successfully!',
    data: result,
  });
});

const createLikeIntoDb = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const result = await NewsService.createLikeIntoDb(id, user?.userEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create Like successfully!',
    data: result,
  });
});

const removeLikeIntoDb = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;
  const result = await NewsService.removeLikeIntoDb(id, user?.userEmail);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Remove Like successfully!',
    data: result,
  });
});

const createCommentIntoDb = tryAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { ...commentData } = req.body;
  const result = await NewsService.removeLikeIntoDb(id, commentData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Create comment successfully!',
    data: result,
  });
});

export const NewsController = {
  insertIntoDb,
  getAllFromDb,
  getByIdFromDb,
  createLikeIntoDb,
  removeLikeIntoDb,
  createCommentIntoDb,
};
