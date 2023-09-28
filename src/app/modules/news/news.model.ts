import { Schema, model } from 'mongoose';
import { NewsItem, NewsModel } from './news.interface';

const newsSchema = new Schema<NewsItem>(
  {
    heading: String,
    description: [String],
    images: {
      img1: String,
      img2: String,
      img3: String,
      img4: String,
    },
    reporter: String,
    category: String,
    subCategory: String,
    publishedDate: String,
    likes: [String],
    comments: [
      {
        comment: String,
        name: String,
        img: String,
        date: String,
        email: String,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const News = model<NewsItem, NewsModel>('News', newsSchema);
