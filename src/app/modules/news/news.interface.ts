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
  likes: string[];
  comments: {
    comment: string;
    name: string;
    date: string;
    email: string;
  }[];
}

export type News = Model<NewsItem, Record<string, unknown>>;
