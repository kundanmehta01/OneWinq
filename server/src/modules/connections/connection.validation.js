import { z } from 'zod';

export const sendRequestSchema = z.object({
  params: z.object({
    userId: z.string().min(1, 'Target user ID is required'),
  }),
});

export const connectionIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Connection ID is required'),
  }),
});
