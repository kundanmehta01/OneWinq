import { MessageService } from './message.service.js';
import { sendSuccess, sendCreated, sendPaginated } from '../../lib/response.js';

export class MessageController {
  // Send message
  static async sendMessage(req, res, next) {
    try {
      const message = await MessageService.sendMessage({
        senderId: req.userId,
        recipientId: req.body.recipientId,
        content: req.body.content,
      });
      return sendCreated(res, message, 'Message sent successfully');
    } catch (error) {
      next(error);
    }
  }

  // Reply to conversation
  static async sendReply(req, res, next) {
    try {
      const message = await MessageService.sendReply({
        senderId: req.userId,
        conversationId: req.params.conversationId,
        content: req.body.content,
      });
      return sendCreated(res, message, 'Reply sent successfully');
    } catch (error) {
      next(error);
    }
  }

  // Get Inbox Conversations
  static async getConversations(req, res, next) {
    try {
      const { items, pagination } = await MessageService.getConversations(req.userId, req.query);
      return sendPaginated(res, items, pagination, 'Conversations retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  // Get Messages in Conversation
  static async getMessages(req, res, next) {
    try {
      const { items, pagination } = await MessageService.getMessages(req.userId, req.params.id, req.query);
      return sendPaginated(res, items, pagination, 'Messages retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  // Mark Conversation as Read
  static async markAsRead(req, res, next) {
    try {
      await MessageService.markConversationAsRead(req.userId, req.params.id);
      return sendSuccess(res, null, 'Conversation marked as read');
    } catch (error) {
      next(error);
    }
  }
}
