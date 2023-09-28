import { Category } from './category.interface';
import { Categories } from './category.model';

const insertIntoDb = async (newsData: Category) => {
  const result = await Categories.create(newsData);
  return result;
};

export const NewsService = { insertIntoDb };
