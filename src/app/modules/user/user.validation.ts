import { z } from 'zod';

const createUser = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  image: z.string().optional(),
  role: z.enum(['user', 'admin']).optional(),
  bookmarks: z.array(z.unknown()).optional(),
  notes: z.array(z.unknown()).optional(),
});

export const UserValidation = { createUser };
