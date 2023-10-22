import { Schema, model } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
import bcrypt from 'bcrypt';

export const userSchema = new Schema<IUser, IUserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    image: String,
    role: {
      type: String,
      enum: ['user', 'admin'],
      required: true,
    },
    bookmarks: {
      type: [],
    },
    notes: {
      type: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.statics.isUserExist = async function (
  email: string
): Promise<Pick<IUser, 'email' | 'password'> | null> {
  return await User.findOne({ email }, { email: 1, password: 1 }).lean();
};

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string
) {
  return await bcrypt.compare(givenPassword, savedPassword);
};
export const User = model<IUser, IUserModel>('User', userSchema);
