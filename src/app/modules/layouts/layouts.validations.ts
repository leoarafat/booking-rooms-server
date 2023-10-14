import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title id is required',
    }),
    description: z.string({
      required_error: 'description id is required',
    }),
    avatar: z.object({
      public_id: z.string({ required_error: 'Public id  is required' }),
      url: z.string({ required_error: 'Url  is required' }),
    }),
  }),
});
const update = z.object({
  body: z.object({
    title: z.string({}).optional(),
    description: z.string({}).optional(),
    avatar: z
      .object({
        public_id: z.string(),
        url: z.string(),
      })
      .optional(),
  }),
});

export const BlogValidation = {
  create,
  update,
};
