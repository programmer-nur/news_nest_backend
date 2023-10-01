import { NewsItem } from './news.interface';
import { News } from './news.model';

const insertIntoDb = async (newsData: NewsItem) => {
  const result = await News.create(newsData);
  return result;
};

const getAllFromDb = async () => {
  const result = await News.find();
  return result;
};

export const NewsService = { insertIntoDb, getAllFromDb };
