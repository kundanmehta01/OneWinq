import { z } from 'zod';

export const sendMessageSchema = z.object({
  body: z.object({
    recipientId: z.string().min(1, 'Recipient user ID is required'),
    content: z.string().min(1, 'Message content cannot be empty').max(2000, 'Message cannot exceed 2000 characters'),
  }),
});

export const sendReplySchema = z.object({
  params: z.object({
    conversationId: z.string().min(1, 'Conversation ID is required'),
  }),
  body: z.object({
    content: z.string().min(1, 'Message content cannot be empty').max(2000, 'Message cannot exceed 2000 characters'),
  }),
});

export const conversationIdParamSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Conversation ID is required'),
  }),
});
