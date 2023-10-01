import { Model } from 'mongoose';

export interface NewsItem {
  heading: string;
  description: string[];
  images: {
    img1: string;
    img2?: string;
    img3?: string;
    img4?: string;
  };
  reporter: string;
  category: string;
  subCategory?: string;
  publishedDate: string;
  likes?: string[];
  comments?: {
    comment: string;
    name: string;
    date: string;
    email: string;
  }[];
}

export interface INewsFilters {
  searchTerm?: string;
  heading?: string;
  reporter?: string;
  publishedDate?: Date;
}

export type NewsModel = Model<NewsItem, Record<string, unknown>>;
