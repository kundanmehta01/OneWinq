import { Connection, ConnectionStatus } from './connection.model.js';
import { User } from '../users/user.model.js';
import { Profile } from '../profiles/profile.model.js';
import { BadRequestError, NotFoundError, ConflictError, AuthorizationError } from '../../lib/errors/appError.js';
import { parsePagination, getPaginationMeta } from '../../utils/pagination.js';

export class ConnectionService {
  // 1. Send Connection Request
  static async sendRequest(requesterId, targetUserId) {
    if (requesterId.toString() === targetUserId.toString()) {
      throw new BadRequestError('You cannot connect with yourself');
    }

    const recipient = await User.findById(targetUserId);
    if (!recipient) {
      throw new NotFoundError('Target user does not exist');
    }

    // Check if a relationship already exists in EITHER direction
    const existing = await Connection.findOne({
      $or: [
        { requesterId, recipientId: targetUserId },
        { requesterId: targetUserId, recipientId: requesterId },
      ],
      status: { $in: [ConnectionStatus.PENDING, ConnectionStatus.ACCEPTED] },
    });

    if (existing) {
      if (existing.status === ConnectionStatus.ACCEPTED) {
        throw new ConflictError('You are already connected with this user');
      }
      throw new ConflictError('A pending connection request already exists');
    }

    const connection = await Connection.create({
      requesterId,
      recipientId: targetUserId,
      status: ConnectionStatus.PENDING,
    });

    return connection;
  }

  // 2. Accept Connection Request
  static async acceptRequest(userId, connectionId) {
    const connection = await Connection.findById(connectionId);
    if (!connection) {
      throw new NotFoundError('Connection request not found');
    }

    // Only the intended recipient can accept
    if (connection.recipientId.toString() !== userId.toString()) {
      throw new AuthorizationError('You are not authorized to accept this request');
    }

    if (connection.status !== ConnectionStatus.PENDING) {
      throw new BadRequestError(`Cannot accept a connection in ${connection.status} state`);
    }

    connection.status = ConnectionStatus.ACCEPTED;
    connection.acceptedAt = new Date();
    await connection.save();

    return connection;
  }

  // 3. Reject Connection Request
  static async rejectRequest(userId, connectionId) {
    const connection = await Connection.findById(connectionId);
    if (!connection) {
      throw new NotFoundError('Connection request not found');
    }

    if (connection.recipientId.toString() !== userId.toString()) {
      throw new AuthorizationError('You are not authorized to reject this request');
    }

    if (connection.status !== ConnectionStatus.PENDING) {
      throw new BadRequestError(`Cannot reject a connection in ${connection.status} state`);
    }

    connection.status = ConnectionStatus.REJECTED;
    await connection.save();

    return connection;
  }

  // 4. Cancel Sent Request or Remove Accepted Connection
  static async removeConnection(userId, connectionId) {
    const connection = await Connection.findById(connectionId);
    if (!connection) {
      throw new NotFoundError('Connection not found');
    }

    const isRequester = connection.requesterId.toString() === userId.toString();
    const isRecipient = connection.recipientId.toString() === userId.toString();

    if (!isRequester && !isRecipient) {
      throw new AuthorizationError('You are not authorized to remove this connection');
    }

    // If pending, only the sender can cancel
    if (connection.status === ConnectionStatus.PENDING && !isRequester) {
      throw new AuthorizationError('Only the sender can cancel a pending request');
    }

    await Connection.findByIdAndDelete(connectionId);
    return { message: 'Connection removed successfully' };
  }

  // 5. Get My Accepted Connections (Paginated with Profile Data)
  static async getAcceptedConnections(userId, query) {
    const { page, limit, skip } = parsePagination(query);

    const filter = {
      $or: [{ requesterId: userId }, { recipientId: userId }],
      status: ConnectionStatus.ACCEPTED,
    };

    const total = await Connection.countDocuments(filter);
    const connections = await Connection.find(filter)
      .sort({ acceptedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Extract the OTHER user's ID
    const otherUserIds = connections.map((c) =>
      c.requesterId.toString() === userId.toString() ? c.recipientId : c.requesterId
    );

    // Fetch corresponding profiles for rich display
    const profiles = await Profile.find({ userId: { $in: otherUserIds } }).lean();
    const profileMap = new Map(profiles.map((p) => [p.userId.toString(), p]));

    const items = connections.map((c) => {
      const otherId = c.requesterId.toString() === userId.toString() ? c.recipientId : c.requesterId;
      return {
        connectionId: c._id,
        connectedAt: c.acceptedAt,
        user: profileMap.get(otherId.toString()) || { userId: otherId },
      };
    });

    const pagination = getPaginationMeta(total, page, limit);
    return { items, pagination };
  }

  // 6. Get Incoming Pending Requests (People who want to connect with me)
  static async getIncomingRequests(userId, query) {
    const { page, limit, skip } = parsePagination(query);

    const filter = {
      recipientId: userId,
      status: ConnectionStatus.PENDING,
    };

    const total = await Connection.countDocuments(filter);
    const requests = await Connection.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('requesterId', 'email phone')
      .lean();

    const requesterIds = requests.map((r) => r.requesterId?._id || r.requesterId);
    const profiles = await Profile.find({ userId: { $in: requesterIds } }).lean();
    const profileMap = new Map(profiles.map((p) => [p.userId.toString(), p]));

    const items = requests.map((r) => ({
      connectionId: r._id,
      requestedAt: r.createdAt,
      requester: profileMap.get(r.requesterId?._id?.toString() || r.requesterId?.toString()) || r.requesterId,
    }));

    const pagination = getPaginationMeta(total, page, limit);
    return { items, pagination };
  }

  // 7. Get Sent Pending Requests (Requests I have sent to others)
  static async getSentRequests(userId, query) {
    const { page, limit, skip } = parsePagination(query);

    const filter = {
      requesterId: userId,
      status: ConnectionStatus.PENDING,
    };

    const total = await Connection.countDocuments(filter);
    const requests = await Connection.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('recipientId', 'email phone')
      .lean();

    const recipientIds = requests.map((r) => r.recipientId?._id || r.recipientId);
    const profiles = await Profile.find({ userId: { $in: recipientIds } }).lean();
    const profileMap = new Map(profiles.map((p) => [p.userId.toString(), p]));

    const items = requests.map((r) => ({
      connectionId: r._id,
      requestedAt: r.createdAt,
      recipient: profileMap.get(r.recipientId?._id?.toString() || r.recipientId?.toString()) || r.recipientId,
    }));

    const pagination = getPaginationMeta(total, page, limit);
    return { items, pagination };
  }

  // 8. Helper: Check if Two Users Have an Accepted Connection
  static async areConnected(userAId, userBId) {
    const connection = await Connection.findOne({
      $or: [
        { requesterId: userAId, recipientId: userBId },
        { requesterId: userBId, recipientId: userAId },
      ],
      status: ConnectionStatus.ACCEPTED,
    });
    return !!connection;
  }
}
