import { z } from 'zod';

export const searchQuerySchema = z.object({
  query: z.object({
    q: z.string().optional(),
    skills: z.string().optional(), // Comma-separated (e.g. "Node.js,React")
    designation: z.string().optional(),
    location: z.string().optional(),
    profileType: z.enum(['PERSONAL', 'PROFESSIONAL']).optional(),
    page: z.string().optional(),
    limit: z.string().optional(),
  }),
});

export const recordViewParamSchema = z.object({
  params: z.object({
    profileId: z.string().min(1, 'Profile ID is required'),
  }),
});
