import { Model } from 'mongoose';

export interface Category {
  title: string;
  subTitle?: string;
}

export type CategoryModel = Model<Category, Record<string, unknown>>;
