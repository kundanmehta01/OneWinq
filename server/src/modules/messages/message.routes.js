import { Router } from 'express';
import { MessageController } from './message.controller.js';
import { authenticate } from '../../middleware/authenticate.js';
import { validate } from '../../middleware/validate.js';
import {
  sendMessageSchema,
  sendReplySchema,
  conversationIdParamSchema,
} from './message.validation.js';

const router = Router();

// All message routes require authentication
router.use(authenticate);

// Inbox
router.get('/conversations', MessageController.getConversations);
router.get('/conversations/:id', validate(conversationIdParamSchema), MessageController.getMessages);
router.patch('/conversations/:id/read', validate(conversationIdParamSchema), MessageController.markAsRead);

// Sending messages
router.post('/', validate(sendMessageSchema), MessageController.sendMessage);
router.post('/conversations/:conversationId/messages', validate(sendReplySchema), MessageController.sendReply);

export const messageRoutes = router;
