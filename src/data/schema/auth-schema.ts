import { z } from 'zod';

export const authSchema = z
  .object({
    email: z
      .string()
      .min(1, {
        message: 'Please fill Email form!',
      })
      .email()
      .default(''),
    password: z
      .string()
      .min(1, {
        message: 'Please fill Password form!',
      })
      .default(''),
  })
  .default({});
