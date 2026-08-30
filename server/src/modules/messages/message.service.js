import { Conversation } from './conversation.model.js';
import { Message, MessageStatus } from './message.model.js';
import { ConnectionService } from '../connections/connection.service.js';
import { Profile } from '../profiles/profile.model.js';
import { AuthorizationError, NotFoundError, BadRequestError } from '../../lib/errors/appError.js';
import { parsePagination, getPaginationMeta } from '../../utils/pagination.js';

export class MessageService {
  // 1. Send Direct Message (Finds or Creates Conversation + Enforces Connection)
  static async sendMessage({ senderId, recipientId, content }) {
    if (senderId.toString() === recipientId.toString()) {
      throw new BadRequestError('You cannot send messages to yourself');
    }

    // 🔒 Rule: Must have an accepted connection to message
    const isConnected = await ConnectionService.areConnected(senderId, recipientId);
    if (!isConnected) {
      throw new AuthorizationError('You can only message users you are connected with');
    }

    // Find or create the 1-on-1 Conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, recipientId], $size: 2 },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, recipientId],
        unreadCounts: new Map([[recipientId.toString(), 0]]),
      });
    }

    // Create Message
    const message = await Message.create({
      conversationId: conversation._id,
      senderId,
      recipientId,
      content,
      status: MessageStatus.SENT,
    });

    // Update Conversation summary & increment recipient unread count
    const currentUnread = conversation.unreadCounts.get(recipientId.toString()) || 0;
    conversation.unreadCounts.set(recipientId.toString(), currentUnread + 1);
    conversation.lastMessage = {
      content: content.length > 80 ? `${content.substring(0, 80)}...` : content,
      senderId,
      sentAt: message.createdAt,
    };

    await conversation.save();

    return message;
  }

  // 2. Reply within an existing conversation
  static async sendReply({ senderId, conversationId, content }) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const isParticipant = conversation.participants.some(
      (p) => p.toString() === senderId.toString()
    );
    if (!isParticipant) {
      throw new AuthorizationError('You are not a participant in this conversation');
    }

    const recipientId = conversation.participants.find(
      (p) => p.toString() !== senderId.toString()
    );

    return await this.sendMessage({
      senderId,
      recipientId,
      content,
    });
  }

  // 3. Get My Conversations Inbox (Paginated with other participant's Profile)
  static async getConversations(userId, query) {
    const { page, limit, skip } = parsePagination(query);

    const filter = { participants: userId };
    const total = await Conversation.countDocuments(filter);

    const conversations = await Conversation.find(filter)
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Extract other participants
    const otherUserIds = conversations.map((c) =>
      c.participants.find((p) => p.toString() !== userId.toString())
    );

    const profiles = await Profile.find({ userId: { $in: otherUserIds } }).lean();
    const profileMap = new Map(profiles.map((p) => [p.userId.toString(), p]));

    const items = conversations.map((c) => {
      const otherId = c.participants.find((p) => p.toString() !== userId.toString());
      return {
        _id: c._id,
        lastMessage: c.lastMessage,
        unreadCount: c.unreadCounts?.[userId.toString()] || 0,
        updatedAt: c.updatedAt,
        participant: profileMap.get(otherId?.toString()) || { userId: otherId },
      };
    });

    const pagination = getPaginationMeta(total, page, limit);
    return { items, pagination };
  }

  // 4. Get Messages in a Conversation (Paginated)
  static async getMessages(userId, conversationId, query) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      throw new NotFoundError('Conversation not found');
    }

    const isParticipant = conversation.participants.some(
      (p) => p.toString() === userId.toString()
    );
    if (!isParticipant) {
      throw new AuthorizationError('You are not authorized to view this conversation');
    }

    const { page, limit, skip } = parsePagination(query, 20, 100);

    const filter = {
      conversationId,
      deletedBy: { $ne: userId },
    };

    const total = await Message.countDocuments(filter);
    const items = await Message.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Auto mark as read when fetching messages
    await this.markConversationAsRead(userId, conversationId);

    const pagination = getPaginationMeta(total, page, limit);
    return { items: items.reverse(), pagination };
  }

  // 5. Mark Conversation as Read
  static async markConversationAsRead(userId, conversationId) {
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) return;

    // Reset unread count for current user
    if (conversation.unreadCounts && conversation.unreadCounts.has(userId.toString())) {
      conversation.unreadCounts.set(userId.toString(), 0);
      await conversation.save();
    }

    // Mark incoming messages as READ
    await Message.updateMany(
      { conversationId, recipientId: userId, status: { $ne: MessageStatus.READ } },
      { status: MessageStatus.READ, readAt: new Date() }
    );
  }
}
