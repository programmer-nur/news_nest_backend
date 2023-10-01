import { Schema, model } from 'mongoose';
import { NewsItem, NewsModel } from './news.interface';

const newsSchema = new Schema<NewsItem>(
  {
    heading: {
      type: String,
      required: true,
    },
    description: {
      type: [String],
      required: true,
    },
    images: {
      img1: String,
      img2: String,
      img3: String,
      img4: String,
    },
    reporter: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: String,
      required: true,
    },
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
