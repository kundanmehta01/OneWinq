import { z } from 'zod';

export const createThoughtSchema = z.object({
  body: z.object({
    content: z.string().min(1, 'Content is required').max(3000, 'Content cannot exceed 3000 characters'),
    tags: z.array(z.string()).optional(),
    visibility: z.enum(['PUBLIC', 'CONNECTIONS_ONLY']).optional(),
  }),
});

export const createCommentSchema = z.object({
  params: z.object({
    thoughtId: z.string().min(1, 'Thought ID is required'),
  }),
  body: z.object({
    content: z.string().min(1, 'Comment content is required').max(1000, 'Comment cannot exceed 1000 characters'),
    parentId: z.string().optional(),
  }),
});

export const createReviewSchema = z.object({
  params: z.object({
    profileId: z.string().min(1, 'Target profile ID is required'),
  }),
  body: z.object({
    relationship: z.enum(['COLLEAGUE', 'CLIENT', 'MANAGER', 'MENTOR', 'PARTNER']),
    rating: z.number().min(1).max(5).optional(),
    text: z.string().min(10, 'Review must be at least 10 characters').max(1500),
  }),
});

export const updateReviewStatusSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Review ID is required'),
  }),
  body: z.object({
    status: z.enum(['ACCEPTED', 'REJECTED']),
  }),
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'ID is required'),
  }),
});
