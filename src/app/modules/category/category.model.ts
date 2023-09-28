import { Schema, model } from 'mongoose';
import { Category, CategoryModel } from './category.interface';

const newsSchema = new Schema<Category>(
  {
    title: String,
    subTitle: String,
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Categories = model<Category, CategoryModel>(
  'Categories',
  newsSchema
);
