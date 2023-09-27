import { z } from 'zod';

const createUser = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z.string({
      required_error: 'Email is required',
    }),
    password: z.string({
      required_error: 'Email is required',
    }),
    image: z.string().optional(),
    role: z.string().optional(),
    bookmarks: z.string().optional(),
    notes: z.string().optional(),
  }),
});

export const UserValidation = { createUser };
