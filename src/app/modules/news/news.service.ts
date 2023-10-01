import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import IPaginationOption from '../../../interfaces/pagination';
import { newsSearchableFields } from './news.constants';
import { INewsFilters, NewsItem } from './news.interface';
import { News } from './news.model';

const insertIntoDb = async (newsData: NewsItem) => {
  const result = await News.create(newsData);
  return result;
};

const getAllFromDb = async (
  filters: INewsFilters,
  paginationOptions: IPaginationOption
): Promise<IGenericResponse<NewsItem[]>> => {
  const { searchTerm, ...filterData } = filters;
  const { limit, skip, sortBy, sortOrder, page } =
    paginationHelper.calculatePagination(paginationOptions);

  const andCondition = [];

  if (searchTerm) {
    andCondition.push({
      $or: newsSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await News.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await News.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDb = async (id: string) => {
  const result = await News.findById({ _id: id });
  return result;
};

export const NewsService = { insertIntoDb, getAllFromDb, getByIdFromDb };
